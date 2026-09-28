import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getExerciseLibrary, getWorkoutMuscleGroups } from "../../services/userWorkout.service";

const WorkoutLibraryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [muscleGroupId, setMuscleGroupId] = useState("");
  const [muscles, setMuscles] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const [muscleData, exerciseData] = await Promise.all([
        getWorkoutMuscleGroups(),
        getExerciseLibrary({ search: search || undefined, muscleGroupId: muscleGroupId || undefined }),
      ]);
      setMuscles(muscleData);
      setExercises(exerciseData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // Refresh whenever filters change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muscleGroupId]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return exercises;
    return exercises.filter((item) => String(item.name || "").toLowerCase().includes(query));
  }, [exercises, search]);

  return (
    <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 8 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1250px" mx="auto">
        <Button variant="ghost" leftIcon={<FiArrowLeft />} onClick={() => navigate("/workouts")} mb={5}>
          My Workouts
        </Button>
        <Heading size={{ base: "lg", md: "xl" }}>Exercise Library</Heading>
        <Text mt={2} color="gray.500" maxW="720px" lineHeight="1.7">
          Browse exercises, learn the movement, and build familiarity with the NEKA exercise library. This is for learning — not for replacing an assigned workout.
        </Text>

        <Flex mt={7} gap={3} direction={{ base: "column", md: "row" }}>
          <HStack flex="1" bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" px={3}>
            <FiSearch color="#A0AEC0" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") load(); }} border="none" _focus={{ boxShadow: "none" }} placeholder="Search exercises" />
          </HStack>
          <Select value={muscleGroupId} onChange={(e) => setMuscleGroupId(e.target.value)} bg="white" borderRadius="xl" maxW={{ base: "100%", md: "280px" }}>
            <option value="">All muscle groups</option>
            {muscles.map((muscle) => <option key={muscle.id} value={muscle.id}>{muscle.name}</option>)}
          </Select>
          <Button borderRadius="xl" onClick={load}>Search</Button>
        </Flex>

        {loading ? (
          <SimpleGrid mt={8} columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
            {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} height="250px" borderRadius="2xl" />)}
          </SimpleGrid>
        ) : (
          <SimpleGrid mt={8} columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
            {filtered.map((exercise) => (
              <Box key={exercise.id} bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" overflow="hidden">
                {exercise.image_url ? <Image src={exercise.image_url} alt={exercise.name} w="100%" h="190px" objectFit="cover" /> : <Box h="190px" bg="gray.50" />}
                <Box p={5}>
                  <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>{exercise.primary_muscle_group || "Exercise"}</Badge>
                  <Heading size="sm" mt={3}>{exercise.name}</Heading>
                  <Text fontSize="sm" color="gray.500" mt={2} noOfLines={3}>{exercise.description || exercise.instructions || "Movement details available in the exercise profile."}</Text>
                  <VStack align="stretch" mt={4} spacing={2}>
                    <Text fontSize="xs" color="gray.400">Tracking: {exercise.tracking_type || "—"}</Text>
                    <Text fontSize="xs" color="gray.400">Difficulty: {exercise.difficulty || "—"}</Text>
                  </VStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {!loading && !filtered.length ? (
          <Box mt={8} bg="white" borderRadius="2xl" p={8} textAlign="center">
            <Text color="gray.500">No exercises matched your search.</Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default WorkoutLibraryPage;
