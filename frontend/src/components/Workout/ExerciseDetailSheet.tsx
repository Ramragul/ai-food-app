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
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FiActivity,
  FiClock,
  FiExternalLink,
  FiHome,
  FiLayers,
  FiPlay,
  FiTarget,
} from "react-icons/fi";

import type { ClientWorkoutExercise } from "../../types/workoutExecution.types";

type ExerciseDetail = ClientWorkoutExercise & {
  exercise_description?: string | null;
  movement_pattern?: string | null;
  exercise_environment?: string | null;
  met_value?: number | null;
};

type ExerciseDetailSheetProps = {
  exercise: ExerciseDetail | null;
  isOpen: boolean;
  onClose: () => void;
  targetText?: string;
};

const pretty = (value?: string | null) => {
  if (!value) return null;

  return String(value)
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const ExerciseDetailSheet = ({
  exercise,
  isOpen,
  onClose,
  targetText,
}: ExerciseDetailSheetProps) => {
  const drawerSize = useBreakpointValue({ base: "full", md: "md" }) || "md";

  if (!exercise) return null;

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={drawerSize}
    >
      <DrawerOverlay bg="blackAlpha.500" backdropFilter="blur(5px)" />
      <DrawerContent
        borderTopLeftRadius={{ base: 0, md: "28px" }}
        borderBottomLeftRadius={{ base: 0, md: "28px" }}
        overflow="hidden"
      >
        <DrawerCloseButton
          zIndex={3}
          top={4}
          right={4}
          w="40px"
          h="40px"
          borderRadius="full"
          bg="whiteAlpha.900"
          boxShadow="0 8px 24px rgba(15,23,42,0.10)"
        />

        <DrawerHeader
          px={{ base: 5, md: 7 }}
          pt={6}
          pb={4}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Text
            fontSize="10px"
            fontWeight="800"
            letterSpacing="0.12em"
            color="blue.500"
          >
            EXERCISE PROFILE
          </Text>
        </DrawerHeader>

        <DrawerBody p={0}>
          <Box>
            {exercise.image_url ? (
              <Image
                src={exercise.image_url}
                alt={exercise.exercise_name}
                w="100%"
                h={{ base: "250px", md: "280px" }}
                objectFit="cover"
              />
            ) : (
              <Flex
                h={{ base: "220px", md: "250px" }}
                bg="linear-gradient(135deg, #eff6ff 0%, #f8fafc 55%, #eef2ff 100%)"
                align="center"
                justify="center"
              >
                <Icon as={FiActivity} boxSize={12} color="blue.200" />
              </Flex>
            )}

            <VStack
              align="stretch"
              spacing={6}
              px={{ base: 5, md: 7 }}
              py={7}
            >
              <Box>
                <HStack spacing={2} flexWrap="wrap" mb={3}>
                  {exercise.primary_muscle_group ? (
                    <Badge
                      bg="gray.100"
                      color="gray.700"
                      borderRadius="full"
                      px={3}
                      py={1.5}
                      fontSize="10px"
                    >
                      {exercise.primary_muscle_group}
                    </Badge>
                  ) : null}

                  {exercise.difficulty ? (
                    <Badge
                      bg="blue.50"
                      color="blue.600"
                      borderRadius="full"
                      px={3}
                      py={1.5}
                      fontSize="10px"
                    >
                      {pretty(exercise.difficulty)}
                    </Badge>
                  ) : null}
                </HStack>

                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="800"
                  letterSpacing="-0.04em"
                  color="gray.900"
                  lineHeight="1.08"
                >
                  {exercise.exercise_name}
                </Text>

                {exercise.exercise_description ? (
                  <Text
                    mt={3}
                    color="gray.500"
                    fontSize="sm"
                    lineHeight="1.8"
                  >
                    {exercise.exercise_description}
                  </Text>
                ) : null}
              </Box>

              {targetText ? (
                <Box
                  bg="gray.900"
                  color="white"
                  borderRadius="2xl"
                  p={5}
                >
                  <Text
                    fontSize="10px"
                    fontWeight="800"
                    letterSpacing="0.10em"
                    color="whiteAlpha.600"
                  >
                    YOUR PLAN
                  </Text>
                  <Text mt={2} fontSize="lg" fontWeight="700">
                    {targetText}
                  </Text>
                </Box>
              ) : null}

              <SimpleGrid columns={2} spacing={3}>
                <Box
                  bg="gray.50"
                  borderRadius="xl"
                  p={4}
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <HStack spacing={2} color="gray.400">
                    <Icon as={FiTarget} />
                    <Text fontSize="xs">Tracking</Text>
                  </HStack>
                  <Text mt={2} fontSize="sm" fontWeight="700" color="gray.800">
                    {pretty(exercise.tracking_type) || "—"}
                  </Text>
                </Box>

                <Box
                  bg="gray.50"
                  borderRadius="xl"
                  p={4}
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <HStack spacing={2} color="gray.400">
                    <Icon as={FiLayers} />
                    <Text fontSize="xs">Movement</Text>
                  </HStack>
                  <Text mt={2} fontSize="sm" fontWeight="700" color="gray.800">
                    {pretty(exercise.movement_pattern) || "—"}
                  </Text>
                </Box>

                <Box
                  bg="gray.50"
                  borderRadius="xl"
                  p={4}
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <HStack spacing={2} color="gray.400">
                    <Icon as={FiHome} />
                    <Text fontSize="xs">Environment</Text>
                  </HStack>
                  <Text mt={2} fontSize="sm" fontWeight="700" color="gray.800">
                    {pretty(exercise.exercise_environment) || "—"}
                  </Text>
                </Box>

                <Box
                  bg="gray.50"
                  borderRadius="xl"
                  p={4}
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <HStack spacing={2} color="gray.400">
                    <Icon as={FiClock} />
                    <Text fontSize="xs">Rest</Text>
                  </HStack>
                  <Text mt={2} fontSize="sm" fontWeight="700" color="gray.800">
                    {exercise.rest_seconds ? `${exercise.rest_seconds}s` : "—"}
                  </Text>
                </Box>
              </SimpleGrid>

              {exercise.instructions ? (
                <Box>
                  <Text fontSize="xs" fontWeight="800" color="gray.400" letterSpacing="0.08em">
                    HOW TO PERFORM
                  </Text>
                  <Text mt={3} color="gray.600" fontSize="sm" lineHeight="1.9">
                    {exercise.instructions}
                  </Text>
                </Box>
              ) : null}

              {exercise.video_url ? (
                <Box>
                  <Divider mb={4} />
                  <Button
                    as="a"
                    href={exercise.video_url}
                    target="_blank"
                    rel="noreferrer"
                    w="100%"
                    colorScheme="blue"
                    borderRadius="xl"
                    leftIcon={<FiPlay />}
                    rightIcon={<FiExternalLink />}
                  >
                    Watch Movement Demo
                  </Button>
                </Box>
              ) : null}
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ExerciseDetailSheet;
