import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";

import type { WorkoutAssignment } from "../../../types/workout.types";
import {
  updateWorkoutAssignment,
} from "../../../services/workoutAssignment.service";

interface WorkoutAssignmentEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: number;
  assignment: WorkoutAssignment | null;
  templateName: string;
  onSuccess?: () => void;
}

const DAYS = [
  { key: "MON", label: "M", name: "Monday" },
  { key: "TUE", label: "T", name: "Tuesday" },
  { key: "WED", label: "W", name: "Wednesday" },
  { key: "THU", label: "T", name: "Thursday" },
  { key: "FRI", label: "F", name: "Friday" },
  { key: "SAT", label: "S", name: "Saturday" },
  { key: "SUN", label: "S", name: "Sunday" },
];

const getAssignmentValue = (assignment: any, ...keys: string[]) => {
  for (const key of keys) {
    if (assignment?.[key] !== undefined) return assignment[key];
  }
  return null;
};

const WorkoutAssignmentEditDrawer = ({
  isOpen,
  onClose,
  organizationId,
  assignment,
  templateName,
  onSuccess,
}: WorkoutAssignmentEditDrawerProps) => {
  const toast = useToast();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduledDays, setScheduledDays] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !assignment) return;

    const rawDays = getAssignmentValue(
      assignment,
      "scheduled_days",
      "scheduledDays"
    );

    setStartDate(
      String(getAssignmentValue(assignment, "start_date", "startDate") ?? "")
    );
    setEndDate(
      String(getAssignmentValue(assignment, "end_date", "endDate") ?? "")
    );
    setScheduledDays(Array.isArray(rawDays) ? rawDays : []);
  }, [isOpen, assignment]);

  const toggleDay = (day: string) => {
    setScheduledDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day]
    );
  };

  const save = async () => {
    if (!assignment?.id) return;

    if (!startDate) {
      toast({
        title: "Start date is required",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    if (endDate && endDate < startDate) {
      toast({
        title: "Invalid end date",
        description: "End date must be on or after the start date.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!scheduledDays.length) {
      toast({
        title: "Select training days",
        description: "Choose at least one training day.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    try {
      setSaving(true);

      await updateWorkoutAssignment(assignment.id, {
        organizationId,
        startDate,
        endDate: endDate || null,
        scheduledDays,
      });

      toast({
        title: "Workout assignment updated",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Failed to update workout assignment:", error);
      toast({
        title: "Unable to update assignment",
        description:
          error?.response?.data?.error ||
          error?.message ||
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent borderLeftRadius={{ base: "0", md: "28px" }} overflow="hidden">
        <DrawerHeader px={6} pt={6} pb={4} borderBottom="1px solid" borderColor="gray.100">
          <HStack justify="space-between" align="start">
            <Box>
              <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px">
                Edit assignment
              </Text>
              <Text mt={1} fontSize="xl" fontWeight="900" color="gray.900">
                {templateName}
              </Text>
              <Badge mt={2} colorScheme="blue" borderRadius="full">
                Client workout
              </Badge>
            </Box>

            <Button
              variant="ghost"
              borderRadius="full"
              onClick={onClose}
              aria-label="Close"
            >
              <Icon as={FiX} boxSize={20} />
            </Button>
          </HStack>
        </DrawerHeader>

        <DrawerBody px={6} py={6}>
          <VStack align="stretch" spacing={7}>
            <Box>
              <HStack mb={4} spacing={2}>
                <Icon as={FiCalendar} color="blue.500" />
                <Box>
                  <Text fontWeight="800" fontSize="sm">
                    Assignment period
                  </Text>
                  <Text mt={0.5} fontSize="xs" color="gray.500">
                    Update when this workout is active for the client.
                  </Text>
                </Box>
              </HStack>

              <HStack align="start" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight="700" color="gray.500">
                    Start date
                  </FormLabel>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    size="lg"
                    borderRadius="xl"
                    bg="gray.50"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="xs" fontWeight="700" color="gray.500">
                    End date
                  </FormLabel>
                  <Input
                    type="date"
                    min={startDate}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    size="lg"
                    borderRadius="xl"
                    bg="gray.50"
                  />
                </FormControl>
              </HStack>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="800" fontSize="sm">
                Training days
              </Text>
              <Text mt={1} fontSize="xs" color="gray.500">
                Choose the days this workout should repeat.
              </Text>

              <HStack mt={4} spacing={2} flexWrap="wrap">
                {DAYS.map((day) => {
                  const selected = scheduledDays.includes(day.key);

                  return (
                    <Button
                      key={day.key}
                      w="44px"
                      h="44px"
                      minW="44px"
                      p={0}
                      borderRadius="full"
                      variant={selected ? "solid" : "outline"}
                      colorScheme="blue"
                      bg={selected ? "blue.500" : "white"}
                      borderColor={selected ? "blue.500" : "gray.200"}
                      color={selected ? "white" : "gray.600"}
                      onClick={() => toggleDay(day.key)}
                    >
                      {day.label}
                    </Button>
                  );
                })}
              </HStack>

              <Text mt={3} fontSize="xs" color={scheduledDays.length ? "gray.500" : "orange.500"}>
                {scheduledDays.length
                  ? scheduledDays
                      .map((key) => DAYS.find((day) => day.key === key)?.name ?? key)
                      .join(" • ")
                  : "Select at least one training day"}
              </Text>
            </Box>
          </VStack>
        </DrawerBody>

        <DrawerFooter px={6} py={5} borderTop="1px solid" borderColor="gray.100" gap={3}>
          <Button variant="ghost" borderRadius="xl" onClick={onClose} isDisabled={saving}>
            Cancel
          </Button>
          <Button
            flex={1}
            colorScheme="blue"
            borderRadius="xl"
            h="48px"
            leftIcon={<FiCheck />}
            onClick={save}
            isLoading={saving}
            loadingText="Saving..."
          >
            Save Changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkoutAssignmentEditDrawer;
