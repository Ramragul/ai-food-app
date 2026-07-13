import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Button,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import WorkspaceDrawer from "./WorkspaceDrawer";

import { useWorkspace } from "../../context/WorkspaceContext";

import {
  getAssignments
} from "../../services/workspace/assignments.service";

import {
  assignClient
} from "../../services/workspace/assignments.service";

import {
  getEmployees,
  type Employee
} from "../../services/workspace/employees.service";

import {
  getClients,
  type Client
} from "../../services/workspace/clients.service";

interface Props {

  isOpen: boolean;

  onClose: () => void;

  onSuccess?: () => void;

}

const AssignClientDrawer = ({
  isOpen,
  onClose,
  onSuccess
}: Props) => {

  const toast = useToast();

  const { organization } = useWorkspace();

  const [loading, setLoading] =
    useState(false);

  const [loadingData, setLoadingData] =
    useState(false);

  const [trainers, setTrainers] =
    useState<Employee[]>([]);

  const [clients, setClients] =
    useState<Client[]>([]);

  const [trainerId, setTrainerId] =
    useState("");

  const [clientId, setClientId] =
    useState("");

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  useEffect(() => {

    if (!isOpen) return;

    void loadData();

  }, [isOpen]);

  const loadData = async () => {

    try {

      setLoadingData(true);

      const [

        employees,

        clientList,
        assignments

      ] = await Promise.all([

        getEmployees(),

        getClients(),
        getAssignments()

      ]);

      setTrainers(

        employees.filter(

          employee =>
            employee.role === "TRAINER"

        )

      );


      console.log("Assignments", assignments);
console.log("Clients", clientList);
    //   setClients(clientList);
    const assignedClientIds =
  new Set(

    assignments.flatMap(

      assignment =>

        assignment.clients.map(

          client => client.member_id

        )

    )

  );

const availableClients =
  clientList.filter(

    client =>

      !assignedClientIds.has(
        client.member_id
      )

  );

setClients(availableClients);

    }

    finally {

      setLoadingData(false);

    }

  };

  const reset = () => {

    setTrainerId("");

    setClientId("");

    setErrors({});

  };

  const handleClose = () => {

    reset();

    onClose();

  };

  const validate = () => {

    const validationErrors: Record<
      string,
      string
    > = {};

    if (!trainerId) {

      validationErrors.trainer =
        "Select a trainer.";

    }

    if (!clientId) {

      validationErrors.client =
        "Select a client.";

    }

    setErrors(validationErrors);

    return Object.keys(
      validationErrors
    ).length === 0;

  };

  const handleSubmit = async () => {

    console.log("Submit clicked");

    if (!validate()) {

       

      return;

    }

    try {

      setLoading(true);

      await assignClient({

        organization_id:
          organization.id,

        trainer_member_id:
          Number(trainerId),

        client_member_id:
          Number(clientId)

      });

      console.log("Submit api called");

      toast({

        status: "success",

        title:
          "Client assigned successfully."

      });

      handleClose();

      onSuccess?.();

    }

    // catch {

    //   toast({

    //     status: "error",

    //     title:
    //       "Unable to assign client."

    //   });

    // }

    catch (error) {

  console.error("ERROR:", error);

  toast({

    status: "error",

    title: "Unable to assign client."

  });

}

    finally {

      setLoading(false);

    }

  };

  return (

    <WorkspaceDrawer

      isOpen={isOpen}

      onClose={handleClose}

      title="Assign Client"

      footer={

        <Stack

          direction={{
            base: "column",
            md: "row"
          }}

          w="100%"

          justify="flex-end"

        >

          <Button

            onClick={handleClose}

            w={{
              base: "100%",
              md: "auto"
            }}

          >

            Cancel

          </Button>

          <Button

            colorScheme="blue"

            isLoading={loading}

            loadingText="Assigning..."

            onClick={handleSubmit}

            w={{
              base: "100%",
              md: "auto"
            }}

          >

            Assign Client

          </Button>

        </Stack>

      }

    >

      <VStack

        spacing={5}

        align="stretch"

      >

        <Text

          color="gray.500"

          fontSize="sm"

        >

          Assign a client to one of your trainers.

        </Text>

        <FormControl

          isRequired

          isInvalid={
            !!errors.trainer
          }

        >

          <FormLabel>

            Trainer

          </FormLabel>

          <Select

            placeholder="Select trainer"

            value={trainerId}

            isDisabled={loadingData}

            onChange={(e) => {

              setTrainerId(
                e.target.value
              );

              setErrors(prev => ({
                ...prev,
                trainer: ""
              }));

            }}

          >

            {

              trainers.map(

                trainer => (

                  <option

                    key={
                      trainer.member_id
                    }

                    value={
                      trainer.member_id
                    }

                  >

                    {trainer.name}

                  </option>

                )

              )

            }

          </Select>

          <FormErrorMessage>

            {errors.trainer}

          </FormErrorMessage>

        </FormControl>

        <FormControl

          isRequired

          isInvalid={
            !!errors.client
          }

        >

          <FormLabel>

            Client

          </FormLabel>

          <Select

            placeholder="Select client"

            value={clientId}

            isDisabled={loadingData}

            onChange={(e) => {

              setClientId(
                e.target.value
              );

              setErrors(prev => ({
                ...prev,
                client: ""
              }));

            }}

          >

            {

              clients.map(

                client => (

                  <option

                    key={
                      client.member_id
                    }

                    value={
                      client.member_id
                    }

                  >

                    {client.name}

                  </option>

                )

              )

            }

          </Select>

          <FormErrorMessage>

            {errors.client}

          </FormErrorMessage>

        </FormControl>

      </VStack>

    </WorkspaceDrawer>

  );

};

export default AssignClientDrawer;