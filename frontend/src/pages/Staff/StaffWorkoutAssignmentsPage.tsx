// import {
//   Badge,
//   Box,
//   Button,
//   Flex,
//   HStack,
//   Heading,
//   Icon,
//   Select,
//   SimpleGrid,
//   Spinner,
//   Text,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";

// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   FiArrowLeft,
//   FiCalendar,
//   FiEdit2,
//   FiPlus,
//   FiTrash2,
// } from "react-icons/fi";

// import {
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";

// import api from "../../utils/api";

// import {
//   getMyWorkoutAssignments,
//   getWorkoutWorkspace,
// } from "../../services/workout.service";

// import type { WorkoutAssignment } from "../../types/workout.types";

// import WorkoutAssignmentDrawer from "../../components/StaffUI/Workouts/WorkoutAssignmentDrawer";
// import WorkoutAssignmentEditDrawer from "../../components/StaffUI/Workouts/WorkoutAssignmentEditDrawer";

// import {
//   deleteClientWorkoutAssignments,
//   deleteWorkoutAssignment,
// } from "../../services/workoutAssignment.service";

// interface ClientOption {
//   id: number;
//   name: string;
//   nickname?: string | null;
// }

// const DAYS = [
//   { key: "MON", name: "Monday" },
//   { key: "TUE", name: "Tuesday" },
//   { key: "WED", name: "Wednesday" },
//   { key: "THU", name: "Thursday" },
//   { key: "FRI", name: "Friday" },
//   { key: "SAT", name: "Saturday" },
//   { key: "SUN", name: "Sunday" },
// ];

// const getValue = (assignment: any, ...keys: string[]) => {
//   for (const key of keys) {
//     if (assignment?.[key] !== undefined) return assignment[key];
//   }
//   return null;
// };

// const normalizeClients = (response: any): ClientOption[] => {
//   const rawClients =
//     Array.isArray(response?.data?.data)
//       ? response.data.data
//       : Array.isArray(response?.data)
//         ? response.data
//         : Array.isArray(response?.data?.data?.clients)
//           ? response.data.data.clients
//           : [];

//   const map = new Map<number, ClientOption>();

//   rawClients.forEach((client: any) => {
//     const id = Number(
//       client.member_id ??
//       client.client_member_id ??
//       client.id
//     );

//     if (!Number.isInteger(id) || id <= 0 || map.has(id)) return;

//     map.set(id, {
//       id,
//       name: client.name || "Unnamed client",
//       nickname: client.nickname || null,
//     });
//   });

//   return Array.from(map.values()).sort((a, b) =>
//     a.name.localeCompare(b.name)
//   );
// };

// const formatDays = (value: any) => {
//   const days = Array.isArray(value) ? value : [];

//   return days
//     .map((day: string) => DAYS.find((item) => item.key === day)?.name ?? day)
//     .join(" • ");
// };

// const StaffWorkoutAssignmentsPage = () => {
//   const toast = useToast();
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const queryClientId = Number(searchParams.get("clientId"));

//   const [organizationId, setOrganizationId] = useState(0);
//   const [clients, setClients] = useState<ClientOption[]>([]);
//   const [assignments, setAssignments] = useState<WorkoutAssignment[]>([]);

//   const [selectedClientId, setSelectedClientId] = useState<number>(
//     Number.isInteger(queryClientId) && queryClientId > 0 ? queryClientId : 0
//   );

//   const [loading, setLoading] = useState(true);
//   const [createOpen, setCreateOpen] = useState(false);
//   const [editAssignment, setEditAssignment] = useState<WorkoutAssignment | null>(null);
//   const [deletingId, setDeletingId] = useState<number | null>(null);
//   const [clearingAll, setClearingAll] = useState(false);

//   const load = async () => {
//     try {
//       setLoading(true);

//       const workspace = await getWorkoutWorkspace();
//       const resolvedOrganizationId = Number(workspace?.organization?.id);

//       if (!resolvedOrganizationId) {
//         throw new Error("Active organization could not be resolved.");
//       }

//       const [clientResponse, assignmentData] = await Promise.all([
//         api.get("/coach/my-clients"),
//         getMyWorkoutAssignments(resolvedOrganizationId),
//       ]);

//       setOrganizationId(resolvedOrganizationId);
//       setClients(normalizeClients(clientResponse));
//       setAssignments(Array.isArray(assignmentData) ? assignmentData : []);
//     } catch (error: any) {
//       console.error("Failed to load workout assignments:", error);
//       toast({
//         title: "Unable to load workout assignments",
//         description:
//           error?.response?.data?.error ||
//           error?.message ||
//           "Please try again.",
//         status: "error",
//         duration: 3500,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // One workspace fetch establishes the organization context for this page.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const value = Number(searchParams.get("clientId"));

//     if (Number.isInteger(value) && value > 0 && value !== selectedClientId) {
//       setSelectedClientId(value);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   const activeAssignments = useMemo(() => {
//     if (!selectedClientId) return [];

//     return assignments.filter((assignment: any) => {
//       return (
//         Number(assignment.client_member_id ?? assignment.clientMemberId) ===
//           Number(selectedClientId) &&
//         String(assignment.status ?? "ACTIVE").toUpperCase() === "ACTIVE"
//       );
//     });
//   }, [assignments, selectedClientId]);

//   const selectedClient = useMemo(
//     () => clients.find((client) => client.id === selectedClientId),
//     [clients, selectedClientId]
//   );

//   const selectClient = (value: string) => {
//     const id = Number(value);
//     setSelectedClientId(id);

//     if (id > 0) {
//       setSearchParams({ clientId: String(id) });
//     } else {
//       setSearchParams({});
//     }
//   };

//   const removeAssignment = async (assignment: WorkoutAssignment) => {
//     if (!assignment.id || !organizationId) return;

//     const templateName =
//       assignment.workout_name ??
//       assignment.template_name ??
//       `Workout #${assignment.workout_template_id ?? assignment.workoutTemplateId}`;

//     if (!window.confirm(`Remove ${templateName} from this client's active workouts?`)) {
//       return;
//     }

//     try {
//       setDeletingId(assignment.id);
//       await deleteWorkoutAssignment(assignment.id, organizationId);

//       toast({
//         title: "Workout removed",
//         description: `${templateName} is no longer assigned to this client.`,
//         status: "success",
//         duration: 2500,
//         isClosable: true,
//       });

//       await load();
//     } catch (error: any) {
//       console.error("Failed to remove workout assignment:", error);
//       toast({
//         title: "Unable to remove workout",
//         description:
//           error?.response?.data?.error ||
//           error?.message ||
//           "Please try again.",
//         status: "error",
//         duration: 3500,
//         isClosable: true,
//       });
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const clearAll = async () => {
//     if (!activeAssignments.length || !organizationId) return;

//     if (!window.confirm("Remove all active workouts from this client?")) {
//       return;
//     }

//     try {
//       setClearingAll(true);

//       const result = await deleteClientWorkoutAssignments(
//         selectedClientId,
//         organizationId
//       );

//       toast({
//         title: "All workouts removed",
//         description: `${Number(result?.removedCount ?? 0)} active assignment(s) removed.`,
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });

//       await load();
//     } catch (error: any) {
//       console.error("Failed to clear workout assignments:", error);
//       toast({
//         title: "Unable to clear workouts",
//         description:
//           error?.response?.data?.error ||
//           error?.message ||
//           "Please try again.",
//         status: "error",
//         duration: 3500,
//         isClosable: true,
//       });
//     } finally {
//       setClearingAll(false);
//     }
//   };

//   const editTemplateName = editAssignment
//     ? getValue(editAssignment, "workout_name", "template_name") ??
//       `Workout #${getValue(editAssignment, "workout_template_id", "workoutTemplateId")}`
//     : "Workout";

//   return (
//     <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6, xl: 8 }} py={{ base: 5, md: 8 }}>
//       <Flex
//         direction={{ base: "column", md: "row" }}
//         align={{ base: "stretch", md: "center" }}
//         justify="space-between"
//         gap={4}
//         mb={8}
//       >
//         <Box>
//           <HStack spacing={2} mb={2}>
//             <Badge colorScheme="blue" borderRadius="full" px={3} py={1} fontSize="10px">
//               CLIENT WORKOUTS
//             </Badge>
//           </HStack>

//           <Heading size={{ base: "lg", md: "xl" }} color="gray.800" letterSpacing="-0.02em">
//             Workout Assignments
//           </Heading>

//           <Text mt={2} color="gray.500" lineHeight="1.7">
//             Add, edit, or remove workouts for a client without changing the reusable templates.
//           </Text>
//         </Box>

//         <HStack>
//           {selectedClientId > 0 && (
//             <Button
//               variant="ghost"
//               leftIcon={<FiArrowLeft />}
//               borderRadius="xl"
//               onClick={() => navigate(`/staff/clients/${selectedClientId}`)}
//             >
//               Client
//             </Button>
//           )}

//           <Button
//             colorScheme="blue"
//             leftIcon={<FiPlus />}
//             borderRadius="xl"
//             isDisabled={!selectedClientId || !organizationId}
//             onClick={() => setCreateOpen(true)}
//           >
//             Add Workouts
//           </Button>
//         </HStack>
//       </Flex>

//       <Box
//         bg="white"
//         border="1px solid"
//         borderColor="gray.100"
//         borderRadius="2xl"
//         p={5}
//         mb={6}
//         boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
//       >
//         <Text fontSize="sm" fontWeight="800" color="gray.800" mb={2}>
//           Client
//         </Text>

//         <Select
//           value={selectedClientId ? String(selectedClientId) : ""}
//           onChange={(event) => selectClient(event.target.value)}
//           placeholder="Choose a client"
//           size="lg"
//           borderRadius="xl"
//           bg="gray.50"
//           borderColor="gray.200"
//         >
//           {clients.map((client) => (
//             <option key={client.id} value={client.id}>
//               {client.name}
//               {client.nickname ? ` • ${client.nickname}` : ""}
//             </option>
//           ))}
//         </Select>
//       </Box>

//       {loading ? (
//         <Flex minH="320px" align="center" justify="center">
//           <VStack spacing={4}>
//             <Spinner size="xl" color="blue.400" />
//             <Text fontSize="sm" color="gray.500">
//               Loading workout assignments...
//             </Text>
//           </VStack>
//         </Flex>
//       ) : !selectedClientId ? (
//         <Box
//           bg="white"
//           border="1px dashed"
//           borderColor="blue.200"
//           borderRadius="2xl"
//           p={{ base: 8, md: 12 }}
//           textAlign="center"
//         >
//           <Heading size="sm" color="gray.800">
//             Select a client to manage workouts
//           </Heading>
//           <Text mt={2} fontSize="sm" color="gray.500">
//             You can add multiple templates and give each one its own training days.
//           </Text>
//         </Box>
//       ) : (
//         <VStack align="stretch" spacing={5}>
//           <HStack justify="space-between" align="start">
//             <Box>
//               <Text fontSize="sm" fontWeight="800" color="gray.800">
//                 {selectedClient?.name ?? "Selected client"}
//               </Text>
//               <Text mt={1} fontSize="sm" color="gray.500">
//                 {activeAssignments.length
//                   ? `${activeAssignments.length} active workout${activeAssignments.length === 1 ? "" : "s"}`
//                   : "No active workouts"}
//               </Text>
//             </Box>

//             {activeAssignments.length > 0 && (
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 colorScheme="red"
//                 leftIcon={<FiTrash2 />}
//                 isLoading={clearingAll}
//                 onClick={clearAll}
//               >
//                 Remove All
//               </Button>
//             )}
//           </HStack>

//           {activeAssignments.length === 0 ? (
//             <Box
//               bg="white"
//               border="1px dashed"
//               borderColor="gray.200"
//               borderRadius="2xl"
//               p={{ base: 8, md: 12 }}
//               textAlign="center"
//             >
//               <Heading size="sm" color="gray.800">
//                 No workouts assigned
//               </Heading>
//               <Text mt={2} fontSize="sm" color="gray.500">
//                 Start this client&apos;s training plan with one or more reusable workout templates.
//               </Text>
//               <Button
//                 mt={5}
//                 colorScheme="blue"
//                 leftIcon={<FiPlus />}
//                 borderRadius="xl"
//                 onClick={() => setCreateOpen(true)}
//               >
//                 Assign Workouts
//               </Button>
//             </Box>
//           ) : (
//             <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
//               {activeAssignments.map((assignment: any) => {
//                 const templateName =
//                   assignment.workout_name ??
//                   assignment.template_name ??
//                   `Workout #${assignment.workout_template_id ?? assignment.workoutTemplateId}`;
//                 const days = getValue(assignment, "scheduled_days", "scheduledDays");
//                 const startDate = getValue(assignment, "start_date", "startDate");
//                 const endDate = getValue(assignment, "end_date", "endDate");

//                 return (
//                   <Box
//                     key={assignment.id}
//                     bg="white"
//                     border="1px solid"
//                     borderColor="gray.100"
//                     borderRadius="2xl"
//                     p={5}
//                     boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
//                   >
//                     <HStack justify="space-between" align="start" gap={3}>
//                       <Box minW={0}>
//                         <Badge colorScheme="blue" borderRadius="full">
//                           Active
//                         </Badge>
//                         <Text mt={2} fontWeight="900" color="gray.800" noOfLines={1}>
//                           {templateName}
//                         </Text>
//                         <Text mt={1} fontSize="xs" color="gray.500">
//                           {assignment.training_goal_name || "Workout assignment"}
//                         </Text>
//                       </Box>
//                     </HStack>

//                     <HStack mt={5} spacing={2} align="start">
//                       <Icon as={FiCalendar} mt={0.5} color="blue.500" />
//                       <Box>
//                         <Text fontSize="xs" fontWeight="800" color="gray.700">
//                           {formatDays(days) || "Days not set"}
//                         </Text>
//                         <Text mt={1} fontSize="xs" color="gray.500">
//                           {startDate || "—"}
//                           {endDate ? ` → ${endDate}` : ""}
//                         </Text>
//                       </Box>
//                     </HStack>

//                     <HStack mt={5} spacing={2}>
//                       <Button
//                         flex={1}
//                         size="sm"
//                         variant="outline"
//                         borderRadius="xl"
//                         leftIcon={<FiEdit2 />}
//                         onClick={() => setEditAssignment(assignment)}
//                       >
//                         Edit
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         colorScheme="red"
//                         borderRadius="xl"
//                         leftIcon={<FiTrash2 />}
//                         isLoading={deletingId === assignment.id}
//                         onClick={() => removeAssignment(assignment)}
//                       >
//                         Remove
//                       </Button>
//                     </HStack>
//                   </Box>
//                 );
//               })}
//             </SimpleGrid>
//           )}
//         </VStack>
//       )}

//       {organizationId > 0 && (
//         <WorkoutAssignmentDrawer
//           isOpen={createOpen}
//           onClose={() => setCreateOpen(false)}
//           organizationId={organizationId}
//           templateId={null}
//           preselectedClientMemberId={selectedClientId || null}
//           onSuccess={async () => {
//             setCreateOpen(false);
//             await load();
//           }}
//         />
//       )}

//       <WorkoutAssignmentEditDrawer
//         isOpen={Boolean(editAssignment)}
//         onClose={() => setEditAssignment(null)}
//         organizationId={organizationId}
//         assignment={editAssignment}
//         templateName={editTemplateName}
//         onSuccess={load}
//       />
//     </Box>
//   );
// };

// export default StaffWorkoutAssignmentsPage;



// Version 2

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FiArrowLeft,
  FiCalendar,
  FiEdit2,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import api from "../../utils/api";

import {
  getMyWorkoutAssignments,
  getWorkoutWorkspace,
} from "../../services/workout.service";

import type {
  WorkoutAssignment,
} from "../../types/workout.types";

import WorkoutAssignmentDrawer from "../../components/StaffUI/Workouts/WorkoutAssignmentDrawer";
import WorkoutAssignmentEditDrawer from "../../components/StaffUI/Workouts/WorkoutAssignmentEditDrawer";

import {
  deleteClientWorkoutAssignments,
  deleteWorkoutAssignment,
} from "../../services/workoutAssignment.service";

interface ClientOption {
  id: number;
  name: string;
  nickname?: string | null;
}

const DAYS = [
  { key: "MON", name: "Monday" },
  { key: "TUE", name: "Tuesday" },
  { key: "WED", name: "Wednesday" },
  { key: "THU", name: "Thursday" },
  { key: "FRI", name: "Friday" },
  { key: "SAT", name: "Saturday" },
  { key: "SUN", name: "Sunday" },
];

const getValue = (
  assignment: any,
  ...keys: string[]
) => {
  for (const key of keys) {
    if (assignment?.[key] !== undefined) {
      return assignment[key];
    }
  }

  return null;
};

const normalizeClients = (
  response: any
): ClientOption[] => {
  const rawClients =
    Array.isArray(response?.data?.data)
      ? response.data.data
      : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data?.clients)
          ? response.data.data.clients
          : [];

  const map = new Map<number, ClientOption>();

  rawClients.forEach((client: any) => {
    const id = Number(
      client.member_id ??
      client.client_member_id ??
      client.id
    );

    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      map.has(id)
    ) {
      return;
    }

    map.set(id, {
      id,
      name: client.name || "Unnamed client",
      nickname: client.nickname || null,
    });
  });

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

const formatDays = (value: any) => {
  const days = Array.isArray(value)
    ? value
    : [];

  return days
    .map(
      (day: string) =>
        DAYS.find(
          (item) => item.key === day
        )?.name ?? day
    )
    .join(" • ");
};

type ConfirmAction =
  | {
      type: "single";
      assignment: WorkoutAssignment;
    }
  | {
      type: "all";
    }
  | null;

const StaffWorkoutAssignmentsPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const cancelRef =
    useRef<HTMLButtonElement>(null);

  const queryClientId = Number(
    searchParams.get("clientId")
  );

  const [organizationId, setOrganizationId] =
    useState(0);

  const [clients, setClients] =
    useState<ClientOption[]>([]);

  const [assignments, setAssignments] =
    useState<WorkoutAssignment[]>([]);

  const [selectedClientId, setSelectedClientId] =
    useState<number>(
      Number.isInteger(queryClientId) &&
        queryClientId > 0
        ? queryClientId
        : 0
    );

  const [loading, setLoading] =
    useState(true);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [editAssignment, setEditAssignment] =
    useState<WorkoutAssignment | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [clearingAll, setClearingAll] =
    useState(false);

  const [confirmAction, setConfirmAction] =
    useState<ConfirmAction>(null);

  const load = async () => {
    try {
      setLoading(true);

      const workspace =
        await getWorkoutWorkspace();

      const resolvedOrganizationId =
        Number(
          workspace?.organization?.id
        );

      if (!resolvedOrganizationId) {
        throw new Error(
          "Active organization could not be resolved."
        );
      }

      const [
        clientResponse,
        assignmentData,
      ] = await Promise.all([
        api.get("/coach/my-clients"),
        getMyWorkoutAssignments(
          resolvedOrganizationId
        ),
      ]);

      setOrganizationId(
        resolvedOrganizationId
      );

      setClients(
        normalizeClients(
          clientResponse
        )
      );

      setAssignments(
        Array.isArray(assignmentData)
          ? assignmentData
          : []
      );
    } catch (error: any) {
      console.error(
        "Failed to load workout assignments:",
        error
      );

      toast({
        title:
          "Unable to load workout assignments",
        description:
          error?.response?.data?.error ||
          error?.message ||
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    // One workspace fetch establishes the organization context for this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const value = Number(
      searchParams.get("clientId")
    );

    if (
      Number.isInteger(value) &&
      value > 0 &&
      value !== selectedClientId
    ) {
      setSelectedClientId(value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const activeAssignments = useMemo(() => {
    if (!selectedClientId) {
      return [];
    }

    return assignments.filter(
      (assignment: any) => {
        return (
          Number(
            assignment.client_member_id ??
              assignment.clientMemberId
          ) === Number(selectedClientId) &&
          String(
            assignment.status ?? "ACTIVE"
          ).toUpperCase() === "ACTIVE"
        );
      }
    );
  }, [
    assignments,
    selectedClientId,
  ]);

  const selectedClient = useMemo(
    () =>
      clients.find(
        (client) =>
          client.id === selectedClientId
      ),
    [
      clients,
      selectedClientId,
    ]
  );

  const selectClient = (
    value: string
  ) => {
    const id = Number(value);

    setSelectedClientId(id);

    if (id > 0) {
      setSearchParams({
        clientId: String(id),
      });
    } else {
      setSearchParams({});
    }
  };

  const removeAssignment = async (
    assignment: WorkoutAssignment
  ) => {
    if (
      !assignment.id ||
      !organizationId
    ) {
      return;
    }

    const templateName =
      assignment.workout_name ??
      assignment.template_name ??
      `Workout #${
        assignment.workout_template_id ??
        assignment.workoutTemplateId
      }`;

    try {
      setDeletingId(assignment.id);

      await deleteWorkoutAssignment(
        assignment.id,
        organizationId
      );

      toast({
        title: "Workout removed",
        description:
          `${templateName} is no longer assigned to this client.`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      setConfirmAction(null);

      await load();
    } catch (error: any) {
      console.error(
        "Failed to remove workout assignment:",
        error
      );

      toast({
        title:
          "Unable to remove workout",
        description:
          error?.response?.data?.error ||
          error?.message ||
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const clearAll = async () => {
    if (
      !activeAssignments.length ||
      !organizationId ||
      !selectedClientId
    ) {
      return;
    }

    try {
      setClearingAll(true);

      const result =
        await deleteClientWorkoutAssignments(
          selectedClientId,
          organizationId
        );

      toast({
        title: "All workouts removed",
        description:
          `${Number(
            result?.removedCount ?? 0
          )} active assignment(s) removed.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setConfirmAction(null);

      await load();
    } catch (error: any) {
      console.error(
        "Failed to clear workout assignments:",
        error
      );

      toast({
        title:
          "Unable to clear workouts",
        description:
          error?.response?.data?.error ||
          error?.message ||
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setClearingAll(false);
    }
  };

  const editTemplateName =
    editAssignment
      ? getValue(
          editAssignment,
          "workout_name",
          "template_name"
        ) ??
        `Workout #${getValue(
          editAssignment,
          "workout_template_id",
          "workoutTemplateId"
        )}`
      : "Workout";

  const confirmTitle =
    confirmAction?.type === "single"
      ? "Remove workout?"
      : "Remove all workouts?";

  const confirmBody =
    confirmAction?.type === "single"
      ? (() => {
          const assignment =
            confirmAction.assignment;

          const templateName =
            assignment.workout_name ??
            assignment.template_name ??
            `Workout #${
              assignment.workout_template_id ??
              assignment.workoutTemplateId
            }`;

          return (
            <>
              Are you sure you want to remove{" "}
              <Text as="span" fontWeight="800">
                {templateName}
              </Text>{" "}
              from{" "}
              <Text
                as="span"
                fontWeight="800"
              >
                {selectedClient?.name ??
                  "this client"}
              </Text>
              's active workouts?
              <Text
                mt={3}
                fontSize="sm"
                color="gray.500"
              >
                The reusable workout template
                will not be affected.
              </Text>
            </>
          );
        })()
      : (
          <>
            <Text>
              {selectedClient?.name ??
                "This client"}{" "}
              currently has{" "}
              <Text
                as="span"
                fontWeight="800"
              >
                {activeAssignments.length}
              </Text>{" "}
              active workout
              {activeAssignments.length ===
              1
                ? ""
                : "s"}.
            </Text>

            <Text
              mt={3}
              fontSize="sm"
              color="gray.500"
            >
              This will remove all active
              workout assignments for this
              client. Reusable workout
              templates will not be affected.
            </Text>
          </>
        );

  const confirmButtonText =
    confirmAction?.type === "single"
      ? "Remove Workout"
      : "Remove All";

  const confirming =
    deletingId !== null ||
    clearingAll;

  return (
    <>
      <Box
        maxW="1200px"
        mx="auto"
        px={{
          base: 4,
          md: 6,
          xl: 8,
        }}
        py={{
          base: 5,
          md: 8,
        }}
      >
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          align={{
            base: "stretch",
            md: "center",
          }}
          justify="space-between"
          gap={4}
          mb={8}
        >
          <Box>
            <HStack
              spacing={2}
              mb={2}
            >
              <Badge
                colorScheme="blue"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="10px"
              >
                CLIENT WORKOUTS
              </Badge>
            </HStack>

            <Heading
              size={{
                base: "lg",
                md: "xl",
              }}
              color="gray.800"
              letterSpacing="-0.02em"
            >
              Workout Assignments
            </Heading>

            <Text
              mt={2}
              color="gray.500"
              lineHeight="1.7"
            >
              Add, edit, or remove workouts
              for a client without changing
              the reusable templates.
            </Text>
          </Box>

          <HStack>
            {selectedClientId > 0 && (
              <Button
                variant="ghost"
                leftIcon={<FiArrowLeft />}
                borderRadius="xl"
                onClick={() =>
                  navigate(
                    `/staff/clients/${selectedClientId}`
                  )
                }
              >
                Client
              </Button>
            )}

            <Button
              colorScheme="blue"
              leftIcon={<FiPlus />}
              borderRadius="xl"
              isDisabled={
                !selectedClientId ||
                !organizationId
              }
              onClick={() =>
                setCreateOpen(true)
              }
            >
              Add Workouts
            </Button>
          </HStack>
        </Flex>

        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          p={5}
          mb={6}
          boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
        >
          <Text
            fontSize="sm"
            fontWeight="800"
            color="gray.800"
            mb={2}
          >
            Client
          </Text>

          <Select
            value={
              selectedClientId
                ? String(selectedClientId)
                : ""
            }
            onChange={(event) =>
              selectClient(
                event.target.value
              )
            }
            placeholder="Choose a client"
            size="lg"
            borderRadius="xl"
            bg="gray.50"
            borderColor="gray.200"
          >
            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.name}
                {client.nickname
                  ? ` • ${client.nickname}`
                  : ""}
              </option>
            ))}
          </Select>
        </Box>

        {loading ? (
          <Flex
            minH="320px"
            align="center"
            justify="center"
          >
            <VStack spacing={4}>
              <Spinner
                size="xl"
                color="blue.400"
              />

              <Text
                fontSize="sm"
                color="gray.500"
              >
                Loading workout
                assignments...
              </Text>
            </VStack>
          </Flex>
        ) : !selectedClientId ? (
          <Box
            bg="white"
            border="1px dashed"
            borderColor="blue.200"
            borderRadius="2xl"
            p={{
              base: 8,
              md: 12,
            }}
            textAlign="center"
          >
            <Heading
              size="sm"
              color="gray.800"
            >
              Select a client to manage
              workouts
            </Heading>

            <Text
              mt={2}
              fontSize="sm"
              color="gray.500"
            >
              You can add multiple
              templates and give each one
              its own training days.
            </Text>
          </Box>
        ) : (
          <VStack
            align="stretch"
            spacing={5}
          >
            <HStack
              justify="space-between"
              align="start"
            >
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="800"
                  color="gray.800"
                >
                  {selectedClient?.name ??
                    "Selected client"}
                </Text>

                <Text
                  mt={1}
                  fontSize="sm"
                  color="gray.500"
                >
                  {activeAssignments.length
                    ? `${activeAssignments.length} active workout${
                        activeAssignments.length ===
                        1
                          ? ""
                          : "s"
                      }`
                    : "No active workouts"}
                </Text>
              </Box>

              {activeAssignments.length >
                0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  leftIcon={
                    <FiTrash2 />
                  }
                  isLoading={clearingAll}
                  onClick={() =>
                    setConfirmAction({
                      type: "all",
                    })
                  }
                >
                  Remove All
                </Button>
              )}
            </HStack>

            {activeAssignments.length ===
            0 ? (
              <Box
                bg="white"
                border="1px dashed"
                borderColor="gray.200"
                borderRadius="2xl"
                p={{
                  base: 8,
                  md: 12,
                }}
                textAlign="center"
              >
                <Heading
                  size="sm"
                  color="gray.800"
                >
                  No workouts assigned
                </Heading>

                <Text
                  mt={2}
                  fontSize="sm"
                  color="gray.500"
                >
                  Start this client's
                  training plan with one or
                  more reusable workout
                  templates.
                </Text>

                <Button
                  mt={5}
                  colorScheme="blue"
                  leftIcon={
                    <FiPlus />
                  }
                  borderRadius="xl"
                  onClick={() =>
                    setCreateOpen(true)
                  }
                >
                  Assign Workouts
                </Button>
              </Box>
            ) : (
              <SimpleGrid
                columns={{
                  base: 1,
                  md: 2,
                }}
                spacing={5}
              >
                {activeAssignments.map(
                  (assignment: any) => {
                    const templateName =
                      assignment.workout_name ??
                      assignment.template_name ??
                      `Workout #${
                        assignment.workout_template_id ??
                        assignment.workoutTemplateId
                      }`;

                    const days =
                      getValue(
                        assignment,
                        "scheduled_days",
                        "scheduledDays"
                      );

                    const startDate =
                      getValue(
                        assignment,
                        "start_date",
                        "startDate"
                      );

                    const endDate =
                      getValue(
                        assignment,
                        "end_date",
                        "endDate"
                      );

                    return (
                      <Box
                        key={assignment.id}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.100"
                        borderRadius="2xl"
                        p={5}
                        boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
                      >
                        <HStack
                          justify="space-between"
                          align="start"
                          gap={3}
                        >
                          <Box minW={0}>
                            <Badge
                              colorScheme="blue"
                              borderRadius="full"
                            >
                              Active
                            </Badge>

                            <Text
                              mt={2}
                              fontWeight="900"
                              color="gray.800"
                              noOfLines={1}
                            >
                              {
                                templateName
                              }
                            </Text>

                            <Text
                              mt={1}
                              fontSize="xs"
                              color="gray.500"
                            >
                              {assignment.training_goal_name ||
                                "Workout assignment"}
                            </Text>
                          </Box>
                        </HStack>

                        <HStack
                          mt={5}
                          spacing={2}
                          align="start"
                        >
                          <Icon
                            as={FiCalendar}
                            mt={0.5}
                            color="blue.500"
                          />

                          <Box>
                            <Text
                              fontSize="xs"
                              fontWeight="800"
                              color="gray.700"
                            >
                              {formatDays(
                                days
                              ) ||
                                "Days not set"}
                            </Text>

                            <Text
                              mt={1}
                              fontSize="xs"
                              color="gray.500"
                            >
                              {startDate ||
                                "—"}
                              {endDate
                                ? ` → ${endDate}`
                                : ""}
                            </Text>
                          </Box>
                        </HStack>

                        <HStack
                          mt={5}
                          spacing={2}
                        >
                          <Button
                            flex={1}
                            size="sm"
                            variant="outline"
                            borderRadius="xl"
                            leftIcon={
                              <FiEdit2 />
                            }
                            onClick={() =>
                              setEditAssignment(
                                assignment
                              )
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            borderRadius="xl"
                            leftIcon={
                              <FiTrash2 />
                            }
                            isLoading={
                              deletingId ===
                              assignment.id
                            }
                            onClick={() =>
                              setConfirmAction(
                                {
                                  type: "single",
                                  assignment,
                                }
                              )
                            }
                          >
                            Remove
                          </Button>
                        </HStack>
                      </Box>
                    );
                  }
                )}
              </SimpleGrid>
            )}
          </VStack>
        )}

        {organizationId > 0 && (
          <WorkoutAssignmentDrawer
            isOpen={createOpen}
            onClose={() =>
              setCreateOpen(false)
            }
            organizationId={
              organizationId
            }
            templateId={null}
            preselectedClientMemberId={
              selectedClientId || null
            }
            onSuccess={async () => {
              setCreateOpen(false);
              await load();
            }}
          />
        )}

        <WorkoutAssignmentEditDrawer
          isOpen={Boolean(editAssignment)}
          onClose={() =>
            setEditAssignment(null)
          }
          organizationId={organizationId}
          assignment={editAssignment}
          templateName={
            editTemplateName
          }
          onSuccess={load}
        />
      </Box>

      {/* --------------------------------------------------
          DELETE CONFIRMATION
      -------------------------------------------------- */}
      <AlertDialog
        isOpen={Boolean(confirmAction)}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          if (!confirming) {
            setConfirmAction(null);
          }
        }}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          borderRadius="2xl"
          mx={4}
        >
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="900"
            color="gray.800"
          >
            {confirmTitle}
          </AlertDialogHeader>

          <AlertDialogBody
            color="gray.600"
            fontSize="sm"
            lineHeight="1.7"
          >
            {confirmBody}
          </AlertDialogBody>

          <AlertDialogFooter
            gap={3}
          >
            <Button
              ref={cancelRef}
              variant="ghost"
              borderRadius="xl"
              onClick={() =>
                setConfirmAction(
                  null
                )
              }
              isDisabled={confirming}
            >
              Cancel
            </Button>

            <Button
              colorScheme="red"
              borderRadius="xl"
              leftIcon={
                <FiTrash2 />
              }
              isLoading={confirming}
              onClick={() => {
                if (
                  !confirmAction
                ) {
                  return;
                }

                if (
                  confirmAction.type ===
                  "single"
                ) {
                  void removeAssignment(
                    confirmAction.assignment
                  );
                  return;
                }

                void clearAll();
              }}
            >
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StaffWorkoutAssignmentsPage;
