// src/components/StaffUI/Workouts/WorkoutTemplateCard.tsx

import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiClock,
  FiEdit3,
  FiMapPin,
  FiMoreHorizontal,
  FiTarget,
  FiTrash2,
  FiArrowRight,
} from "react-icons/fi";

import type {
  WorkoutTemplateListItem,
} from "../../../types/workout.types";


/* =========================================================
   PROPS
========================================================= */

interface WorkoutTemplateCardProps {
  template: WorkoutTemplateListItem;

  onOpen?: (
    template: WorkoutTemplateListItem
  ) => void;

  onEdit?: (
    template: WorkoutTemplateListItem
  ) => void;

  onArchive?: (
    template: WorkoutTemplateListItem
  ) => void;
}


/* =========================================================
   HELPERS
========================================================= */

const formatEnvironment = (
  environment?: string | null
) => {

  if (!environment) {
    return "Flexible";
  }

  if (environment === "BOTH") {
    return "Home + Gym";
  }

  if (environment === "HOME") {
    return "Home";
  }

  if (environment === "GYM") {
    return "Gym";
  }

  return environment;
};


const formatGoalType = (
  value?: string | null
) => {

  if (!value) {
    return null;
  }

  return value
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
};


/* =========================================================
   COMPONENT
========================================================= */

const WorkoutTemplateCard = ({
  template,
  onOpen,
  onEdit,
  onArchive,
}: WorkoutTemplateCardProps) => {

  const isActive =
    template.is_active !== false;

  const exerciseCount =
    Number(
      template.exercise_count ?? 0
    );

  const duration =
    Number(
      template.estimated_duration_minutes ??
        0
    );

  const goalLabel =
    template.training_goal_name ??
    formatGoalType(
      template.goal_type
    );


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)"
      transition="all 0.2s ease"
      _hover={{
        transform:
          "translateY(-2px)",
        boxShadow:
          "0 14px 36px rgba(15, 23, 42, 0.08)",
        borderColor:
          "blue.100",
      }}
    >

      {/* =================================================
          TOP ACCENT
      ================================================== */}

      <Box
        h="4px"
        bg={
          isActive
            ? "blue.400"
            : "gray.300"
        }
      />


      <Box
        p={6}
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <Flex
          align="flex-start"
          justify="space-between"
          gap={4}
        >

          <HStack
            align="flex-start"
            spacing={4}
            minW={0}
          >

            <Flex
              flexShrink={0}
              w="44px"
              h="44px"
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


            <Box
              minW={0}
            >

              <Text
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.07em"
                textTransform="uppercase"
                color="gray.400"
                mb={1}
              >
                Workout
              </Text>


              <Text
                fontSize="md"
                fontWeight="700"
                color="gray.800"
                lineHeight="1.35"
                noOfLines={2}
              >
                {template.name}
              </Text>

            </Box>

          </HStack>


          {/* ---------------------------------------------
              MENU
          ---------------------------------------------- */}

          <Menu
            placement="bottom-end"
          >

            <MenuButton
              as={IconButton}
              aria-label="Workout actions"
              icon={
                <FiMoreHorizontal />
              }
              variant="ghost"
              size="sm"
              borderRadius="lg"
              color="gray.500"
              _hover={{
                bg: "gray.50",
              }}
            />


            <MenuList
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="0 12px 32px rgba(15, 23, 42, 0.10)"
              py={2}
            >

              {onOpen && (
                <MenuItem
                  icon={
                    <FiArrowRight />
                  }
                  borderRadius="lg"
                  mx={1}
                  onClick={() =>
                    onOpen(
                      template
                    )
                  }
                >
                  Open workout
                </MenuItem>
              )}


              {onEdit && (
                <MenuItem
                  icon={
                    <FiEdit3 />
                  }
                  borderRadius="lg"
                  mx={1}
                  onClick={() =>
                    onEdit(
                      template
                    )
                  }
                >
                  Edit workout
                </MenuItem>
              )}


              {onArchive && (
                <MenuItem
                  icon={
                    <FiTrash2 />
                  }
                  color="red.500"
                  borderRadius="lg"
                  mx={1}
                  onClick={() =>
                    onArchive(
                      template
                    )
                  }
                >
                  Archive workout
                </MenuItem>
              )}

            </MenuList>

          </Menu>

        </Flex>


        {/* =================================================
            DESCRIPTION
        ================================================== */}

        <Text
          mt={5}
          fontSize="sm"
          color={
            template.description
              ? "gray.500"
              : "gray.400"
          }
          lineHeight="1.7"
          noOfLines={3}
          minH="72px"
        >
          {template.description ||
            "No description added for this workout yet."}
        </Text>


        {/* =================================================
            TAGS
        ================================================== */}

        <HStack
          mt={5}
          spacing={2}
          flexWrap="wrap"
        >

          <Badge
            colorScheme={
              isActive
                ? "green"
                : "gray"
            }
            borderRadius="full"
            px={2.5}
            py={1}
            fontSize="10px"
          >
            {isActive
              ? "ACTIVE"
              : "INACTIVE"}
          </Badge>


          {goalLabel && (
            <Tag
              size="sm"
              borderRadius="full"
              colorScheme="blue"
              variant="subtle"
            >
              <HStack spacing={1.5}>
                <Icon
                  as={FiTarget}
                  boxSize={3}
                />
                <Text>
                  {goalLabel}
                </Text>
              </HStack>
            </Tag>
          )}

        </HStack>


        {/* =================================================
            METRICS
        ================================================== */}

        <Box
          mt={6}
          bg="gray.50"
          borderRadius="xl"
          px={4}
          py={3}
        >

          <Flex
            justify="space-between"
            align="center"
            gap={3}
            wrap="wrap"
          >

            <Tooltip
              label="Exercises in this workout"
            >
              <HStack
                spacing={2}
                color="gray.500"
              >

                <Icon
                  as={FiActivity}
                  boxSize={4}
                  color="blue.400"
                />

                <Text
                  fontSize="xs"
                  fontWeight="600"
                >
                  {exerciseCount}{" "}
                  {exerciseCount === 1
                    ? "exercise"
                    : "exercises"}
                </Text>

              </HStack>
            </Tooltip>


            <Tooltip
              label="Estimated workout duration"
            >
              <HStack
                spacing={2}
                color="gray.500"
              >

                <Icon
                  as={FiClock}
                  boxSize={4}
                  color="blue.400"
                />

                <Text
                  fontSize="xs"
                  fontWeight="600"
                >
                  {duration > 0
                    ? `${duration} min`
                    : "Flexible"}
                </Text>

              </HStack>
            </Tooltip>


            <Tooltip
              label="Workout environment"
            >
              <HStack
                spacing={2}
                color="gray.500"
              >

                <Icon
                  as={FiMapPin}
                  boxSize={4}
                  color="blue.400"
                />

                <Text
                  fontSize="xs"
                  fontWeight="600"
                >
                  {formatEnvironment(
                    template.environment
                  )}
                </Text>

              </HStack>
            </Tooltip>

          </Flex>

        </Box>


        {/* =================================================
            FOOTER
        ================================================== */}

        <Divider
          mt={6}
          mb={4}
        />


        <Flex
          justify="space-between"
          align="center"
        >

          <Text
            fontSize="xs"
            color="gray.400"
          >
            {template.primary_muscle_group
              ? `Focus: ${template.primary_muscle_group}`
              : "Structured training session"}
          </Text>


          <Button
            size="sm"
            variant="ghost"
            colorScheme="blue"
            borderRadius="lg"
            rightIcon={
              <FiArrowRight />
            }
            onClick={() =>
              onOpen?.(
                template
              )
            }
            isDisabled={!onOpen}
          >
            Open
          </Button>

        </Flex>

      </Box>

    </Box>
  );
};


export default WorkoutTemplateCard;