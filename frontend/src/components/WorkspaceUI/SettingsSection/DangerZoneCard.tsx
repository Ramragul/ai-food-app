import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  workspaceName: string;

  confirmation: string;

  deleting: boolean;

  onConfirmationChange: (
    value: string
  ) => void;

  onDelete: () => void;

}

const DangerZoneCard = ({
  workspaceName,
  confirmation,
  deleting,
  onConfirmationChange,
  onDelete
}: Props) => {

  const isConfirmed =
    confirmation === workspaceName;

  return (

    <Box

      borderRadius="20px"

      borderWidth="1px"

      borderColor="red.200"

      bg="red.50"

      p={{
        base: 5,
        md: 7
      }}

    >

      <VStack

        align="stretch"

        spacing={5}

      >

        <Box>

          <Heading

            size="md"

            color="red.700"

          >

            Danger Zone

          </Heading>

          <Text

            mt={1}

            fontSize="sm"

            color="red.600"

          >

            Destructive workspace actions.

          </Text>

        </Box>


        <Divider
          borderColor="red.200"
        />


        <Box>

          <Text

            fontWeight="700"

            color="gray.800"

          >

            Delete Workspace

          </Text>

          <Text

            mt={2}

            fontSize="sm"

            color="gray.600"

            maxW="800px"

          >

            Deleting the workspace will deactivate
            the organization and remove workspace
            access for its members. User accounts
            and personal data are not deleted.

          </Text>

        </Box>


        <Alert

          status="warning"

          borderRadius="12px"

        >

          <AlertIcon />

          Active assignments will be ended and
          pending invitations will be invalidated.

        </Alert>


        <VStack

          align="stretch"

          spacing={3}

        >

          <Text

            fontSize="sm"

            fontWeight="600"

          >

            Type{" "}

            <Text

              as="span"

              fontWeight="700"

              color="red.600"

            >

              {workspaceName}

            </Text>

            {" "}to confirm.

          </Text>


          <Input

            bg="white"

            value={confirmation}

            onChange={(e) =>
              onConfirmationChange(
                e.target.value
              )
            }

            placeholder={workspaceName}

            maxW="500px"

          />


          <Button

            colorScheme="red"

            borderRadius="12px"

            alignSelf={{
              base: "stretch",
              md: "flex-start"
            }}

            isLoading={deleting}

            loadingText="Deleting..."

            isDisabled={
              !isConfirmed
            }

            onClick={onDelete}

          >

            Delete Workspace

          </Button>

        </VStack>

      </VStack>

    </Box>

  );

};

export default DangerZoneCard;