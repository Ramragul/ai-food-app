import {
  Box,
  Button,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import GoalModeSelector from "../../../Profile/GoalModeSelector";
import CustomMacroSection from "../../../Profile/CustomMacroSection";

import { GOALS, ACTIVITIES } from "../../../../constants/goal.constants";

import {
  assignClientGoal,
  AssignGoalRequest,
} from "../../../../services/staff/client.service";

import { ClientDetails } from "../../../../services/staff/client.types";

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

  const [saving, setSaving] = useState(false);

  const [goalMode, setGoalMode] =
    useState<"SMART" | "CUSTOM">("SMART");

  const [form, setForm] = useState<GoalForm>({
    goal: "",
    activity: "",
    targetWeight: "",
    duration: "",
    target_calories: "",
    protein_target: "",
    carbs_target: "",
    fats_target: "",
  });

  useEffect(() => {
    if (!profile) return;

    setGoalMode(
      (profile.goal_mode as "SMART" | "CUSTOM") || "SMART"
    );

    setForm({
      goal:
        profile.goal_type === "custom"
          ? ""
          : profile.goal_type || "",

      activity: profile.activity_level || "",

      targetWeight:
        profile.target_weight?.toString() || "",

      duration:
        profile.duration_days?.toString() || "",

      target_calories:
        profile.target_calories?.toString() || "",

      protein_target:
        profile.protein_target?.toString() || "",

      carbs_target:
        profile.carbs_target?.toString() || "",

      fats_target:
        profile.fats_target?.toString() || "",
    });
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

  const validate = () => {
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
          title: "Select a goal",
          status: "warning",
        });

        return false;
      }

      if (!form.activity) {
        toast({
          title: "Select activity level",
          status: "warning",
        });

        return false;
      }
    }

    if (goalMode === "CUSTOM") {
      if (
        !form.target_calories ||
        !form.protein_target ||
        !form.carbs_target ||
        !form.fats_target
      ) {
        toast({
          title: "Enter all nutrition targets",
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

        target_weight: Number(form.targetWeight),

        duration_days: Number(form.duration),
      };

      if (goalMode === "SMART") {
        payload.goal_type = form.goal;
        payload.activity_level = form.activity;
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

      await assignClientGoal(memberId, payload);

      toast({
        title: "Goal assigned successfully",
        status: "success",
      });

      onSuccess?.();
    } catch {
      toast({
        title: "Unable to assign goal",
        status: "error",
      });
    } finally {
      setSaving(false);
    }
  };

    return (
    <Box
      bg="white"
      borderRadius="3xl"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
    >
      <VStack align="stretch" spacing={6}>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            🎯 Goal Assignment
          </Text>

          <Text mt={1} color="gray.500" fontSize="sm">
            Create or update this client's nutrition goal.
          </Text>
        </Box>

        <GoalModeSelector
          value={goalMode}
          onChange={setGoalMode}
        />

        {goalMode === "SMART" && (
          <>
            <Box>
              <Text mb={3} fontWeight="bold">
                Goal
              </Text>

              <SimpleGrid columns={[1, 2]} spacing={3}>
                {GOALS.map((goal) => (
                  <Box
                    key={goal.id}
                    p={4}
                    cursor="pointer"
                    borderRadius="2xl"
                    transition=".2s"
                    bg={
                      form.goal === goal.id
                        ? "blue.50"
                        : "white"
                    }
                    border={
                      form.goal === goal.id
                        ? "2px solid"
                        : "1px solid"
                    }
                    borderColor={
                      form.goal === goal.id
                        ? "blue.400"
                        : "gray.200"
                    }
                    onClick={() =>
                      updateField("goal", goal.id)
                    }
                  >
                    <Text fontSize="2xl">
                      {goal.icon}
                    </Text>

                    <Text
                      mt={2}
                      fontWeight="bold"
                    >
                      {goal.title}
                    </Text>

                    <Text
                      mt={1}
                      fontSize="xs"
                      color="gray.500"
                    >
                      {goal.description}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Text mb={3} fontWeight="bold">
                Activity Level
              </Text>

              <SimpleGrid columns={[1, 2]} spacing={3}>
                {ACTIVITIES.map((activity) => (
                  <Box
                    key={activity.id}
                    p={4}
                    cursor="pointer"
                    borderRadius="2xl"
                    transition=".2s"
                    bg={
                      form.activity === activity.id
                        ? "blue.50"
                        : "white"
                    }
                    border={
                      form.activity === activity.id
                        ? "2px solid"
                        : "1px solid"
                    }
                    borderColor={
                      form.activity === activity.id
                        ? "blue.400"
                        : "gray.200"
                    }
                    onClick={() =>
                      updateField(
                        "activity",
                        activity.id
                      )
                    }
                  >
                    <Text fontSize="2xl">
                      {activity.icon}
                    </Text>

                    <Text
                      mt={2}
                      fontWeight="bold"
                    >
                      {activity.title}
                    </Text>

                    <Text
                      mt={1}
                      fontSize="xs"
                      color="gray.500"
                    >
                      {activity.description}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </>
        )}

        <SimpleGrid columns={[1, 2]} spacing={4}>
          <Box>
            <Text mb={2} fontWeight="bold">
              Target Weight (kg)
            </Text>

            <Input
              value={form.targetWeight}
              placeholder="Target Weight"
              onChange={(e) =>
                updateField(
                  "targetWeight",
                  e.target.value
                )
              }
            />
          </Box>

          <Box>
            <Text mb={2} fontWeight="bold">
              Duration (Days)
            </Text>

            <Input
              value={form.duration}
              placeholder="Duration"
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
            onChange={(field, value) =>
              updateField(
                field as keyof GoalForm,
                value
              )
            }
          />
        )}

        <HStack justify="flex-end" pt={2}>
          <Button
            colorScheme="blue"
            size="lg"
            isLoading={saving}
            loadingText="Saving..."
            onClick={handleSubmit}
          >
            {goalMode === "SMART"
              ? "Assign Smart Goal"
              : "Assign Custom Goal"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default GoalAssignment;