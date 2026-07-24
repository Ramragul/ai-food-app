// Version 1

// import {
//   Box,
//   Button,
//   HStack,
//   Input,
//   SimpleGrid,
//   Text,
//   useToast,
//   VStack,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// import GoalModeSelector from "../../../Profile/GoalModeSelector";
// import CustomMacroSection from "../../../Profile/CustomMacroSection";

// import { GOALS, ACTIVITIES } from "../../../../constants/goal.constants";

// import {
//   assignClientGoal,
//   type AssignGoalRequest,
// } from "../../../../services/staff/client.service";

// import type { ClientDetails } from "../../../../services/staff/client.types";

// interface GoalAssignmentProps {
//   memberId: number;
//   client: ClientDetails;
//   onSuccess?: () => void;
// }

// interface GoalForm {
//   goal: string;
//   activity: string;
//   targetWeight: string;
//   duration: string;
//   target_calories: string;
//   protein_target: string;
//   carbs_target: string;
//   fats_target: string;
// }

// const GoalAssignment = ({
//   memberId,
//   client,
//   onSuccess,
// }: GoalAssignmentProps) => {
//   const toast = useToast();

//   const profile = client.fitness_profile;

//   const [saving, setSaving] = useState(false);

//   const [goalMode, setGoalMode] =
//     useState<"SMART" | "CUSTOM">("SMART");

//   const [form, setForm] = useState<GoalForm>({
//     goal: "",
//     activity: "",
//     targetWeight: "",
//     duration: "",
//     target_calories: "",
//     protein_target: "",
//     carbs_target: "",
//     fats_target: "",
//   });

//   useEffect(() => {
//     if (!profile) return;

//     setGoalMode(
//       (profile.goal_mode as "SMART" | "CUSTOM") || "SMART"
//     );

//     setForm({
//       goal:
//         profile.goal_type === "custom"
//           ? ""
//           : profile.goal_type || "",

//       activity: profile.activity_level || "",

//       targetWeight:
//         profile.target_weight?.toString() || "",

//       duration:
//         profile.duration_days?.toString() || "",

//       target_calories:
//         profile.target_calories?.toString() || "",

//       protein_target:
//         profile.protein_target?.toString() || "",

//       carbs_target:
//         profile.carbs_target?.toString() || "",

//       fats_target:
//         profile.fats_target?.toString() || "",
//     });
//   }, [profile]);

//   const updateField = (
//     field: keyof GoalForm,
//     value: string
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const validate = () => {
//     if (!form.targetWeight) {
//       toast({
//         title: "Target weight is required",
//         status: "warning",
//       });

//       return false;
//     }

//     if (!form.duration) {
//       toast({
//         title: "Duration is required",
//         status: "warning",
//       });

//       return false;
//     }

//     if (goalMode === "SMART") {
//       if (!form.goal) {
//         toast({
//           title: "Select a goal",
//           status: "warning",
//         });

//         return false;
//       }

//       if (!form.activity) {
//         toast({
//           title: "Select activity level",
//           status: "warning",
//         });

//         return false;
//       }
//     }

//     if (goalMode === "CUSTOM") {
//       if (
//         !form.target_calories ||
//         !form.protein_target ||
//         !form.carbs_target ||
//         !form.fats_target
//       ) {
//         toast({
//           title: "Enter all nutrition targets",
//           status: "warning",
//         });

//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       setSaving(true);

//       const payload: AssignGoalRequest = {
//         goal_mode: goalMode,

//         target_weight: Number(form.targetWeight),

//         duration_days: Number(form.duration),
//       };

//       if (goalMode === "SMART") {
//         payload.goal_type = form.goal;
//         payload.activity_level = form.activity;
//       } else {
//         payload.goal_type = "custom";

//         payload.target_calories =
//           Number(form.target_calories);

//         payload.protein_target =
//           Number(form.protein_target);

//         payload.carbs_target =
//           Number(form.carbs_target);

//         payload.fats_target =
//           Number(form.fats_target);
//       }

//       await assignClientGoal(memberId, payload);

//       toast({
//         title: "Goal assigned successfully",
//         status: "success",
//       });

//       onSuccess?.();
//     } catch {
//       toast({
//         title: "Unable to assign goal",
//         status: "error",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//     return (
//     <Box
//       bg="white"
//       borderRadius="3xl"
//       p={6}
//       boxShadow="sm"
//       border="1px solid"
//       borderColor="gray.100"
//     >
//       <VStack align="stretch" spacing={6}>
//         <Box>
//           <Text fontSize="xl" fontWeight="bold">
//             🎯 Goal Assignment
//           </Text>

//           <Text mt={1} color="gray.500" fontSize="sm">
//             Create or update this client's nutrition goal.
//           </Text>
//         </Box>

//         <GoalModeSelector
//           value={goalMode}
//           onChange={setGoalMode}
//         />

//         {goalMode === "SMART" && (
//           <>
//             <Box>
//               <Text mb={3} fontWeight="bold">
//                 Goal
//               </Text>

//               <SimpleGrid columns={[1, 2]} spacing={3}>
//                 {GOALS.map((goal) => (
//                   <Box
//                     key={goal.id}
//                     p={4}
//                     cursor="pointer"
//                     borderRadius="2xl"
//                     transition=".2s"
//                     bg={
//                       form.goal === goal.id
//                         ? "blue.50"
//                         : "white"
//                     }
//                     border={
//                       form.goal === goal.id
//                         ? "2px solid"
//                         : "1px solid"
//                     }
//                     borderColor={
//                       form.goal === goal.id
//                         ? "blue.400"
//                         : "gray.200"
//                     }
//                     onClick={() =>
//                       updateField("goal", goal.id)
//                     }
//                   >
//                     <Text fontSize="2xl">
//                       {goal.icon}
//                     </Text>

//                     <Text
//                       mt={2}
//                       fontWeight="bold"
//                     >
//                       {goal.title}
//                     </Text>

//                     <Text
//                       mt={1}
//                       fontSize="xs"
//                       color="gray.500"
//                     >
//                       {goal.description}
//                     </Text>
//                   </Box>
//                 ))}
//               </SimpleGrid>
//             </Box>

//             <Box>
//               <Text mb={3} fontWeight="bold">
//                 Activity Level
//               </Text>

//               <SimpleGrid columns={[1, 2]} spacing={3}>
//                 {ACTIVITIES.map((activity) => (
//                   <Box
//                     key={activity.id}
//                     p={4}
//                     cursor="pointer"
//                     borderRadius="2xl"
//                     transition=".2s"
//                     bg={
//                       form.activity === activity.id
//                         ? "blue.50"
//                         : "white"
//                     }
//                     border={
//                       form.activity === activity.id
//                         ? "2px solid"
//                         : "1px solid"
//                     }
//                     borderColor={
//                       form.activity === activity.id
//                         ? "blue.400"
//                         : "gray.200"
//                     }
//                     onClick={() =>
//                       updateField(
//                         "activity",
//                         activity.id
//                       )
//                     }
//                   >
//                     <Text fontSize="2xl">
//                       {activity.icon}
//                     </Text>

//                     <Text
//                       mt={2}
//                       fontWeight="bold"
//                     >
//                       {activity.title}
//                     </Text>

//                     <Text
//                       mt={1}
//                       fontSize="xs"
//                       color="gray.500"
//                     >
//                       {activity.description}
//                     </Text>
//                   </Box>
//                 ))}
//               </SimpleGrid>
//             </Box>
//           </>
//         )}

//         <SimpleGrid columns={[1, 2]} spacing={4}>
//           <Box>
//             <Text mb={2} fontWeight="bold">
//               Target Weight (kg)
//             </Text>

//             <Input
//               value={form.targetWeight}
//               placeholder="Target Weight"
//               onChange={(e) =>
//                 updateField(
//                   "targetWeight",
//                   e.target.value
//                 )
//               }
//             />
//           </Box>

//           <Box>
//             <Text mb={2} fontWeight="bold">
//               Duration (Days)
//             </Text>

//             <Input
//               value={form.duration}
//               placeholder="Duration"
//               onChange={(e) =>
//                 updateField(
//                   "duration",
//                   e.target.value
//                 )
//               }
//             />
//           </Box>
//         </SimpleGrid>

//         {goalMode === "CUSTOM" && (
//           <CustomMacroSection
//             values={{
//               target_calories:
//                 form.target_calories,
//               protein_target:
//                 form.protein_target,
//               carbs_target:
//                 form.carbs_target,
//               fats_target:
//                 form.fats_target,
//             }}
//             onChange={(field, value) =>
//               updateField(
//                 field as keyof GoalForm,
//                 value
//               )
//             }
//           />
//         )}

//         <HStack justify="flex-end" pt={2}>
//           <Button
//             colorScheme="blue"
//             size="lg"
//             isLoading={saving}
//             loadingText="Saving..."
//             onClick={handleSubmit}
//           >
//             {goalMode === "SMART"
//               ? "Assign Smart Goal"
//               : "Assign Custom Goal"}
//           </Button>
//         </HStack>
//       </VStack>
//     </Box>
//   );
// };

// export default GoalAssignment;



// Version 2

import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiEdit2,
  FiSave,
  FiTarget,
  FiX,
} from "react-icons/fi";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import GoalModeSelector from "../../../Profile/GoalModeSelector";
import CustomMacroSection from "../../../Profile/CustomMacroSection";

import {
  GOALS,
  ACTIVITIES,
} from "../../../../constants/goal.constants";

import {
  assignClientGoal,
  type AssignGoalRequest,
} from "../../../../services/staff/client.service";

import type {
  ClientDetails,
} from "../../../../services/staff/client.types";

interface GoalAssignmentProps {
  memberId: number;
  client: ClientDetails;
  onSuccess?: () => void;
}

interface GoalForm {
  goal: string;
  activity: string;
  targetWeight: string;
  duration: string;
  target_calories: string;
  protein_target: string;
  carbs_target: string;
  fats_target: string;
}

const GoalAssignment = ({
  memberId,
  client,
  onSuccess,
}: GoalAssignmentProps) => {

  const toast = useToast();

  const profile = client.fitness_profile;

  const cardBg = useColorModeValue(
    "white",
    "gray.800"
  );

  const borderColor = useColorModeValue(
    "gray.200",
    "gray.700"
  );

  const summaryBg = useColorModeValue(
    "gray.50",
    "gray.900"
  );

  const [saving, setSaving] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [goalMode, setGoalMode] =
    useState<"SMART" | "CUSTOM">(
      "SMART"
    );

  const [form, setForm] =
    useState<GoalForm>({
      goal: "",
      activity: "",
      targetWeight: "",
      duration: "",
      target_calories: "",
      protein_target: "",
      carbs_target: "",
      fats_target: "",
    });

  const [originalForm, setOriginalForm] =
    useState<GoalForm | null>(null);

  useEffect(() => {

    if (!profile) return;

    const values: GoalForm = {

      goal:
        profile.goal_type === "custom"
          ? ""
          : profile.goal_type || "",

      activity:
        profile.activity_level || "",

      targetWeight:
        profile.target_weight?.toString() ||
        "",

      duration:
        profile.duration_days?.toString() ||
        "",

      target_calories:
        profile.target_calories?.toString() ||
        "",

      protein_target:
        profile.protein_target?.toString() ||
        "",

      carbs_target:
        profile.carbs_target?.toString() ||
        "",

      fats_target:
        profile.fats_target?.toString() ||
        "",

    };

    setGoalMode(
      (profile.goal_mode as
        "SMART" | "CUSTOM") || "SMART"
    );

    setForm(values);

    setOriginalForm(values);

    setIsEditing(false);

  }, [profile]);

  const updateField = (
    field: keyof GoalForm,
    value: string
  ) => {

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

  };

  const hasChanges = useMemo(() => {

    if (!originalForm) return false;

    return (
      JSON.stringify(form) !==
        JSON.stringify(originalForm) ||
      goalMode !==
        ((profile.goal_mode as
          "SMART" | "CUSTOM") ??
          "SMART")
    );

  }, [
    form,
    originalForm,
    goalMode,
    profile.goal_mode,
  ]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {

    if (!originalForm) return;

    setGoalMode(
      (profile.goal_mode as
        "SMART" | "CUSTOM") ??
        "SMART"
    );

    setForm(originalForm);

    setIsEditing(false);

  };

    const validate = () => {

    if (!hasChanges) {
      toast({
        title: "No changes detected",
        status: "info",
      });

      return false;
    }

    if (!form.targetWeight) {
      toast({
        title: "Target weight is required",
        status: "warning",
      });

      return false;
    }

    if (!form.duration) {
      toast({
        title: "Duration is required",
        status: "warning",
      });

      return false;
    }

    if (goalMode === "SMART") {

      if (!form.goal) {
        toast({
          title: "Please select a goal",
          status: "warning",
        });

        return false;
      }

      if (!form.activity) {
        toast({
          title: "Please select activity level",
          status: "warning",
        });

        return false;
      }

    } else {

      if (
        !form.target_calories ||
        !form.protein_target ||
        !form.carbs_target ||
        !form.fats_target
      ) {

        toast({
          title: "Please enter all macro targets",
          status: "warning",
        });

        return false;
      }

    }

    return true;

  };

  const handleSubmit = async () => {

    if (!validate()) return;

    try {

      setSaving(true);

      const payload: AssignGoalRequest = {

        goal_mode: goalMode,

        target_weight: Number(
          form.targetWeight
        ),

        duration_days: Number(
          form.duration
        ),

      };

      if (goalMode === "SMART") {

        payload.goal_type = form.goal;

        payload.activity_level =
          form.activity;

      } else {

        payload.goal_type = "custom";

        payload.target_calories =
          Number(form.target_calories);

        payload.protein_target =
          Number(form.protein_target);

        payload.carbs_target =
          Number(form.carbs_target);

        payload.fats_target =
          Number(form.fats_target);

      }

      await assignClientGoal(
        memberId,
        payload
      );

      toast({
        title: "Nutrition goal updated",
        description:
          "The client's nutrition plan has been updated successfully.",
        status: "success",
      });

      setOriginalForm(form);

      setIsEditing(false);

      onSuccess?.();

    } catch {

      toast({
        title: "Unable to update nutrition goal",
        status: "error",
      });

    } finally {

      setSaving(false);

    }

  };

  const goalTitle =
    profile?.goal_type
      ?.replaceAll("_", " ")
      ?.replace(/\b\w/g, (c) =>
        c.toUpperCase()
      ) ?? "-";

  const currentActivity =
    profile?.activity_level
      ?.replaceAll("_", " ")
      ?.replace(/\b\w/g, (c) =>
        c.toUpperCase()
      ) ?? "-";

  const currentCalories =
    profile?.target_calories ?? "-";

  const currentProtein =
    profile?.protein_target ?? "-";

  const currentCarbs =
    profile?.carbs_target ?? "-";

  const currentFats =
    profile?.fats_target ?? "-";

  return (
  <>

    <Box
      maxW="1200px"
      mx="auto"
      bg={cardBg}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      overflow="hidden"
    >

          <VStack
        align="stretch"
        spacing={6}
        p={{ base: 5, md: 8 }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={4}
        >
          <Box>
            <Text
              fontSize="2xl"
              fontWeight="bold"
            >
              🎯 Nutrition Goal
            </Text>

            <Text
              color="gray.500"
              mt={1}
            >
              Review and manage the client's
              nutrition goal.
            </Text>
          </Box>

          {!isEditing ? (
            <Button
              leftIcon={<FiEdit2 />}
              colorScheme="blue"
              onClick={handleEdit}
            >
              Edit Goal
            </Button>
          ) : (
            <Badge
              colorScheme="orange"
              px={3}
              py={2}
              borderRadius="full"
            >
              Editing
            </Badge>
          )}
        </Flex>

        <Divider />

        <Box
          bg={summaryBg}
          p={6}
          borderRadius="2xl"
        >
          <Flex
            justify="space-between"
            align="center"
            mb={5}
          >
            <HStack>
              <Icon
                as={FiTarget}
                color="blue.500"
              />

              <Text
                fontWeight="bold"
                fontSize="lg"
              >
                Current Goal
              </Text>
            </HStack>

            <Badge
              colorScheme={
                goalMode === "SMART"
                  ? "green"
                  : "purple"
              }
              px={3}
              py={1}
              borderRadius="full"
            >
              {goalMode}
            </Badge>
          </Flex>

          <Text
            fontSize="2xl"
            fontWeight="bold"
          >
            {goalTitle}
          </Text>

          <HStack
            mt={2}
            color="gray.500"
          >
            <Icon as={FiActivity} />

            <Text>
              {currentActivity}
            </Text>
          </HStack>

          <Grid
            mt={8}
            templateColumns={{
              base: "repeat(2,1fr)",
              lg: "repeat(4,1fr)",
            }}
            gap={5}
          >
            <GridItem>
              <Stat
                bg="white"
                p={4}
                borderRadius="xl"
              >
                <StatLabel>
                  Calories
                </StatLabel>

                <StatNumber>
                  {currentCalories}
                </StatNumber>
              </Stat>
            </GridItem>

            <GridItem>
              <Stat
                bg="white"
                p={4}
                borderRadius="xl"
              >
                <StatLabel>
                  Protein
                </StatLabel>

                <StatNumber>
                  {currentProtein} g
                </StatNumber>
              </Stat>
            </GridItem>

            <GridItem>
              <Stat
                bg="white"
                p={4}
                borderRadius="xl"
              >
                <StatLabel>
                  Carbs
                </StatLabel>

                <StatNumber>
                  {currentCarbs} g
                </StatNumber>
              </Stat>
            </GridItem>

            <GridItem>
              <Stat
                bg="white"
                p={4}
                borderRadius="xl"
              >
                <StatLabel>
                  Fat
                </StatLabel>

                <StatNumber>
                  {currentFats} g
                </StatNumber>
              </Stat>
            </GridItem>
          </Grid>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
            }}
            spacing={5}
            mt={6}
          >
            <Box
              bg="white"
              p={5}
              borderRadius="xl"
            >
              <Text
                color="gray.500"
                fontSize="sm"
              >
                Target Weight
              </Text>

              <Text
                fontWeight="bold"
                fontSize="xl"
              >
                {form.targetWeight} kg
              </Text>
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="xl"
            >
              <Text
                color="gray.500"
                fontSize="sm"
              >
                Duration
              </Text>

              <Text
                fontWeight="bold"
                fontSize="xl"
              >
                {form.duration} Days
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
        

        {isEditing && (
           <>

                      <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="2xl"
              p={6}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb={5}
              >
                Goal Configuration
              </Text>

              <GoalModeSelector
                value={goalMode}
                onChange={setGoalMode}
              />

              {goalMode === "SMART" && (
                <>
                  <Box mt={6}>
                    <Text
                      mb={3}
                      fontWeight="bold"
                    >
                      Goal
                    </Text>

                    <SimpleGrid
                      columns={{
                        base: 1,
                        md: 2,
                      }}
                      spacing={4}
                    >
                      {GOALS.map((goal) => (
                        <Box
                          key={goal.id}
                          p={5}
                          cursor="pointer"
                          transition=".2s"
                          borderRadius="2xl"
                          border={
                            form.goal === goal.id
                              ? "2px solid"
                              : "1px solid"
                          }
                          borderColor={
                            form.goal === goal.id
                              ? "blue.400"
                              : borderColor
                          }
                          bg={
                            form.goal === goal.id
                              ? "blue.50"
                              : "white"
                          }
                          onClick={() =>
                            updateField(
                              "goal",
                              goal.id
                            )
                          }
                        >
                          <Text fontSize="3xl">
                            {goal.icon}
                          </Text>

                          <Text
                            mt={3}
                            fontWeight="bold"
                          >
                            {goal.title}
                          </Text>

                          <Text
                            mt={2}
                            fontSize="sm"
                            color="gray.500"
                          >
                            {goal.description}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>

                  <Box mt={8}>
                    <Text
                      mb={3}
                      fontWeight="bold"
                    >
                      Activity Level
                    </Text>

                    <SimpleGrid
                      columns={{
                        base: 1,
                        md: 2,
                      }}
                      spacing={4}
                    >
                      {ACTIVITIES.map(
                        (activity) => (
                          <Box
                            key={activity.id}
                            p={5}
                            cursor="pointer"
                            transition=".2s"
                            borderRadius="2xl"
                            border={
                              form.activity ===
                              activity.id
                                ? "2px solid"
                                : "1px solid"
                            }
                            borderColor={
                              form.activity ===
                              activity.id
                                ? "blue.400"
                                : borderColor
                            }
                            bg={
                              form.activity ===
                              activity.id
                                ? "blue.50"
                                : "white"
                            }
                            onClick={() =>
                              updateField(
                                "activity",
                                activity.id
                              )
                            }
                          >
                            <Text fontSize="3xl">
                              {activity.icon}
                            </Text>

                            <Text
                              mt={3}
                              fontWeight="bold"
                            >
                              {activity.title}
                            </Text>

                            <Text
                              mt={2}
                              fontSize="sm"
                              color="gray.500"
                            >
                              {
                                activity.description
                              }
                            </Text>
                          </Box>
                        )
                      )}
                    </SimpleGrid>
                  </Box>
                </>
              )}

                            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={6}
                mt={goalMode === "SMART" ? 8 : 0}
              >
                <Box>
                  <Text
                    mb={2}
                    fontWeight="bold"
                  >
                    Target Weight (kg)
                  </Text>

                  <Input
                    size="lg"
                    type="number"
                    placeholder="Enter target weight"
                    value={form.targetWeight}
                    onChange={(e) =>
                      updateField(
                        "targetWeight",
                        e.target.value
                      )
                    }
                  />
                </Box>

                <Box>
                  <Text
                    mb={2}
                    fontWeight="bold"
                  >
                    Duration (Days)
                  </Text>

                  <Input
                    size="lg"
                    type="number"
                    placeholder="Enter duration"
                    value={form.duration}
                    onChange={(e) =>
                      updateField(
                        "duration",
                        e.target.value
                      )
                    }
                  />
                </Box>
              </SimpleGrid>

              {goalMode === "CUSTOM" && (
                <Box mt={8}>
                  <CustomMacroSection
                    values={{
                      target_calories:
                        form.target_calories,

                      protein_target:
                        form.protein_target,

                      carbs_target:
                        form.carbs_target,

                      fats_target:
                        form.fats_target,
                    }}
                    onChange={(
                      field,
                      value
                    ) =>
                      updateField(
                        field as keyof GoalForm,
                        value
                      )
                    }
                  />
                </Box>
              )}

              <Divider my={8} />

              <Flex
                justify="flex-end"
                gap={4}
                flexWrap="wrap"
              >
                <Button
                  leftIcon={<FiX />}
                  variant="outline"
                  size="lg"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  leftIcon={<FiSave />}
                  colorScheme="blue"
                  size="lg"
                  isLoading={saving}
                  loadingText="Saving..."
                  isDisabled={!hasChanges}
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </Flex>
            </Box>
           </> 
        )}
      </VStack>
    </Box>
    </>
  );
};

  export default GoalAssignment;