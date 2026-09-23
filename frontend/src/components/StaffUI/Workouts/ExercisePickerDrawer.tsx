// src/components/StaffUI/Workouts/ExercisePickerDrawer.tsx

import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Tag,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiCheck,
  FiFilter,
  FiPlus,
  FiSearch,
  FiX,
} from "react-icons/fi";

import {
  useEffect,
  useState,
} from "react";

import {
  getWorkoutExercises,
  getWorkoutMuscleGroups,
} from "../../../services/workout.service";

import type {
  WorkoutEnvironment,
  WorkoutExercise,
  WorkoutMuscleGroup,
} from "../../../types/workout.types";


/* =========================================================
   PROPS
========================================================= */

interface ExercisePickerDrawerProps {
  isOpen: boolean;

  onClose: () => void;

  selectedExerciseIds: number[];

  preferredEnvironment?: WorkoutEnvironment;

  onSelectExercise: (
    exercise: WorkoutExercise
  ) => void;
}


/* =========================================================
   HELPERS
========================================================= */

const formatTrackingType = (
  trackingType: string
) => {

  return trackingType
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );

};


const formatEnvironment = (
  environment?: string | null
) => {

  if (!environment) {
    return "";
  }

  if (environment === "BOTH") {
    return "Home + Gym";
  }

  if (environment === "HOME") {
    return "Home";
  }

  return "Gym";
};


/* =========================================================
   COMPONENT
========================================================= */

const ExercisePickerDrawer = ({
  isOpen,
  onClose,
  selectedExerciseIds,
  preferredEnvironment,
  onSelectExercise,
}: ExercisePickerDrawerProps) => {

  const toast = useToast();


  /* -------------------------------------------------------
     DATA
  ------------------------------------------------------- */

  const [
    exercises,
    setExercises,
  ] = useState<WorkoutExercise[]>(
    []
  );

  const [
    muscleGroups,
    setMuscleGroups,
  ] = useState<WorkoutMuscleGroup[]>(
    []
  );


  /* -------------------------------------------------------
     FILTERS
  ------------------------------------------------------- */

  const [
    searchInput,
    setSearchInput,
  ] = useState("");

  const [
    appliedSearch,
    setAppliedSearch,
  ] = useState("");

  const [
    muscleGroupId,
    setMuscleGroupId,
  ] = useState("");

  const [
    environment,
    setEnvironment,
  ] = useState("");

  const [
    trackingType,
    setTrackingType,
  ] = useState("");


  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    loadingGroups,
    setLoadingGroups,
  ] = useState(false);


  /* =======================================================
     LOAD MUSCLE GROUPS
  ======================================================= */

  useEffect(() => {

    if (!isOpen) {
      return;
    }


    const loadMuscleGroups =
      async () => {

        try {

          setLoadingGroups(
            true
          );


          const groups =
            await getWorkoutMuscleGroups();


          setMuscleGroups(
            Array.isArray(groups)
              ? groups
              : []
          );

        } catch (error) {

          console.error(
            "Failed to load workout muscle groups:",
            error
          );

          toast({
            title:
              "Unable to load muscle groups",
            description:
              "Please try again.",
            status: "error",
            duration: 2500,
            isClosable: true,
          });

        } finally {

          setLoadingGroups(
            false
          );

        }

      };


    loadMuscleGroups();

  }, [
    isOpen,
    toast,
  ]);


  /* =======================================================
     LOAD EXERCISES
  ======================================================= */

  useEffect(() => {

    if (!isOpen) {
      return;
    }


    const loadExercises =
      async () => {

        try {

          setLoading(
            true
          );


          const result =
            await getWorkoutExercises({
              search:
                appliedSearch || undefined,

              muscleGroupId:
                muscleGroupId
                  ? Number(
                      muscleGroupId
                    )
                  : undefined,

              environment:
                environment
                  ? (
                      environment as WorkoutEnvironment
                    )
                  : undefined,

              trackingType:
                trackingType
                  ? trackingType as any
                  : undefined,

              active:
                true,
            });


          setExercises(
            Array.isArray(result)
              ? result
              : []
          );

        } catch (error: any) {

          console.error(
            "Failed to load exercises:",
            error
          );

          setExercises(
            []
          );


          toast({
            title:
              "Unable to load exercises",
            description:
              error?.response?.data?.error ??
              error?.response?.data?.message ??
              error?.message ??
              "Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });

        } finally {

          setLoading(
            false
          );

        }

      };


    loadExercises();

  }, [
    isOpen,
    appliedSearch,
    muscleGroupId,
    environment,
    trackingType,
    toast,
  ]);


  /* =======================================================
     RESET WHEN OPENING
  ======================================================= */

  useEffect(() => {

    if (!isOpen) {
      return;
    }


    setSearchInput("");

    setAppliedSearch("");

    setMuscleGroupId("");

    setEnvironment("");

    setTrackingType("");

  }, [
    isOpen,
  ]);


  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = () => {

    setAppliedSearch(
      searchInput.trim()
    );

  };


  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (
      event.key === "Enter"
    ) {
      handleSearch();
    }

  };


  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {

    setSearchInput("");

    setAppliedSearch("");

    setMuscleGroupId("");

    setEnvironment("");

    setTrackingType("");

  };


  /* =======================================================
     ADD
  ======================================================= */

  const handleAdd = (
    exercise: WorkoutExercise
  ) => {

    if (
      selectedExerciseIds.includes(
        exercise.id
      )
    ) {

      toast({
        title:
          "Exercise already added",
        description:
          `${exercise.name} is already in this workout.`,
        status: "info",
        duration: 1800,
        isClosable: true,
      });

      return;

    }


    onSelectExercise(
      exercise
    );

  };


  /* =======================================================
     RENDER SKELETON
  ======================================================= */

  const renderSkeletons = () => {

    return (
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        spacing={4}
      >

        {Array
          .from({ length: 6 })
          .map(
            (_, index) => (

              <Box
                key={index}
                border="1px solid"
                borderColor="gray.100"
                borderRadius="2xl"
                overflow="hidden"
                bg="white"
              >

                <Skeleton
                  height="150px"
                />

                <Box p={4}>

                  <Skeleton
                    height="18px"
                    width="70%"
                    mb={3}
                  />

                  <Skeleton
                    height="12px"
                    width="45%"
                    mb={4}
                  />

                  <Skeleton
                    height="34px"
                    borderRadius="lg"
                  />

                </Box>

              </Box>

            )
          )}

      </SimpleGrid>
    );

  };


  /* =======================================================
     EXERCISE CARD
  ======================================================= */

  const renderExerciseCard = (
    exercise: WorkoutExercise
  ) => {

    const alreadySelected =
      selectedExerciseIds.includes(
        exercise.id
      );


    return (
      <Box
        key={exercise.id}
        border="1px solid"
        borderColor={
          alreadySelected
            ? "blue.100"
            : "gray.100"
        }
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        transition="all 0.2s ease"
        opacity={
          alreadySelected
            ? 0.72
            : 1
        }
        _hover={{
          borderColor:
            alreadySelected
              ? "blue.100"
              : "blue.200",

          boxShadow:
            alreadySelected
              ? "none"
              : "0 10px 30px rgba(15, 23, 42, 0.07)",

          transform:
            alreadySelected
              ? undefined
              : "translateY(-1px)",
        }}
      >

        {/* -----------------------------------------------
            IMAGE
        ------------------------------------------------ */}

        <Box
          position="relative"
          height="145px"
          bg="gray.50"
        >

          {exercise.image_url ? (

            <Image
              src={
                exercise.image_url
              }
              alt={
                exercise.name
              }
              width="100%"
              height="100%"
              objectFit="cover"
            />

          ) : (

            <Flex
              width="100%"
              height="100%"
              align="center"
              justify="center"
              color="blue.300"
            >
              <Icon
                as={FiActivity}
                boxSize={10}
              />
            </Flex>

          )}


          <Box
            position="absolute"
            top={3}
            left={3}
          >

            <Badge
              colorScheme="blue"
              borderRadius="full"
              px={2.5}
              py={1}
              bg="white"
              boxShadow="sm"
              fontSize="10px"
            >
              {
                formatTrackingType(
                  exercise.tracking_type
                )
              }
            </Badge>

          </Box>


          {alreadySelected && (
            <Flex
              position="absolute"
              top={3}
              right={3}
              w="30px"
              h="30px"
              align="center"
              justify="center"
              borderRadius="full"
              bg="blue.500"
              color="white"
              boxShadow="sm"
            >
              <Icon
                as={FiCheck}
                boxSize={4}
              />
            </Flex>
          )}

        </Box>


        {/* -----------------------------------------------
            CONTENT
        ------------------------------------------------ */}

        <Box
          p={4}
        >

          <Text
            fontWeight="700"
            fontSize="sm"
            color="gray.800"
            noOfLines={2}
            minH="40px"
          >
            {exercise.name}
          </Text>


          <HStack
            mt={2}
            spacing={2}
            flexWrap="wrap"
          >

            {exercise.primary_muscle_group && (
              <Tag
                size="sm"
                borderRadius="full"
                variant="subtle"
                colorScheme="gray"
              >
                {
                  exercise
                    .primary_muscle_group
                }
              </Tag>
            )}


            {exercise.environment && (
              <Tag
                size="sm"
                borderRadius="full"
                variant="subtle"
                colorScheme="blue"
              >
                {
                  formatEnvironment(
                    exercise.environment
                  )
                }
              </Tag>
            )}

          </HStack>


          {exercise.difficulty && (
            <Text
              mt={3}
              fontSize="xs"
              color="gray.400"
            >
              Difficulty:{" "}
              <Text
                as="span"
                fontWeight="600"
                color="gray.500"
              >
                {
                  exercise.difficulty
                }
              </Text>
            </Text>
          )}


          <Button
            mt={4}
            width="100%"
            size="sm"
            borderRadius="lg"
            colorScheme={
              alreadySelected
                ? "gray"
                : "blue"
            }
            variant={
              alreadySelected
                ? "subtle"
                : "solid"
            }
            leftIcon={
              alreadySelected
                ? <FiCheck />
                : <FiPlus />
            }
            isDisabled={
              alreadySelected
            }
            onClick={() =>
              handleAdd(
                exercise
              )
            }
          >
            {alreadySelected
              ? "Added"
              : "Add Exercise"}
          </Button>

        </Box>

      </Box>
    );

  };


  /* =======================================================
     DRAWER
  ======================================================= */

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={{
        base: "full",
        md: "xl",
      }}
    >

      <DrawerOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(4px)"
      />


      <DrawerContent
        bg="gray.50"
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <DrawerHeader
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.100"
          px={{
            base: 5,
            md: 7,
          }}
          py={5}
        >

          <DrawerCloseButton
            top={5}
            right={5}
            borderRadius="lg"
          />


          <Box
            pr={12}
          >

            <HStack
              spacing={3}
              mb={2}
            >

              <Flex
                w="40px"
                h="40px"
                align="center"
                justify="center"
                borderRadius="xl"
                bg="blue.50"
                color="blue.500"
              >
                <Icon
                  as={FiActivity}
                  boxSize={5}
                />
              </Flex>


              <Box>

                <Text
                  fontSize="xs"
                  fontWeight="700"
                  letterSpacing="0.07em"
                  color="blue.500"
                  textTransform="uppercase"
                >
                  Exercise Library
                </Text>

                <Text
                  fontSize="lg"
                  fontWeight="700"
                  color="gray.800"
                >
                  Add an exercise
                </Text>

              </Box>

            </HStack>


            <Text
              fontSize="sm"
              color="gray.500"
              lineHeight="1.6"
            >
              Choose an exercise from the NEKA movement
              library and add it to this workout.
            </Text>


            {preferredEnvironment && (
              <HStack
                mt={4}
                spacing={2}
              >

                <Text
                  fontSize="xs"
                  color="gray.400"
                >
                  Workout environment
                </Text>

                <Badge
                  colorScheme="blue"
                  borderRadius="full"
                  px={2.5}
                >
                  {
                    formatEnvironment(
                      preferredEnvironment
                    )
                  }
                </Badge>

              </HStack>
            )}

          </Box>

        </DrawerHeader>


        <DrawerBody
          px={{
            base: 4,
            md: 7,
          }}
          py={5}
        >

          {/* =================================================
              FILTER PANEL
          ================================================== */}

          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={5}
            mb={5}
          >

            <HStack
              justify="space-between"
              mb={5}
            >

              <HStack
                spacing={2}
              >

                <Icon
                  as={FiFilter}
                  color="blue.500"
                />

                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.800"
                >
                  Find an exercise
                </Text>

              </HStack>


              <Button
                size="xs"
                variant="ghost"
                colorScheme="gray"
                leftIcon={
                  <FiX />
                }
                onClick={
                  clearFilters
                }
              >
                Clear
              </Button>

            </HStack>


            {/* SEARCH */}

            <FormControl
              mb={4}
            >

              <InputGroup>

                <InputLeftElement
                  pointerEvents="none"
                >

                  <Icon
                    as={FiSearch}
                    color="gray.400"
                  />

                </InputLeftElement>


                <Input
                  value={
                    searchInput
                  }
                  onChange={(
                    event
                  ) =>
                    setSearchInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleSearchKeyDown
                  }
                  placeholder="Search exercises..."
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.100"
                  pr="90px"
                />


                <Box
                  position="absolute"
                  right="4px"
                  top="4px"
                  bottom="4px"
                >

                  <Button
                    size="sm"
                    h="calc(100% - 0px)"
                    borderRadius="lg"
                    colorScheme="blue"
                    onClick={
                      handleSearch
                    }
                  >
                    Search
                  </Button>

                </Box>

              </InputGroup>

            </FormControl>


            {/* FILTER GRID */}

            <SimpleGrid
              columns={{
                base: 1,
                sm: 3,
              }}
              spacing={3}
            >

              <FormControl>

                <FormLabel
                  fontSize="xs"
                  color="gray.500"
                  mb={1.5}
                >
                  Muscle group
                </FormLabel>

                <Select
                  value={
                    muscleGroupId
                  }
                  onChange={(
                    event
                  ) =>
                    setMuscleGroupId(
                      event.target.value
                    )
                  }
                  borderRadius="lg"
                  bg="gray.50"
                  borderColor="gray.100"
                  size="sm"
                  isDisabled={
                    loadingGroups
                  }
                >

                  <option value="">
                    All muscles
                  </option>

                  {muscleGroups.map(
                    (group) => (

                      <option
                        key={group.id}
                        value={group.id}
                      >
                        {group.name}
                      </option>

                    )
                  )}

                </Select>

              </FormControl>


              <FormControl>

                <FormLabel
                  fontSize="xs"
                  color="gray.500"
                  mb={1.5}
                >
                  Environment
                </FormLabel>

                <Select
                  value={
                    environment
                  }
                  onChange={(
                    event
                  ) =>
                    setEnvironment(
                      event.target.value
                    )
                  }
                  borderRadius="lg"
                  bg="gray.50"
                  borderColor="gray.100"
                  size="sm"
                >

                  <option value="">
                    Any environment
                  </option>

                  <option value="GYM">
                    Gym
                  </option>

                  <option value="HOME">
                    Home
                  </option>

                  <option value="BOTH">
                    Home + Gym
                  </option>

                </Select>

              </FormControl>


              <FormControl>

                <FormLabel
                  fontSize="xs"
                  color="gray.500"
                  mb={1.5}
                >
                  Tracking
                </FormLabel>

                <Select
                  value={
                    trackingType
                  }
                  onChange={(
                    event
                  ) =>
                    setTrackingType(
                      event.target.value
                    )
                  }
                  borderRadius="lg"
                  bg="gray.50"
                  borderColor="gray.100"
                  size="sm"
                >

                  <option value="">
                    Any tracking
                  </option>

                  <option value="REPS_WEIGHT">
                    Reps + Weight
                  </option>

                  <option value="REPS_ONLY">
                    Reps Only
                  </option>

                  <option value="DURATION">
                    Duration
                  </option>

                  <option value="DISTANCE">
                    Distance
                  </option>

                  <option value="REPS_DURATION">
                    Reps + Duration
                  </option>

                </Select>

              </FormControl>

            </SimpleGrid>

          </Box>


          {/* =================================================
              RESULT HEADER
          ================================================== */}

          <Flex
            align="center"
            justify="space-between"
            mb={4}
          >

            <Box>

              <Text
                fontSize="sm"
                fontWeight="700"
                color="gray.800"
              >
                Exercises
              </Text>

              <Text
                mt={0.5}
                fontSize="xs"
                color="gray.400"
              >
                {loading
                  ? "Finding exercises..."
                  : `${exercises.length} exercise${
                      exercises.length === 1
                        ? ""
                        : "s"
                    } found`}
              </Text>

            </Box>


            {selectedExerciseIds.length >
              0 && (
              <Badge
                colorScheme="blue"
                borderRadius="full"
                px={3}
                py={1.5}
              >
                {
                  selectedExerciseIds.length
                }{" "}
                already added
              </Badge>
            )}

          </Flex>


          <Divider
            mb={5}
          />


          {/* =================================================
              RESULTS
          ================================================== */}

          {loading ? (

            renderSkeletons()

          ) : exercises.length === 0 ? (

            <Box
              bg="white"
              border="1px dashed"
              borderColor="blue.200"
              borderRadius="2xl"
              py={14}
              px={6}
              textAlign="center"
            >

              <Flex
                mx="auto"
                mb={5}
                w="58px"
                h="58px"
                align="center"
                justify="center"
                borderRadius="2xl"
                bg="blue.50"
                color="blue.500"
              >

                <Icon
                  as={FiSearch}
                  boxSize={6}
                />

              </Flex>


              <Text
                fontSize="md"
                fontWeight="700"
                color="gray.800"
              >
                No exercises found
              </Text>


              <Text
                mt={2}
                maxW="420px"
                mx="auto"
                fontSize="sm"
                color="gray.500"
                lineHeight="1.7"
              >
                Try a different search or clear one of
                the filters to explore more exercises.
              </Text>


              <Button
                mt={5}
                size="sm"
                variant="outline"
                borderRadius="lg"
                onClick={
                  clearFilters
                }
              >
                Clear filters
              </Button>

            </Box>

          ) : (

            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
              }}
              spacing={4}
              pb={8}
            >

              {exercises.map(
                renderExerciseCard
              )}

            </SimpleGrid>

          )}

        </DrawerBody>

      </DrawerContent>

    </Drawer>
  );
};


export default ExercisePickerDrawer;