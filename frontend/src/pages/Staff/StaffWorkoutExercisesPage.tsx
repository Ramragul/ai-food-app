//  Version 1

// import {
//   Badge,
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Heading,
//   HStack,
//   Icon,
//   Input,
//   Select,
//   SimpleGrid,
//   Spinner,
//   Text,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import {
//   FiArrowLeft,
//   FiEdit2,
//   FiPlus,
//   FiSearch,
//   FiSliders,
// } from "react-icons/fi";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getWorkoutEquipment,
//   getWorkoutExercises,
//   getWorkoutMuscleGroups,
//   type WorkoutEquipment,
//   type WorkoutExerciseListItem,
//   type WorkoutMuscleGroup,
// } from "../../services/workoutExercise.service";

// const TRACKING_OPTIONS = [
//   { value: "REPS_WEIGHT", label: "Reps + Weight" },
//   { value: "REPS_ONLY", label: "Reps Only" },
//   { value: "DURATION", label: "Duration" },
//   { value: "DISTANCE", label: "Distance" },
//   { value: "REPS_DURATION", label: "Reps + Duration" },
// ];

// const ENVIRONMENT_OPTIONS = [
//   { value: "HOME", label: "Home" },
//   { value: "GYM", label: "Gym" },
//   { value: "BOTH", label: "Home + Gym" },
// ];

// const DIFFICULTY_OPTIONS = [
//   "BEGINNER",
//   "INTERMEDIATE",
//   "ADVANCED",
// ];

// const prettyValue = (value?: string | null) => {
//   if (!value) return "—";

//   return value
//     .toLowerCase()
//     .split("_")
//     .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
//     .join(" ");
// };

// const StaffWorkoutExercisesPage = () => {
//   const navigate = useNavigate();
//   const toast = useToast();

//   const [loading, setLoading] = useState(true);
//   const [loadingFilters, setLoadingFilters] = useState(true);
//   const [exercises, setExercises] = useState<WorkoutExerciseListItem[]>([]);
//   const [muscleGroups, setMuscleGroups] = useState<WorkoutMuscleGroup[]>([]);
//   const [equipment, setEquipment] = useState<WorkoutEquipment[]>([]);

//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [muscleGroupId, setMuscleGroupId] = useState<number | "">("");
//   const [equipmentId, setEquipmentId] = useState<number | "">("");
//   const [environment, setEnvironment] = useState("");
//   const [trackingType, setTrackingType] = useState("");
//   const [difficulty, setDifficulty] = useState("");

//   const loadExercises = useCallback(async () => {
//     try {
//       setLoading(true);

//       const data = await getWorkoutExercises({
//         muscleGroupId,
//         equipmentId,
//         environment,
//         trackingType,
//         difficulty,
//         search,
//       });

//       setExercises(Array.isArray(data) ? data : []);
//     } catch (error: any) {
//       console.error("Failed to load exercises:", error);

//       toast({
//         title: "Unable to load exercises",
//         description:
//           error?.response?.data?.error ??
//           error?.message ??
//           "Please try again.",
//         status: "error",
//         duration: 3500,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [difficulty, equipmentId, environment, muscleGroupId, search, toast]);

//   const loadFilters = useCallback(async () => {
//     try {
//       setLoadingFilters(true);

//       const [muscles, equipmentData] = await Promise.all([
//         getWorkoutMuscleGroups(),
//         getWorkoutEquipment(),
//       ]);

//       setMuscleGroups(Array.isArray(muscles) ? muscles : []);
//       setEquipment(Array.isArray(equipmentData) ? equipmentData : []);
//     } catch (error: any) {
//       console.error("Failed to load exercise filters:", error);

//       toast({
//         title: "Unable to load exercise filters",
//         description:
//           error?.response?.data?.error ??
//           error?.message ??
//           "Please try again.",
//         status: "error",
//         duration: 3500,
//         isClosable: true,
//       });
//     } finally {
//       setLoadingFilters(false);
//     }
//   }, [toast]);

//   useEffect(() => {
//     void Promise.all([loadFilters(), loadExercises()]);
//   }, [loadFilters, loadExercises]);

//   const activeFilterCount = useMemo(
//     () =>
//       [muscleGroupId, equipmentId, environment, trackingType, difficulty]
//         .filter(Boolean).length,
//     [difficulty, equipmentId, environment, muscleGroupId, trackingType]
//   );

//   const clearFilters = () => {
//     setSearchInput("");
//     setSearch("");
//     setMuscleGroupId("");
//     setEquipmentId("");
//     setEnvironment("");
//     setTrackingType("");
//     setDifficulty("");
//   };

//   const muscleName = (id?: number | null) =>
//     muscleGroups.find((item) => item.id === id)?.name;

//   return (
//     <Box
//       maxW="1500px"
//       mx="auto"
//       px={{ base: 4, md: 6, xl: 8 }}
//       py={{ base: 5, md: 8 }}
//     >
//       <Flex
//         direction={{ base: "column", lg: "row" }}
//         align={{ base: "stretch", lg: "center" }}
//         justify="space-between"
//         gap={5}
//         mb={8}
//       >
//         <Box>
//           <HStack spacing={2} mb={2}>
//             <Badge colorScheme="blue" borderRadius="full" px={3} py={1} fontSize="10px">
//               EXERCISE LIBRARY
//             </Badge>
//             <Badge colorScheme="gray" borderRadius="full" px={3} py={1} fontSize="10px">
//               {exercises.length} RESULT{exercises.length === 1 ? "" : "S"}
//             </Badge>
//           </HStack>

//           <Heading size={{ base: "lg", md: "xl" }} color="gray.800" letterSpacing="-0.02em">
//             Exercise Library
//           </Heading>

//           <Text mt={2} maxW="720px" color="gray.500" lineHeight="1.7">
//             Manage the NEKA master exercise catalogue used when building workout templates.
//           </Text>
//         </Box>

//         <HStack>
//           <Button
//             variant="ghost"
//             leftIcon={<FiArrowLeft />}
//             borderRadius="xl"
//             onClick={() => navigate("/staff/workouts")}
//           >
//             Workouts
//           </Button>

//           <Button
//             colorScheme="blue"
//             leftIcon={<FiPlus />}
//             borderRadius="xl"
//             onClick={() => navigate("/staff/workouts/exercises/new")}
//           >
//             Create Exercise
//           </Button>
//         </HStack>
//       </Flex>

//       <Box
//         bg="white"
//         border="1px solid"
//         borderColor="gray.100"
//         borderRadius="2xl"
//         p={{ base: 4, md: 5 }}
//         mb={7}
//         boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
//       >
//         <Flex gap={3} align="center" mb={4}>
//           <Icon as={FiSliders} color="blue.500" />
//           <Text fontWeight="800" color="gray.800">Search & Filters</Text>
//           {activeFilterCount > 0 && (
//             <Badge colorScheme="blue" borderRadius="full">
//               {activeFilterCount} active
//             </Badge>
//           )}
//         </Flex>

//         <Grid templateColumns={{ base: "1fr", lg: "2fr repeat(5, 1fr)" }} gap={3}>
//           <Box position="relative">
//             <Icon
//               as={FiSearch}
//               position="absolute"
//               left={3}
//               top="50%"
//               transform="translateY(-50%)"
//               color="gray.400"
//               zIndex={1}
//             />

//             <Input
//               pl={10}
//               value={searchInput}
//               onChange={(event) => setSearchInput(event.target.value)}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") {
//                   setSearch(searchInput.trim());
//                 }
//               }}
//               placeholder="Search exercise name or description..."
//               borderRadius="xl"
//               bg="gray.50"
//             />
//           </Box>

//           <Select
//             value={muscleGroupId}
//             onChange={(event) => setMuscleGroupId(event.target.value ? Number(event.target.value) : "")}
//             placeholder="Muscle"
//             borderRadius="xl"
//             bg="gray.50"
//             isDisabled={loadingFilters}
//           >
//             {muscleGroups.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </Select>

//           <Select
//             value={equipmentId}
//             onChange={(event) => setEquipmentId(event.target.value ? Number(event.target.value) : "")}
//             placeholder="Equipment"
//             borderRadius="xl"
//             bg="gray.50"
//             isDisabled={loadingFilters}
//           >
//             {equipment.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </Select>

//           <Select
//             value={environment}
//             onChange={(event) => setEnvironment(event.target.value)}
//             placeholder="Environment"
//             borderRadius="xl"
//             bg="gray.50"
//           >
//             {ENVIRONMENT_OPTIONS.map((item) => (
//               <option key={item.value} value={item.value}>
//                 {item.label}
//               </option>
//             ))}
//           </Select>

//           <Select
//             value={trackingType}
//             onChange={(event) => setTrackingType(event.target.value)}
//             placeholder="Tracking"
//             borderRadius="xl"
//             bg="gray.50"
//           >
//             {TRACKING_OPTIONS.map((item) => (
//               <option key={item.value} value={item.value}>
//                 {item.label}
//               </option>
//             ))}
//           </Select>

//           <Select
//             value={difficulty}
//             onChange={(event) => setDifficulty(event.target.value)}
//             placeholder="Difficulty"
//             borderRadius="xl"
//             bg="gray.50"
//           >
//             {DIFFICULTY_OPTIONS.map((item) => (
//               <option key={item} value={item}>
//                 {prettyValue(item)}
//               </option>
//             ))}
//           </Select>
//         </Grid>

//         <HStack justify="space-between" mt={4}>
//           <Text fontSize="xs" color="gray.400">
//             Press Enter in search to apply it. Other filters refresh automatically.
//           </Text>

//           {activeFilterCount > 0 || search ? (
//             <Button
//               size="xs"
//               variant="ghost"
//               colorScheme="blue"
//               onClick={clearFilters}
//             >
//               Clear filters
//             </Button>
//           ) : null}
//         </HStack>
//       </Box>

//       {loading ? (
//         <Flex minH="360px" align="center" justify="center">
//           <VStack spacing={4}>
//             <Spinner size="xl" color="blue.400" />
//             <Text fontSize="sm" color="gray.500">Loading exercise library...</Text>
//           </VStack>
//         </Flex>
//       ) : exercises.length === 0 ? (
//         <Box
//           bg="white"
//           border="1px dashed"
//           borderColor="blue.200"
//           borderRadius="2xl"
//           p={{ base: 8, md: 12 }}
//           textAlign="center"
//         >
//           <Heading size="sm" color="gray.800">No exercises found</Heading>
//           <Text mt={2} fontSize="sm" color="gray.500">
//             Try changing the search or filters, or create a new exercise.
//           </Text>
//           <Button
//             mt={5}
//             colorScheme="blue"
//             borderRadius="xl"
//             leftIcon={<FiPlus />}
//             onClick={() => navigate("/staff/workouts/exercises/new")}
//           >
//             Create Exercise
//           </Button>
//         </Box>
//       ) : (
//         <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
//           {exercises.map((exercise) => (
//             <Box
//               key={exercise.id}
//               bg="white"
//               border="1px solid"
//               borderColor="gray.100"
//               borderRadius="2xl"
//               p={5}
//               boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
//               transition="all 0.2s ease"
//               _hover={{
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 14px 36px rgba(15, 23, 42, 0.08)",
//               }}
//             >
//               <Flex justify="space-between" align="start" gap={3}>
//                 <Box minW={0}>
//                   <Badge colorScheme="blue" borderRadius="full">
//                     {prettyValue(exercise.difficulty)}
//                   </Badge>

//                   <Heading mt={2} size="sm" noOfLines={2} color="gray.800">
//                     {exercise.name}
//                   </Heading>

//                   <Text mt={2} fontSize="sm" color="gray.500" noOfLines={2}>
//                     {exercise.description || "No description provided."}
//                   </Text>
//                 </Box>

//                 <Badge colorScheme="gray" borderRadius="full" flexShrink={0}>
//                   {exercise.environment || "—"}
//                 </Badge>
//               </Flex>

//               <HStack mt={5} spacing={2} flexWrap="wrap">
//                 <Badge variant="subtle" colorScheme="purple">
//                   {exercise.primary_muscle_group || muscleName(exercise.primary_muscle_group_id) || "No muscle"}
//                 </Badge>

//                 {exercise.movement_pattern && (
//                   <Badge variant="subtle" colorScheme="orange">
//                     {prettyValue(exercise.movement_pattern)}
//                   </Badge>
//                 )}

//                 {exercise.tracking_type && (
//                   <Badge variant="subtle" colorScheme="green">
//                     {prettyValue(exercise.tracking_type)}
//                   </Badge>
//                 )}
//               </HStack>

//               <Button
//                 mt={5}
//                 width="full"
//                 size="sm"
//                 variant="outline"
//                 borderRadius="xl"
//                 leftIcon={<FiEdit2 />}
//                 onClick={() => navigate(`/staff/workouts/exercises/${exercise.id}/edit`)}
//               >
//                 Edit Exercise
//               </Button>
//             </Box>
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default StaffWorkoutExercisesPage;


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
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiSliders,
} from "react-icons/fi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteWorkoutExercise,
  getWorkoutEquipment,
  getWorkoutExercises,
  getWorkoutMuscleGroups,
  type WorkoutEquipment,
  type WorkoutExerciseListItem,
  type WorkoutMuscleGroup,
} from "../../services/workoutExercise.service";

const TRACKING_OPTIONS = [
  { value: "REPS_WEIGHT", label: "Reps + Weight" },
  { value: "REPS_ONLY", label: "Reps Only" },
  { value: "DURATION", label: "Duration" },
  { value: "DISTANCE", label: "Distance" },
  { value: "REPS_DURATION", label: "Reps + Duration" },
];

const ENVIRONMENT_OPTIONS = [
  { value: "HOME", label: "Home" },
  { value: "GYM", label: "Gym" },
  { value: "BOTH", label: "Home + Gym" },
];

const DIFFICULTY_OPTIONS = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
];

const prettyValue = (value?: string | null) => {
  if (!value) return "—";

  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const StaffWorkoutExercisesPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [exercises, setExercises] = useState<WorkoutExerciseListItem[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<WorkoutMuscleGroup[]>([]);
  const [equipment, setEquipment] = useState<WorkoutEquipment[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [muscleGroupId, setMuscleGroupId] = useState<number | "">("");
  const [equipmentId, setEquipmentId] = useState<number | "">("");
  const [environment, setEnvironment] = useState("");
  const [trackingType, setTrackingType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [deleteExercise, setDeleteExercise] = useState<WorkoutExerciseListItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);

  const confirmDeleteExercise = async () => {
    if (!deleteExercise?.id) return;

    try {
      setDeleting(true);

      await deleteWorkoutExercise(deleteExercise.id);

      toast({
        title: "Exercise deleted",
        description:
          `${deleteExercise.name} has been removed from the exercise library.`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      setDeleteExercise(null);
      await loadExercises();
    } catch (error: any) {
      console.error("Failed to delete exercise:", error);

      toast({
        title: "Unable to delete exercise",
        description:
          error?.response?.data?.error ??
          error?.message ??
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setDeleting(false);
    }
  };


  const loadExercises = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getWorkoutExercises({
        muscleGroupId,
        equipmentId,
        environment,
        trackingType,
        difficulty,
        search,
      });

      setExercises(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Failed to load exercises:", error);

      toast({
        title: "Unable to load exercises",
        description:
          error?.response?.data?.error ??
          error?.message ??
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [difficulty, equipmentId, environment, muscleGroupId, search, toast]);

  const loadFilters = useCallback(async () => {
    try {
      setLoadingFilters(true);

      const [muscles, equipmentData] = await Promise.all([
        getWorkoutMuscleGroups(),
        getWorkoutEquipment(),
      ]);

      setMuscleGroups(Array.isArray(muscles) ? muscles : []);
      setEquipment(Array.isArray(equipmentData) ? equipmentData : []);
    } catch (error: any) {
      console.error("Failed to load exercise filters:", error);

      toast({
        title: "Unable to load exercise filters",
        description:
          error?.response?.data?.error ??
          error?.message ??
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setLoadingFilters(false);
    }
  }, [toast]);

  useEffect(() => {
    void Promise.all([loadFilters(), loadExercises()]);
  }, [loadFilters, loadExercises]);

  const activeFilterCount = useMemo(
    () =>
      [muscleGroupId, equipmentId, environment, trackingType, difficulty]
        .filter(Boolean).length,
    [difficulty, equipmentId, environment, muscleGroupId, trackingType]
  );

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setMuscleGroupId("");
    setEquipmentId("");
    setEnvironment("");
    setTrackingType("");
    setDifficulty("");
  };

  const muscleName = (id?: number | null) =>
    muscleGroups.find((item) => item.id === id)?.name;

  return (
    <>
    <Box
      maxW="1500px"
      mx="auto"
      px={{ base: 4, md: 6, xl: 8 }}
      py={{ base: 5, md: 8 }}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        align={{ base: "stretch", lg: "center" }}
        justify="space-between"
        gap={5}
        mb={8}
      >
        <Box>
          <HStack spacing={2} mb={2}>
            <Badge colorScheme="blue" borderRadius="full" px={3} py={1} fontSize="10px">
              EXERCISE LIBRARY
            </Badge>
            <Badge colorScheme="gray" borderRadius="full" px={3} py={1} fontSize="10px">
              {exercises.length} RESULT{exercises.length === 1 ? "" : "S"}
            </Badge>
          </HStack>

          <Heading size={{ base: "lg", md: "xl" }} color="gray.800" letterSpacing="-0.02em">
            Exercise Library
          </Heading>

          <Text mt={2} maxW="720px" color="gray.500" lineHeight="1.7">
            Manage the NEKA master exercise catalogue used when building workout templates.
          </Text>
        </Box>

        <HStack>
          <Button
            variant="ghost"
            leftIcon={<FiArrowLeft />}
            borderRadius="xl"
            onClick={() => navigate("/staff/workouts")}
          >
            Workouts
          </Button>

          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            borderRadius="xl"
            onClick={() => navigate("/staff/workouts/exercises/new")}
          >
            Create Exercise
          </Button>
        </HStack>
      </Flex>

      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="2xl"
        p={{ base: 4, md: 5 }}
        mb={7}
        boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
      >
        <Flex gap={3} align="center" mb={4}>
          <Icon as={FiSliders} color="blue.500" />
          <Text fontWeight="800" color="gray.800">Search & Filters</Text>
          {activeFilterCount > 0 && (
            <Badge colorScheme="blue" borderRadius="full">
              {activeFilterCount} active
            </Badge>
          )}
        </Flex>

        <Grid templateColumns={{ base: "1fr", lg: "2fr repeat(5, 1fr)" }} gap={3}>
          <Box position="relative">
            <Icon
              as={FiSearch}
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              zIndex={1}
            />

            <Input
              pl={10}
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSearch(searchInput.trim());
                }
              }}
              placeholder="Search exercise name or description..."
              borderRadius="xl"
              bg="gray.50"
            />
          </Box>

          <Select
            value={muscleGroupId}
            onChange={(event) => setMuscleGroupId(event.target.value ? Number(event.target.value) : "")}
            placeholder="Muscle"
            borderRadius="xl"
            bg="gray.50"
            isDisabled={loadingFilters}
          >
            {muscleGroups.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>

          <Select
            value={equipmentId}
            onChange={(event) => setEquipmentId(event.target.value ? Number(event.target.value) : "")}
            placeholder="Equipment"
            borderRadius="xl"
            bg="gray.50"
            isDisabled={loadingFilters}
          >
            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>

          <Select
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
            placeholder="Environment"
            borderRadius="xl"
            bg="gray.50"
          >
            {ENVIRONMENT_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>

          <Select
            value={trackingType}
            onChange={(event) => setTrackingType(event.target.value)}
            placeholder="Tracking"
            borderRadius="xl"
            bg="gray.50"
          >
            {TRACKING_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>

          <Select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            placeholder="Difficulty"
            borderRadius="xl"
            bg="gray.50"
          >
            {DIFFICULTY_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {prettyValue(item)}
              </option>
            ))}
          </Select>
        </Grid>

        <HStack justify="space-between" mt={4}>
          <Text fontSize="xs" color="gray.400">
            Press Enter in search to apply it. Other filters refresh automatically.
          </Text>

          {activeFilterCount > 0 || search ? (
            <Button
              size="xs"
              variant="ghost"
              colorScheme="blue"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          ) : null}
        </HStack>
      </Box>

      {loading ? (
        <Flex minH="360px" align="center" justify="center">
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.400" />
            <Text fontSize="sm" color="gray.500">Loading exercise library...</Text>
          </VStack>
        </Flex>
      ) : exercises.length === 0 ? (
        <Box
          bg="white"
          border="1px dashed"
          borderColor="blue.200"
          borderRadius="2xl"
          p={{ base: 8, md: 12 }}
          textAlign="center"
        >
          <Heading size="sm" color="gray.800">No exercises found</Heading>
          <Text mt={2} fontSize="sm" color="gray.500">
            Try changing the search or filters, or create a new exercise.
          </Text>
          <Button
            mt={5}
            colorScheme="blue"
            borderRadius="xl"
            leftIcon={<FiPlus />}
            onClick={() => navigate("/staff/workouts/exercises/new")}
          >
            Create Exercise
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
          {exercises.map((exercise) => (
            <Box
              key={exercise.id}
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="2xl"
              p={5}
              boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
              transition="all 0.2s ease"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 14px 36px rgba(15, 23, 42, 0.08)",
              }}
            >
              <Flex justify="space-between" align="start" gap={3}>
                <Box minW={0}>
                  <Badge colorScheme="blue" borderRadius="full">
                    {prettyValue(exercise.difficulty)}
                  </Badge>

                  <Heading mt={2} size="sm" noOfLines={2} color="gray.800">
                    {exercise.name}
                  </Heading>

                  <Text mt={2} fontSize="sm" color="gray.500" noOfLines={2}>
                    {exercise.description || "No description provided."}
                  </Text>
                </Box>

                <Badge colorScheme="gray" borderRadius="full" flexShrink={0}>
                  {exercise.environment || "—"}
                </Badge>
              </Flex>

              <HStack mt={5} spacing={2} flexWrap="wrap">
                <Badge variant="subtle" colorScheme="purple">
                  {exercise.primary_muscle_group || muscleName(exercise.primary_muscle_group_id) || "No muscle"}
                </Badge>

                {exercise.movement_pattern && (
                  <Badge variant="subtle" colorScheme="orange">
                    {prettyValue(exercise.movement_pattern)}
                  </Badge>
                )}

                {exercise.tracking_type && (
                  <Badge variant="subtle" colorScheme="green">
                    {prettyValue(exercise.tracking_type)}
                  </Badge>
                )}
              </HStack>

              <HStack mt={5} spacing={2}>
                <Button
                  flex={1}
                  size="sm"
                  variant="outline"
                  borderRadius="xl"
                  leftIcon={<FiEdit2 />}
                  onClick={() => navigate(`/staff/workouts/exercises/${exercise.id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  borderRadius="xl"
                  leftIcon={<FiTrash2 />}
                  onClick={() => setDeleteExercise(exercise)}
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>

      <AlertDialog
        isOpen={Boolean(deleteExercise)}
        leastDestructiveRef={cancelDeleteRef}
        onClose={() => {
          if (!deleting) {
            setDeleteExercise(null);
          }
        }}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent borderRadius="2xl" mx={4}>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="900"
            color="gray.800"
          >
            Delete exercise?
          </AlertDialogHeader>

          <AlertDialogBody
            color="gray.600"
            fontSize="sm"
            lineHeight="1.7"
          >
            Are you sure you want to remove{" "}
            <Text as="span" fontWeight="800">
              {deleteExercise?.name ?? "this exercise"}
            </Text>{" "}
            from the exercise library?

            <Text mt={3} fontSize="sm" color="gray.500">
              The exercise will be deactivated and will no longer appear in the library or be available for new workout templates. Existing templates that already use it will keep their reference.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter gap={3}>
            <Button
              ref={cancelDeleteRef}
              variant="ghost"
              borderRadius="xl"
              onClick={() => setDeleteExercise(null)}
              isDisabled={deleting}
            >
              Cancel
            </Button>

            <Button
              colorScheme="red"
              borderRadius="xl"
              leftIcon={<FiTrash2 />}
              isLoading={deleting}
              onClick={() => void confirmDeleteExercise()}
            >
              Delete Exercise
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StaffWorkoutExercisesPage;

