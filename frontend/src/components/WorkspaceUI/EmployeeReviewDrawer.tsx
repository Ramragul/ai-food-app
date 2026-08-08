// Version 1

// import {
//   Badge,
//   Button,
//   Divider,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   HStack,
//   Text,
//   VStack
// } from "@chakra-ui/react";

// import type {
//   Employee
// } from "../../services/workspace/employees.service";

// interface Props {

//   employee: Employee | null;

//   isOpen: boolean;

//   onClose: () => void;

//   onSuccess?: () => void;

// }

// const EmployeeReviewDrawer = ({
//   employee,
//   isOpen,
//   onClose,
//   onSuccess
// }: Props) => {

//   if (!employee) {
//     return null;
//   }

//   const joinedDate =
//     new Date(
//       employee.joined_at
//     ).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "long",
//         year: "numeric"
//       }
//     );

//   return (

//     <Drawer

//       isOpen={isOpen}

//       placement="bottom"

//       onClose={onClose}

//     >

//       <DrawerOverlay />

//       <DrawerContent
//         borderTopRadius="3xl"
//       >

//         <DrawerCloseButton />

//         {/* ---------------------------------------------
//             HEADER
//         ---------------------------------------------- */}

//         <DrawerHeader>

//           <VStack
//             align="start"
//             spacing={1}
//           >

//             <Text
//               fontSize="xl"
//               fontWeight="700"
//             >

//               {employee.name}

//             </Text>

//             <Badge
//               colorScheme={
//                 employee.role === "OWNER"
//                   ? "purple"
//                   : "blue"
//               }
//               borderRadius="full"
//               px={3}
//             >

//               {employee.role}

//             </Badge>

//           </VStack>

//         </DrawerHeader>


//         <DrawerBody>

//           <VStack
//             align="stretch"
//             spacing={5}
//           >

//             {/* ---------------------------------------------
//                 STATUS
//             ---------------------------------------------- */}

//             <HStack
//               justify="space-between"
//             >

//               <Text
//                 color="gray.500"
//               >

//                 Status

//               </Text>

//               <Badge
//                 colorScheme={
//                   employee.status === "ACTIVE"
//                     ? "green"
//                     : "red"
//                 }
//                 borderRadius="full"
//                 px={3}
//               >

//                 {employee.status}

//               </Badge>

//             </HStack>


//             <Divider />


//             {/* ---------------------------------------------
//                 CONTACT
//             ---------------------------------------------- */}

//             <VStack
//               align="stretch"
//               spacing={4}
//             >

//               <Text
//                 fontWeight="600"
//               >

//                 Contact Information

//               </Text>


//               <HStack
//                 justify="space-between"
//                 align="start"
//               >

//                 <Text
//                   color="gray.500"
//                 >

//                   Mobile

//                 </Text>

//                 <Text
//                   fontWeight="500"
//                   textAlign="right"
//                 >

//                   {employee.mobile}

//                 </Text>

//               </HStack>


//               <HStack
//                 justify="space-between"
//                 align="start"
//               >

//                 <Text
//                   color="gray.500"
//                 >

//                   Email

//                 </Text>

//                 <Text
//                   fontWeight="500"
//                   textAlign="right"
//                   maxW="65%"
//                   wordBreak="break-word"
//                 >

//                   {employee.email}

//                 </Text>

//               </HStack>

//             </VStack>


//             <Divider />


//             {/* ---------------------------------------------
//                 WORKSPACE DETAILS
//             ---------------------------------------------- */}

//             <VStack
//               align="stretch"
//               spacing={4}
//             >

//               <Text
//                 fontWeight="600"
//               >

//                 Workspace Details

//               </Text>


//               <HStack
//                 justify="space-between"
//               >

//                 <Text
//                   color="gray.500"
//                 >

//                   Joined

//                 </Text>

//                 <Text
//                   fontWeight="500"
//                 >

//                   {joinedDate}

//                 </Text>

//               </HStack>


//               <HStack
//                 justify="space-between"
//               >

//                 <Text
//                   color="gray.500"
//                 >

//                   Assigned Clients

//                 </Text>

//                 <Text
//                   fontWeight="600"
//                 >

//                   {employee.assigned_clients}

//                 </Text>

//               </HStack>

//             </VStack>


//             <Divider />


//             {/* ---------------------------------------------
//                 ROLE
//             ---------------------------------------------- */}

//             <VStack
//               align="stretch"
//               spacing={3}
//             >

//               <Text
//                 fontWeight="600"
//               >

//                 Role

//               </Text>

//               <Button
//                 variant="outline"
//                 borderRadius="12px"
//                 isDisabled
//               >

//                 Change Role

//               </Button>

//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//               >

//                 Role management will be available
//                 here.

//               </Text>

//             </VStack>


//             {/* ---------------------------------------------
//                 REMOVE
//             ---------------------------------------------- */}

//             <VStack
//               align="stretch"
//               spacing={3}
//             >

//               <Text
//                 fontWeight="600"
//               >

//                 Workspace Access

//               </Text>

//               <Button
//                 colorScheme="red"
//                 variant="outline"
//                 borderRadius="12px"
//                 isDisabled
//               >

//                 Remove Employee

//               </Button>

//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//               >

//                 Removing an employee will revoke
//                 their access to this workspace.

//               </Text>

//             </VStack>

//           </VStack>

//         </DrawerBody>


//         {/* ---------------------------------------------
//             FOOTER
//         ---------------------------------------------- */}

//         <DrawerFooter>

//           <HStack
//             w="full"
//             justify="flex-end"
//           >

//             <Button
//               onClick={onClose}
//               borderRadius="12px"
//             >

//               Close

//             </Button>

//           </HStack>

//         </DrawerFooter>

//       </DrawerContent>

//     </Drawer>

//   );

// };

// export default EmployeeReviewDrawer;


// Version 2

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Select,
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
  Employee
} from "../../services/workspace/employees.service";

import {
  changeEmployeeRole,
  removeEmployee
} from "../../services/workspace/employees.service";

import {
  EMPLOYEE_ROLES
} from "../../config/workspace/employeeRoles";

interface Props {

  employee: Employee | null;

  isOpen: boolean;

  onClose: () => void;

  onSuccess?: () => void;

}

const EmployeeReviewDrawer = ({
  employee,
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

  const [selectedRole, setSelectedRole] =
    useState("");

  const [roleLoading, setRoleLoading] =
    useState(false);

  const [removeLoading, setRemoveLoading] =
    useState(false);


  /* ---------------------------------------------
     SYNC SELECTED ROLE
  ---------------------------------------------- */

  const currentRole =
    employee?.role ?? "";

  const effectiveRole =
    selectedRole || currentRole;


  /* ---------------------------------------------
     CLOSE DRAWER
  ---------------------------------------------- */

  const handleClose = () => {

    setSelectedRole("");

    onClose();

  };


  /* ---------------------------------------------
     CHANGE ROLE
  ---------------------------------------------- */

  const handleChangeRole = async () => {

    if (!employee) {
      return;
    }

    if (!selectedRole) {
      return;
    }

    if (
      selectedRole === employee.role
    ) {

      return;

    }

    try {

      setRoleLoading(true);

      await changeEmployeeRole(
        employee.member_id,
        selectedRole
      );

      toast({

        title:
          "Role updated successfully.",

        status: "success",

        duration: 3000,

        isClosable: true

      });

      setSelectedRole("");

      onSuccess?.();

      onClose();

    } catch (err: any) {

      toast({

        title:
          err?.response?.data?.message ??
          "Unable to change employee role.",

        status: "error",

        duration: 4000,

        isClosable: true

      });

    } finally {

      setRoleLoading(false);

    }

  };


  /* ---------------------------------------------
     REMOVE EMPLOYEE
  ---------------------------------------------- */

  const handleRemoveEmployee = async () => {

    if (!employee) {
      return;
    }

    try {

      setRemoveLoading(true);

      await removeEmployee(
        employee.member_id
      );

      toast({

        title:
          "Employee removed.",

        description:
          `${employee.name} no longer has access to this workspace.`,

        status: "success",

        duration: 4000,

        isClosable: true

      });

      onRemoveClose();

      setSelectedRole("");

      onSuccess?.();

      onClose();

    } catch (err: any) {

      toast({

        title:
          err?.response?.data?.message ??
          "Unable to remove employee.",

        status: "error",

        duration: 4000,

        isClosable: true

      });

    } finally {

      setRemoveLoading(false);

    }

  };


  /*
   * Don't render drawer without employee.
   *
   * Hooks are intentionally above this check.
   */

  if (!employee) {
    return null;
  }


  const isOwner =
    employee.role === "OWNER";


  const joinedDate =
    new Date(
      employee.joined_at
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    );


  const hasRoleChanged =
    effectiveRole !== employee.role;


  return (

    <>

      {/* =====================================================
          EMPLOYEE REVIEW DRAWER
      ===================================================== */}

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


          {/* ---------------------------------------------
              HEADER
          ---------------------------------------------- */}

          <DrawerHeader>

            <VStack
              align="start"
              spacing={2}
            >

              <Text
                fontSize="xl"
                fontWeight="700"
              >

                {employee.name}

              </Text>

              <HStack>

                <Badge

                  colorScheme={
                    isOwner
                      ? "purple"
                      : "blue"
                  }

                  borderRadius="full"

                  px={3}

                >

                  {employee.role}

                </Badge>

                <Badge

                  colorScheme="green"

                  borderRadius="full"

                  px={3}

                >

                  {employee.status}

                </Badge>

              </HStack>

            </VStack>

          </DrawerHeader>


          {/* ---------------------------------------------
              BODY
          ---------------------------------------------- */}

          <DrawerBody>

            <VStack

              align="stretch"

              spacing={6}

            >

              {/* -----------------------------------------
                  CONTACT INFORMATION
              ----------------------------------------- */}

              <VStack
                align="stretch"
                spacing={4}
              >

                <Text
                  fontWeight="600"
                  fontSize="md"
                >

                  Contact Information

                </Text>


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

                    {employee.mobile}

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

                    maxW={{
                      base: "60%",
                      md: "70%"
                    }}

                    wordBreak="break-word"

                  >

                    {employee.email}

                  </Text>

                </HStack>

              </VStack>


              <Divider />


              {/* -----------------------------------------
                  WORKSPACE INFORMATION
              ----------------------------------------- */}

              <VStack

                align="stretch"

                spacing={4}

              >

                <Text
                  fontWeight="600"
                  fontSize="md"
                >

                  Workspace Details

                </Text>


                <HStack
                  justify="space-between"
                >

                  <Text
                    color="gray.500"
                  >

                    Joined

                  </Text>

                  <Text
                    fontWeight="500"
                  >

                    {joinedDate}

                  </Text>

                </HStack>


                <HStack
                  justify="space-between"
                >

                  <Text
                    color="gray.500"
                  >

                    Assigned Clients

                  </Text>

                  <Text
                    fontWeight="600"
                  >

                    {employee.assigned_clients}

                  </Text>

                </HStack>

              </VStack>


              <Divider />


              {/* -----------------------------------------
                  ROLE MANAGEMENT
              ----------------------------------------- */}

              <VStack

                align="stretch"

                spacing={4}

              >

                <Text
                  fontWeight="600"
                  fontSize="md"
                >

                  Role

                </Text>


                {isOwner ? (

                  <VStack
                    align="stretch"
                    spacing={2}
                  >

                    <Badge

                      colorScheme="purple"

                      alignSelf="flex-start"

                      borderRadius="full"

                      px={3}

                      py={1}

                    >

                      OWNER

                    </Badge>

                    <Text

                      fontSize="sm"

                      color="gray.500"

                    >

                      The workspace owner cannot
                      have their role changed.

                    </Text>

                  </VStack>

                ) : (

                  <>

                    <FormControl>

                      <FormLabel
                        fontSize="sm"
                      >

                        Workspace Role

                      </FormLabel>

                      <Select

                        value={effectiveRole}

                        onChange={(e) =>
                          setSelectedRole(
                            e.target.value
                          )
                        }

                        bg="white"

                        borderRadius="12px"

                      >

                        {EMPLOYEE_ROLES.map(
                          role => (

                            <option

                              key={role.value}

                              value={role.value}

                            >

                              {role.label}

                            </option>

                          )
                        )}

                      </Select>

                    </FormControl>


                    <Button

                      colorScheme="blue"

                      borderRadius="12px"

                      isLoading={roleLoading}

                      loadingText="Saving..."

                      isDisabled={
                        !hasRoleChanged
                      }

                      onClick={
                        handleChangeRole
                      }

                    >

                      Save Role

                    </Button>

                  </>

                )}

              </VStack>


              <Divider />


              {/* -----------------------------------------
                  WORKSPACE ACCESS
              ----------------------------------------- */}

              <VStack

                align="stretch"

                spacing={3}

              >

                <Text
                  fontWeight="600"
                  fontSize="md"
                >

                  Workspace Access

                </Text>


                {isOwner ? (

                  <Text

                    fontSize="sm"

                    color="gray.500"

                  >

                    The workspace owner cannot
                    be removed.

                  </Text>

                ) : (

                  <>

                    <Text

                      fontSize="sm"

                      color="gray.500"

                    >

                      Removing this employee will
                      immediately revoke their access
                      to this workspace.

                    </Text>


                    <Button

                      colorScheme="red"

                      variant="outline"

                      borderRadius="12px"

                      onClick={onRemoveOpen}

                    >

                      Remove Employee

                    </Button>

                  </>

                )}

              </VStack>

            </VStack>

          </DrawerBody>


          {/* ---------------------------------------------
              FOOTER
          ---------------------------------------------- */}

          <DrawerFooter>

            <Button

              w={{
                base: "100%",
                md: "auto"
              }}

              onClick={handleClose}

              borderRadius="12px"

            >

              Close

            </Button>

          </DrawerFooter>

        </DrawerContent>

      </Drawer>


      {/* =====================================================
          REMOVE CONFIRMATION
      ===================================================== */}

      <AlertDialog

        isOpen={isRemoveOpen}

        leastDestructiveRef={cancelRef}

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

              Remove Employee?

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

                    {employee.name}

                  </Text>

                  {" "}from this workspace?

                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >

                  They will immediately lose access
                  to the workspace. Their historical
                  data will remain preserved.

                </Text>

              </VStack>

            </AlertDialogBody>


            <AlertDialogFooter>

              <Button

                ref={cancelRef}

                onClick={onRemoveClose}

                borderRadius="12px"

                isDisabled={removeLoading}

              >

                Cancel

              </Button>


              <Button

                colorScheme="red"

                ml={3}

                borderRadius="12px"

                onClick={
                  handleRemoveEmployee
                }

                isLoading={removeLoading}

                loadingText="Removing..."

              >

                Remove Employee

              </Button>

            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialogOverlay>

      </AlertDialog>

    </>

  );

};

export default EmployeeReviewDrawer;