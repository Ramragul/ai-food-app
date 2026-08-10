import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";

import {
  useRef,
  useState
} from "react";

import type {
  Client
} from "../../services/workspace/clients.service";

import {
  removeEmployee
} from "../../services/workspace/employees.service";

interface Props {

  client: Client | null;

  isOpen: boolean;

  onClose: () => void;

  onSuccess?: () => void;

}

const ClientManageDrawer = ({
  client,
  isOpen,
  onClose,
  onSuccess
}: Props) => {

  const toast = useToast();

  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose
  } = useDisclosure();

  const cancelRef =
    useRef<HTMLButtonElement>(null);

  const [
    loading,
    setLoading
  ] = useState(false);


  if (!client) {
    return null;
  }


  const handleClose = () => {

    onRemoveClose();

    onClose();

  };


  const handleRemove = async () => {

    try {

      setLoading(true);

      await removeEmployee(
        client.member_id
      );

      toast({

        title:
          "Client removed.",

        description:
          `${client.name} no longer has access to this workspace.`,

        status: "success",

        duration: 4000,

        isClosable: true

      });

      onRemoveClose();

      onSuccess?.();

      onClose();

    } catch (err: any) {

      toast({

        title:
          err?.response?.data?.message ??
          "Unable to remove client.",

        status: "error",

        duration: 4000,

        isClosable: true

      });

    } finally {

      setLoading(false);

    }

  };


  return (

    <>

      <Drawer

        isOpen={isOpen}

        placement="bottom"

        onClose={handleClose}

      >

        <DrawerOverlay />

        <DrawerContent

          borderTopRadius="3xl"

          maxH="90vh"

        >

          <DrawerCloseButton />


          <DrawerHeader>

            <VStack
              align="start"
              spacing={2}
            >

              <Text
                fontSize="xl"
                fontWeight="700"
              >

                Manage Client

              </Text>

              <Text
                fontSize="sm"
                color="gray.500"
              >

                {client.name}

              </Text>

            </VStack>

          </DrawerHeader>


          <DrawerBody>

            <VStack
              align="stretch"
              spacing={6}
            >

              {/* -----------------------------------------
                  CLIENT SUMMARY
              ----------------------------------------- */}

              <VStack
                align="stretch"
                spacing={4}
              >

                <HStack
                  justify="space-between"
                >

                  <Text
                    color="gray.500"
                  >

                    Status

                  </Text>

                  <Badge

                    colorScheme={
                      client.status === "ACTIVE"
                        ? "green"
                        : "red"
                    }

                    borderRadius="full"

                    px={3}

                  >

                    {client.status}

                  </Badge>

                </HStack>


                <HStack
                  justify="space-between"
                  align="start"
                >

                  <Text
                    color="gray.500"
                  >

                    Mobile

                  </Text>

                  <Text
                    fontWeight="500"
                    textAlign="right"
                  >

                    {client.mobile}

                  </Text>

                </HStack>


                <HStack
                  justify="space-between"
                  align="start"
                >

                  <Text
                    color="gray.500"
                  >

                    Email

                  </Text>

                  <Text
                    fontWeight="500"
                    textAlign="right"
                    maxW="65%"
                    wordBreak="break-word"
                  >

                    {client.email}

                  </Text>

                </HStack>


                <HStack
                  justify="space-between"
                  align="start"
                >

                  <Text
                    color="gray.500"
                  >

                    Assigned Coach

                  </Text>

                  <Text
                    fontWeight="500"
                    textAlign="right"
                    maxW="60%"
                  >

                    {client.assigned_coach
                      ? client.assigned_coach.name
                      : "Not Assigned"
                    }

                  </Text>

                </HStack>


                <HStack
                  justify="space-between"
                >

                  <Text
                    color="gray.500"
                  >

                    Consent

                  </Text>

                  <Badge

                    colorScheme={
                      client.consent_granted
                        ? "green"
                        : "orange"
                    }

                    borderRadius="full"

                    px={3}

                  >

                    {client.consent_granted
                      ? "Granted"
                      : "Pending"
                    }

                  </Badge>

                </HStack>

              </VStack>


              {/* -----------------------------------------
                  MANAGEMENT
              ----------------------------------------- */}

              <VStack
                align="stretch"
                spacing={3}
              >

                <Text
                  fontWeight="600"
                >

                  Workspace Access

                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >

                  Removing this client will immediately
                  revoke their access to this workspace.
                  Their historical data will remain
                  preserved.

                </Text>

                <Button

                  colorScheme="red"

                  variant="outline"

                  borderRadius="12px"

                  onClick={onRemoveOpen}

                  isDisabled={
                    client.status !== "ACTIVE"
                  }

                >

                  Remove Client

                </Button>

              </VStack>

            </VStack>

          </DrawerBody>


          <DrawerFooter>

            <Button

              w={{
                base: "100%",
                md: "auto"
              }}

              borderRadius="12px"

              onClick={handleClose}

            >

              Close

            </Button>

          </DrawerFooter>

        </DrawerContent>

      </Drawer>


      {/* =============================================
          REMOVE CONFIRMATION
      ============================================= */}

      <AlertDialog

        isOpen={isRemoveOpen}

        leastDestructiveRef={
          cancelRef
        }

        onClose={onRemoveClose}

      >

        <AlertDialogOverlay>

          <AlertDialogContent

            borderRadius="20px"

            mx={4}

          >

            <AlertDialogHeader
              fontSize="lg"
              fontWeight="700"
            >

              Remove Client?

            </AlertDialogHeader>


            <AlertDialogBody>

              <VStack
                align="stretch"
                spacing={2}
              >

                <Text>

                  Are you sure you want to remove{" "}

                  <Text
                    as="span"
                    fontWeight="700"
                  >

                    {client.name}

                  </Text>

                  {" "}from this workspace?

                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >

                  They will immediately lose access
                  to this workspace. Their historical
                  data will remain preserved.

                </Text>

              </VStack>

            </AlertDialogBody>


            <AlertDialogFooter>

              <Button

                ref={cancelRef}

                onClick={onRemoveClose}

                borderRadius="12px"

                isDisabled={loading}

              >

                Cancel

              </Button>


              <Button

                colorScheme="red"

                ml={3}

                borderRadius="12px"

                onClick={handleRemove}

                isLoading={loading}

                loadingText="Removing..."

              >

                Remove Client

              </Button>

            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialogOverlay>

      </AlertDialog>

    </>

  );

};

export default ClientManageDrawer;