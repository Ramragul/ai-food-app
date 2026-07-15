import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Button,
  Stack,
  Text,
  Box,
  useToast
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import WorkspaceDrawer from "./WorkspaceDrawer";

import {
  getEmployees,
  type Employee
} from "../../services/workspace/employees.service";

import {
  transferAssignment
} from "../../services/workspace/assignments.service";

interface Props {

  isOpen: boolean;

  onClose: () => void;

  assignment: any;

  onSuccess?: () => void;

}

const TransferClientDrawer = ({
  isOpen,
  onClose,
  assignment,
  onSuccess
}: Props) => {

  const toast = useToast();

  const [loading, setLoading] =
    useState(false);

  const [loadingData, setLoadingData] =
    useState(false);

  const [trainers, setTrainers] =
    useState<Employee[]>([]);

  const [trainerId, setTrainerId] =
    useState("");

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  useEffect(() => {

    if (!isOpen || !assignment) {

      return;

    }

    void loadData();

  }, [isOpen, assignment]);

  const loadData = async () => {

    try {

      setLoadingData(true);

      const employees =
        await getEmployees();

      const available =
        employees.filter(

          employee =>

            employee.role ===
              "TRAINER"

            &&

            employee.member_id !==
            assignment.coach.member_id

        );

      setTrainers(
        available
      );

    }

    finally {

      setLoadingData(false);

    }

  };

  const validate = () => {

    const validationErrors:
      Record<string, string> = {};

    if (!trainerId) {

      validationErrors.trainer =
        "Select a trainer.";

    }

    setErrors(
      validationErrors
    );

    return Object.keys(
      validationErrors
    ).length === 0;

  };

  const handleSubmit =
    async () => {

      if (!validate()) {

        return;

      }

      try {

        setLoading(true);

        await transferAssignment(

          assignment.client.assignment_id,

          Number(trainerId)

        );

        toast({

          status: "success",

          title:
            "Client transferred successfully."

        });

        onSuccess?.();

      }

      catch (err: any) {

        toast({

          status: "error",

          title:

            err?.response?.data?.error ||

            "Unable to transfer client."

        });

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <WorkspaceDrawer

      isOpen={isOpen}

      onClose={onClose}

      title="Transfer Client"

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

            onClick={onClose}

          >

            Cancel

          </Button>

          <Button

            colorScheme="blue"

            isLoading={loading}

            loadingText="Transferring..."

            onClick={handleSubmit}

          >

            Transfer

          </Button>

        </Stack>

      }

    >

      <VStack

        spacing={6}

        align="stretch"

      >

        <Box>

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Client

          </Text>

          <Text

            fontWeight="700"

            fontSize="lg"

          >

            {assignment?.client?.name}

          </Text>

        </Box>

        <Box>

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Current Trainer

          </Text>

          <Text

            fontWeight="700"

            fontSize="lg"

          >

            {assignment?.coach?.name}

          </Text>

        </Box>

        <FormControl

          isRequired

          isInvalid={
            !!errors.trainer
          }

        >

          <FormLabel>

            Transfer To

          </FormLabel>

          <Select

            placeholder="Select Trainer"

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

      </VStack>

    </WorkspaceDrawer>

  );

};

export default TransferClientDrawer;