import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  Stack,
  Text,
  useToast,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

import { useState } from "react";

import WorkspaceDrawer from "./WorkspaceDrawer";

// import { EMPLOYEE_ROLES } from "../../config/workspace/employeeRoles";

import {
  inviteClient
} from "../../services/workspace/clients.service";

import {
  useWorkspace
} from "../../context/WorkspaceContext";

interface Props {

  isOpen: boolean;

  onClose: () => void;

  onSuccess?: () => void;

}

interface FormData {

  invited_name: string;

  invited_mobile: string;

  invited_email: string;

  

}

const initialForm: FormData = {

  invited_name: "",

  invited_mobile: "",

  invited_email: ""



};

const InviteClientDrawer = ({
  isOpen,
  onClose,
  onSuccess
}: Props) => {

  const toast = useToast();

  const { organization } = useWorkspace();

  console.log("organization value is : ", organization);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<FormData>(initialForm);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {

    setForm(prev => ({
      ...prev,
      [field]: value
    }));

    setErrors(prev => ({
      ...prev,
      [field]: ""
    }));

  };

  const validate = () => {

    const validationErrors: Record<string, string> = {};

    if (!form.invited_name.trim()) {

      validationErrors.invited_name =
        "Name is required.";

    }

    if (!/^\d{10}$/.test(form.invited_mobile)) {

      validationErrors.invited_mobile =
        "Enter a valid 10 digit mobile number.";

    }

    if (
      form.invited_email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.invited_email
      )
    ) {

      validationErrors.invited_email =
        "Enter a valid email.";

    }

    setErrors(validationErrors);

    return Object.keys(validationErrors)
      .length === 0;

  };

  const resetForm = () => {

    setForm(initialForm);

    setErrors({});

  };

  const handleClose = () => {

    resetForm();

    onClose();

  };

  const handleSubmit = async () => {

    if (!validate()) {

      return;

    }

    if (!organization) {

      toast({

        status: "error",

        title: "Organization not found."

      });

      return;

    }

    try {

      setLoading(true);

        await inviteClient({

        organization_id:

            organization.id,

        invited_name:

            form.invited_name,

        invited_mobile:

            form.invited_mobile,

        invited_email:

            form.invited_email

        });

toast({

    status:"success",

    title:"Invitation sent",

    description:"The invitation is now waiting for acceptance."

});

      resetForm();

      onClose();

      onSuccess?.();

    }

    catch {

      toast({

        status: "error",

        title:
          "Unable to send invitation."

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

      title="Invite Client"

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

            loadingText="Sending..."

            onClick={handleSubmit}

            w={{
              base: "100%",
              md: "auto"
            }}

          >

            Invite Client

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

          Invite a client to join your workspace.

        </Text>

        <FormControl
          isRequired
          isInvalid={!!errors.invited_name}
        >
          <Alert

    status="info"

    borderRadius="xl"

>

<AlertIcon/>

The invited user will receive the invitation inside their NEKA account after signing in.

</Alert>

          <FormLabel>
            Full Name
          </FormLabel>

          <Input

            value={form.invited_name}

            onChange={(e) =>

              updateField(
                "invited_name",
                e.target.value
              )

            }

          />

          <FormErrorMessage>

            {errors.invited_name}

          </FormErrorMessage>

        </FormControl>

        <FormControl
          isRequired
          isInvalid={!!errors.invited_mobile}
        >

          <FormLabel>

            Mobile

          </FormLabel>

          <Input

            value={form.invited_mobile}

            onChange={(e) =>

              updateField(
                "invited_mobile",
                e.target.value
              )

            }

          />

          <FormErrorMessage>

            {errors.invited_mobile}

          </FormErrorMessage>

        </FormControl>

        <FormControl
          isInvalid={!!errors.invited_email}
        >

          <FormLabel>

            Email

          </FormLabel>

          <Input

            value={form.invited_email}

            onChange={(e) =>

              updateField(
                "invited_email",
                e.target.value
              )

            }

          />

          <FormErrorMessage>

            {errors.invited_email}

          </FormErrorMessage>

        </FormControl>



      </VStack>

    </WorkspaceDrawer>

  );

};

export default InviteClientDrawer;