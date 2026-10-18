//  Version 1

// import {
//   Badge,
//   Box,
//   Button,
//   Flex,
//   Heading,
//   HStack,
//   Image,
//   Input,
//   Select,
//   SimpleGrid,
//   Skeleton,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import { FiArrowLeft, FiSearch } from "react-icons/fi";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { getExerciseLibrary, getWorkoutMuscleGroups } from "../../services/userWorkout.service";

// const WorkoutLibraryPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [muscleGroupId, setMuscleGroupId] = useState("");
//   const [muscles, setMuscles] = useState<any[]>([]);
//   const [exercises, setExercises] = useState<any[]>([]);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const [muscleData, exerciseData] = await Promise.all([
//         getWorkoutMuscleGroups(),
//         getExerciseLibrary({ search: search || undefined, muscleGroupId: muscleGroupId || undefined }),
//       ]);
//       setMuscles(muscleData);
//       setExercises(exerciseData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     // Refresh whenever filters change.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [muscleGroupId]);

//   const filtered = useMemo(() => {
//     const query = search.trim().toLowerCase();
//     if (!query) return exercises;
//     return exercises.filter((item) => String(item.name || "").toLowerCase().includes(query));
//   }, [exercises, search]);

//   return (
//     <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 8 }} py={{ base: 5, md: 8 }}>
//       <Box maxW="1250px" mx="auto">
//         <Button variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate("/workouts")} mb={5}>
//           My Workouts
//         </Button>
//         <Heading size={{ base: "lg", md: "xl" }}>Exercise Library</Heading>
//         <Text mt={2} color="gray.500" maxW="720px" lineHeight="1.7">
//           Browse exercises, learn the movement, and build familiarity with the NEKA exercise library. This is for learning — not for replacing an assigned workout.
//         </Text>

//         <Flex mt={7} gap={3} direction={{ base: "column", md: "row" }}>
//           <HStack flex="1" bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" px={3}>
//             <FiSearch color="#A0AEC0" />
//             <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") load(); }} border="none" _focus={{ boxShadow: "none" }} placeholder="Search exercises" />
//           </HStack>
//           <Select value={muscleGroupId} onChange={(e) => setMuscleGroupId(e.target.value)} bg="white" borderRadius="xl" maxW={{ base: "100%", md: "280px" }}>
//             <option value="">All muscle groups</option>
//             {muscles.map((muscle) => <option key={muscle.id} value={muscle.id}>{muscle.name}</option>)}
//           </Select>
//           <Button borderRadius="xl" onClick={load}>Search</Button>
//         </Flex>

//         {loading ? (
//           <SimpleGrid mt={8} columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
//             {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="250px" borderRadius="2xl" />)}
//           </SimpleGrid>
//         ) : (
//           <SimpleGrid mt={8} columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
//             {filtered.map((exercise) => (
//               <Box key={exercise.id} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" overflow="hidden">
//                 {exercise.image_url ? <Image src={exercise.image_url} alt={exercise.name} w="100%" h="190px" objectFit="cover" /> : <Box h="190px" bg="gray.50" />}
//                 <Box p={5}>
//                   <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>{exercise.primary_muscle_group || "Exercise"}</Badge>
//                   <Heading size="sm" mt={3}>{exercise.name}</Heading>
//                   <Text fontSize="sm" color="gray.500" mt={2} noOfLines={3}>{exercise.description || exercise.instructions || "Movement details available in the exercise profile."}</Text>
//                   <VStack align="stretch" mt={4} spacing={2}>
//                     <Text fontSize="xs" color="gray.400">Tracking: {exercise.tracking_type || "—"}</Text>
//                     <Text fontSize="xs" color="gray.400">Difficulty: {exercise.difficulty || "—"}</Text>
//                   </VStack>
//                 </Box>
//               </Box>
//             ))}
//           </SimpleGrid>
//         )}

//         {!loading && !filtered.length ? (
//           <Box mt={8} bg="white" borderRadius="2xl" p={8} textAlign="center">
//             <Text color="gray.500">No exercises matched your search.</Text>
//           </Box>
//         ) : null}
//       </Box>
//     </Box>
//   );
// };

// export default WorkoutLibraryPage;


// Version 2

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Skeleton,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiHeart,
  FiLayers,
  FiSearch,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ExerciseDetailSheet from "../../components/Workout/ExerciseDetailSheet";
import {
  getExerciseLibrary,
  getWorkoutMuscleGroups,
} from "../../services/userWorkout.service";

type MuscleGroup = {
  id: number;
  name: string;
};

type ExerciseLibraryItem = {
  id: number;
  name: string;
  description?: string | null;
  instructions?: string | null;
  image_url?: string | null;
  video_url?: string | null;
  primary_muscle_group?: string | null;
  tracking_type?: string | null;
  difficulty?: string | null;
  environment?: string | null;
  movement_pattern?: string | null;
  rest_seconds?: number | null;
  met_value?: number | null;
};

const categoryIcon = (name: string) => {
  const value = name.toLowerCase();
  if (value.includes("chest")) return FiHeart;
  if (value.includes("shoulder")) return FiTarget;
  if (value.includes("back")) return FiLayers;
  if (value.includes("bicep")) return FiTrendingUp;
  if (value.includes("tricep")) return FiZap;
  if (value.includes("core")) return FiShield;
  return FiActivity;
};

const pretty = (value?: string | null) => {
  if (!value) return "—";
  return String(value)
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const WorkoutLibraryPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const exerciseSheet = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [muscleGroupId, setMuscleGroupId] = useState<number | "">("");
  const [muscles, setMuscles] = useState<MuscleGroup[]>([]);
  const [exercises, setExercises] = useState<ExerciseLibraryItem[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseLibraryItem | null>(null);

  const requestedMuscle = searchParams.get("muscle") || "";

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [muscleData, exerciseData] = await Promise.all([
        getWorkoutMuscleGroups(),
        getExerciseLibrary({
          search: search || undefined,
          muscleGroupId: muscleGroupId || undefined,
        }),
      ]);

      setMuscles(Array.isArray(muscleData) ? muscleData : []);
      setExercises(Array.isArray(exerciseData) ? exerciseData : []);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Unable to load exercise library",
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
  }, [muscleGroupId, search, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!requestedMuscle || !muscles.length) return;

    const matched = muscles.find(
      (item) => item.name.toLowerCase() === requestedMuscle.toLowerCase()
    );

    if (matched && Number(matched.id) !== Number(muscleGroupId)) {
      setMuscleGroupId(Number(matched.id));
    }
  }, [muscles, muscleGroupId, requestedMuscle]);

  const filteredExercises = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return exercises;
    return exercises.filter((item) =>
      `${item.name} ${item.description || ""}`.toLowerCase().includes(query)
    );
  }, [exercises, search]);

  const selectedMuscleName =
    muscles.find((item) => Number(item.id) === Number(muscleGroupId))?.name || "All exercises";

  return (
    <Box minH="100vh" bg="#f7f8fa" px={{ base: 4, md: 7, lg: 9 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1240px" mx="auto">
        <Button
          variant="ghost"
          leftIcon={<FiArrowLeft />}
          color="gray.600"
          borderRadius="xl"
          onClick={() => navigate("/workouts")}
          mb={6}
        >
          My Workouts
        </Button>

        <Box
          bg="gray.900"
          color="white"
          borderRadius="3xl"
          p={{ base: 6, md: 9 }}
          position="relative"
          overflow="hidden"
          boxShadow="0 24px 80px rgba(15,23,42,0.14)"
        >
          <Box
            position="absolute"
            w="380px"
            h="380px"
            borderRadius="full"
            bg="blue.500"
            opacity={0.16}
            filter="blur(90px)"
            right="-140px"
            top="-180px"
          />

          <Box position="relative" zIndex={1}>
            <Text fontSize="10px" fontWeight="800" letterSpacing="0.13em" color="whiteAlpha.550">
              NEKA MOVEMENT LIBRARY
            </Text>
            <Heading mt={3} fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-0.055em">
              Learn the movement.
            </Heading>
            <Text mt={3} color="whiteAlpha.700" maxW="720px" fontSize="sm" lineHeight="1.8">
              Explore exercises by muscle group, understand how they are performed, and build familiarity before your next session.
            </Text>

            <HStack mt={7} bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.100" borderRadius="xl" px={4} py={2} maxW="720px">
              <Icon as={FiSearch} color="whiteAlpha.500" />
              <Input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") setSearch(searchInput.trim());
                }}
                placeholder="Search an exercise…"
                border="none"
                color="white"
                _placeholder={{ color: "whiteAlpha.450" }}
                _focus={{ boxShadow: "none" }}
              />
              <Button
                size="sm"
                colorScheme="blue"
                borderRadius="lg"
                onClick={() => setSearch(searchInput.trim())}
              >
                Search
              </Button>
            </HStack>
          </Box>
        </Box>

        <Box mt={9}>
          <Flex align="center" justify="space-between" gap={4} mb={5}>
            <Box>
              <Text fontSize="10px" fontWeight="800" letterSpacing="0.12em" color="gray.400">
                TRAIN BY FOCUS
              </Text>
              <Heading mt={1.5} size="md" color="gray.900">
                {selectedMuscleName}
              </Heading>
            </Box>
            <Text fontSize="xs" color="gray.400">
              {filteredExercises.length} {filteredExercises.length === 1 ? "exercise" : "exercises"}
            </Text>
          </Flex>

          <Flex gap={2} overflowX="auto" pb={2} sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
            <Button
              flexShrink={0}
              borderRadius="full"
              size="sm"
              bg={muscleGroupId === "" ? "gray.900" : "white"}
              color={muscleGroupId === "" ? "white" : "gray.600"}
              border="1px solid"
              borderColor={muscleGroupId === "" ? "gray.900" : "gray.200"}
              onClick={() => setMuscleGroupId("")}
            >
              All
            </Button>

            {muscles.map((muscle) => {
              const active = Number(muscleGroupId) === Number(muscle.id);
              const MuscleIcon = categoryIcon(muscle.name);

              return (
                <Button
                  key={muscle.id}
                  flexShrink={0}
                  leftIcon={<Icon as={MuscleIcon} />}
                  borderRadius="full"
                  size="sm"
                  bg={active ? "gray.900" : "white"}
                  color={active ? "white" : "gray.600"}
                  border="1px solid"
                  borderColor={active ? "gray.900" : "gray.200"}
                  onClick={() => setMuscleGroupId(Number(muscle.id))}
                >
                  {muscle.name}
                </Button>
              );
            })}
          </Flex>
        </Box>

        {loading ? (
          <SimpleGrid mt={8} columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Box key={index} bg="white" borderRadius="2xl" overflow="hidden">
                <Skeleton h="220px" />
                <Box p={5}>
                  <Skeleton h="18px" w="55%" />
                  <Skeleton mt={3} h="14px" w="85%" />
                  <Skeleton mt={2} h="14px" w="70%" />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : filteredExercises.length ? (
          <SimpleGrid mt={8} columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
            {filteredExercises.map((exercise) => (
              <Box
                key={exercise.id}
                as="button"
                type="button"
                textAlign="left"
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="2xl"
                overflow="hidden"
                cursor="pointer"
                transition="all 180ms ease"
                _hover={{
                  transform: "translateY(-3px)",
                  borderColor: "blue.100",
                  boxShadow: "0 18px 45px rgba(15,23,42,0.07)",
                }}
                onClick={() => {
                  setSelectedExercise(exercise as any);
                  exerciseSheet.onOpen();
                }}
              >
                {exercise.image_url ? (
                  <Image
                    src={exercise.image_url}
                    alt={exercise.name}
                    w="100%"
                    h="220px"
                    objectFit="cover"
                  />
                ) : (
                  <Flex
                    h="220px"
                    align="center"
                    justify="center"
                    bg="linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)"
                  >
                    <Icon as={categoryIcon(exercise.primary_muscle_group || "Exercise")} boxSize={10} color="blue.200" />
                  </Flex>
                )}

                <Box p={5}>
                  <HStack spacing={2} flexWrap="wrap">
                    {exercise.primary_muscle_group ? (
                      <Badge bg="gray.100" color="gray.600" borderRadius="full" px={3} py={1.5} fontSize="9px">
                        {exercise.primary_muscle_group}
                      </Badge>
                    ) : null}
                    {exercise.difficulty ? (
                      <Badge bg="blue.50" color="blue.600" borderRadius="full" px={3} py={1.5} fontSize="9px">
                        {pretty(exercise.difficulty)}
                      </Badge>
                    ) : null}
                  </HStack>

                  <Flex mt={3} justify="space-between" gap={4} align="center">
                    <Text fontWeight="750" color="gray.900" fontSize="md" noOfLines={2}>
                      {exercise.name}
                    </Text>
                    <Icon as={FiArrowRight} color="gray.300" flexShrink={0} />
                  </Flex>

                  <Text mt={2} color="gray.500" fontSize="sm" lineHeight="1.7" noOfLines={3}>
                    {exercise.description || exercise.instructions || "Movement details available in the exercise profile."}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box mt={8} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={10} textAlign="center">
            <Flex mx="auto" w="54px" h="54px" align="center" justify="center" borderRadius="full" bg="gray.50">
              <Icon as={FiSearch} color="gray.400" boxSize={5} />
            </Flex>
            <Heading mt={5} size="sm" color="gray.900">
              No exercises found
            </Heading>
            <Text mt={2} fontSize="sm" color="gray.500">
              Try another search or training focus.
            </Text>
          </Box>
        )}
      </Box>

      <ExerciseDetailSheet
        exercise={selectedExercise as any}
        isOpen={exerciseSheet.isOpen}
        onClose={exerciseSheet.onClose}
      />
    </Box>
  );
};

export default WorkoutLibraryPage;

