// Version 1

// import {
//   Box,
//   Button,
//   Checkbox,
//   Flex,
//   FormControl,
//   FormLabel,
//   Grid,
//   Heading,
//   HStack,
//   Input,
//   Select,
//   Spinner,
//   Text,
//   Textarea,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import { FiArrowLeft, FiCheck } from "react-icons/fi";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   createWorkoutExercise,
//   getWorkoutEquipment,
//   getWorkoutExerciseById,
//   getWorkoutMuscleGroups,
//   updateWorkoutExercise,
//   type CreateWorkoutExercisePayload,
//   type WorkoutEquipment,
//   type WorkoutExerciseDetail,
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

// const MOVEMENT_OPTIONS = [
//   "PUSH",
//   "PULL",
//   "SQUAT",
//   "HINGE",
//   "LUNGE",
//   "CARRY",
//   "ROTATION",
//   "ANTI_ROTATION",
//   "ISOMETRIC",
//   "OTHER",
// ];

// type FormState = CreateWorkoutExercisePayload;

// const emptyForm: FormState = {
//   name: "",
//   description: "",
//   primaryMuscleGroupId: null,
//   secondaryMuscleGroupIds: [],
//   equipmentIds: [],
//   movementPattern: "",
//   trackingType: "REPS_WEIGHT",
//   difficulty: "BEGINNER",
//   instructions: "",
//   imageUrl: "",
//   videoUrl: "",
//   environment: "BOTH",
// };

// const StaffWorkoutExerciseFormPage = () => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const { exerciseId } = useParams();
//   const isEdit = Boolean(exerciseId);

//   const [loading, setLoading] = useState(isEdit);
//   const [saving, setSaving] = useState(false);
//   const [muscleGroups, setMuscleGroups] = useState<WorkoutMuscleGroup[]>([]);
//   const [equipment, setEquipment] = useState<WorkoutEquipment[]>([]);
//   const [form, setForm] = useState<FormState>(emptyForm);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);

//         const [muscles, equipmentData, detail] = await Promise.all([
//           getWorkoutMuscleGroups(),
//           getWorkoutEquipment(),
//           isEdit
//             ? getWorkoutExerciseById(Number(exerciseId))
//             : Promise.resolve<WorkoutExerciseDetail | null>(null),
//         ]);

//         setMuscleGroups(muscles);
//         setEquipment(equipmentData);

//         if (detail) {
//           const primary =
//             detail.muscles?.find((item) => item.role === "PRIMARY")?.muscle_group_id ??
//             detail.primary_muscle_group_id ??
//             null;

//           const secondary =
//             detail.muscles
//               ?.filter((item) => item.role !== "PRIMARY")
//               .map((item) => Number(item.muscle_group_id)) ?? [];

//           setForm({
//             name: detail.name ?? "",
//             description: detail.description ?? "",
//             primaryMuscleGroupId: primary,
//             secondaryMuscleGroupIds: secondary,
//             equipmentIds:
//               detail.equipment?.map((item) => Number(item.equipment_id)) ?? [],
//             movementPattern: detail.movement_pattern ?? "",
//             trackingType: detail.tracking_type ?? "REPS_WEIGHT",
//             difficulty: detail.difficulty ?? "BEGINNER",
//             instructions: detail.instructions ?? "",
//             imageUrl: detail.image_url ?? "",
//             videoUrl: detail.video_url ?? "",
//             environment:
//               (detail.environment as FormState["environment"]) ?? "BOTH",
//           });
//         }
//       } catch (error: any) {
//         console.error("Failed to load exercise form:", error);

//         toast({
//           title: "Unable to load exercise",
//           description:
//             error?.response?.data?.error ??
//             error?.message ??
//             "Please try again.",
//           status: "error",
//           duration: 3500,
//           isClosable: true,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     void load();
//   }, [exerciseId, isEdit, toast]);

//   const secondaryMuscles = useMemo(
//     () =>
//       muscleGroups.filter(
//         (item) => Number(item.id) !== Number(form.primaryMuscleGroupId)
//       ),
//     [form.primaryMuscleGroupId, muscleGroups]
//   );

//   const toggleSecondaryMuscle = (id: number) => {
//     setForm((current) => ({
//       ...current,
//       secondaryMuscleGroupIds: current.secondaryMuscleGroupIds.includes(id)
//         ? current.secondaryMuscleGroupIds.filter((item) => item !== id)
//         : [...current.secondaryMuscleGroupIds, id],
//     }));
//   };

//   const toggleEquipment = (id: number) => {
//     setForm((current) => ({
//       ...current,
//       equipmentIds: current.equipmentIds.includes(id)
//         ? current.equipmentIds.filter((item) => item !== id)
//         : [...current.equipmentIds, id],
//     }));
//   };

//   const submit = async () => {
//     if (!form.name.trim()) {
//       toast({
//         title: "Exercise name is required",
//         status: "warning",
//         duration: 2500,
//         isClosable: true,
//       });
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload: FormState = {
//         ...form,
//         name: form.name.trim(),
//         description: form.description?.trim() ?? "",
//         instructions: form.instructions?.trim() ?? "",
//         imageUrl: form.imageUrl?.trim() ?? "",
//         videoUrl: form.videoUrl?.trim() ?? "",
//       };

//       if (isEdit) {
//         await updateWorkoutExercise(Number(exerciseId), payload);
//       } else {
//         await createWorkoutExercise(payload);
//       }

//       toast({
//         title: isEdit ? "Exercise updated" : "Exercise created",
//         description: isEdit
//           ? "The exercise has been updated successfully."
//           : "The exercise is now available in the exercise library.",
//         status: "success",
//         duration: 2500,
//         isClosable: true,
//       });

//       navigate("/staff/workouts/exercises");
//     } catch (error: any) {
//       console.error("Failed to save exercise:", error);

//       toast({
//         title: isEdit ? "Unable to update exercise" : "Unable to create exercise",
//         description:
//           error?.response?.data?.error ??
//           error?.message ??
//           "Please try again.",
//         status: "error",
//         duration: 3500,
//         isClosable: true,
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Flex minH="60vh" align="center" justify="center">
//         <VStack spacing={4}>
//           <Spinner size="xl" color="blue.400" />
//           <Text fontSize="sm" color="gray.500">Loading exercise...</Text>
//         </VStack>
//       </Flex>
//     );
//   }

//   return (
//     <Box maxW="1100px" mx="auto" px={{ base: 4, md: 6, xl: 8 }} py={{ base: 5, md: 8 }}>
//       <HStack mb={6}>
//         <Button
//           variant="ghost"
//           leftIcon={<FiArrowLeft />}
//           borderRadius="xl"
//           onClick={() => navigate("/staff/workouts/exercises")}
//         >
//           Exercise Library
//         </Button>
//       </HStack>

//       <Box mb={7}>
//         <Heading size={{ base: "lg", md: "xl" }} color="gray.800">
//           {isEdit ? "Edit Exercise" : "Create Exercise"}
//         </Heading>
//         <Text mt={2} color="gray.500" lineHeight="1.7">
//           Keep the exercise definition reusable and clean so it can be used across multiple workout templates.
//         </Text>
//       </Box>

//       <VStack align="stretch" spacing={6}>
//         <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
//           <Heading size="sm" color="gray.800" mb={5}>Basic information</Heading>

//           <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={5}>
//             <FormControl isRequired>
//               <FormLabel fontSize="sm">Exercise name</FormLabel>
//               <Input
//                 value={form.name}
//                 onChange={(event) =>
//                   setForm((current) => ({ ...current, name: event.target.value }))
//                 }
//                 placeholder="e.g. Dumbbell Biceps Curl"
//                 borderRadius="xl"
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel fontSize="sm">Difficulty</FormLabel>
//               <Select
//                 value={form.difficulty ?? ""}
//                 onChange={(event) =>
//                   setForm((current) => ({ ...current, difficulty: event.target.value }))
//                 }
//                 borderRadius="xl"
//               >
//                 {DIFFICULTY_OPTIONS.map((item) => (
//                   <option key={item} value={item}>
//                     {item.charAt(0) + item.slice(1).toLowerCase()}
//                   </option>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl gridColumn={{ base: "auto", md: "1 / -1" }}>
//               <FormLabel fontSize="sm">Description</FormLabel>
//               <Textarea
//                 value={form.description}
//                 onChange={(event) =>
//                   setForm((current) => ({ ...current, description: event.target.value }))
//                 }
//                 placeholder="What does this exercise target?"
//                 borderRadius="xl"
//                 rows={3}
//               />
//             </FormControl>
//           </Grid>
//         </Box>

//         <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
//           <Heading size="sm" color="gray.800" mb={5}>Movement & tracking</Heading>

//           <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={5}>
//             <FormControl>
//               <FormLabel fontSize="sm">Movement pattern</FormLabel>
//               <Select
//                 value={form.movementPattern ?? ""}
//                 onChange={(event) =>
//                   setForm((current) => ({ ...current, movementPattern: event.target.value }))
//                 }
//                 placeholder="Select movement"
//                 borderRadius="xl"
//               >
//                 {MOVEMENT_OPTIONS.map((item) => (
//                   <option key={item} value={item}>
//                     {item.replace(/_/g, " ")}
//                   </option>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel fontSize="sm">Tracking type</FormLabel>
//               <Select
//                 value={form.trackingType}
//                 onChange={(event) =>
//                   setForm((current) => ({ ...current, trackingType: event.target.value }))
//                 }
//                 borderRadius="xl"
//               >
//                 {TRACKING_OPTIONS.map((item) => (
//                   <option key={item.value} value={item.value}>
//                     {item.label}
//                   </option>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel fontSize="sm">Environment</FormLabel>
//               <Select
//                 value={form.environment}
//                 onChange={(event) =>
//                   setForm((current) => ({
//                     ...current,
//                     environment: event.target.value as FormState["environment"],
//                   }))
//                 }
//                 borderRadius="xl"
//               >
//                 {ENVIRONMENT_OPTIONS.map((item) => (
//                   <option key={item.value} value={item.value}>
//                     {item.label}
//                   </option>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Box>

//         <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
//           <Heading size="sm" color="gray.800" mb={5}>Muscles & equipment</Heading>

//           <FormControl mb={6}>
//             <FormLabel fontSize="sm">Primary muscle</FormLabel>
//             <Select
//               value={form.primaryMuscleGroupId ?? ""}
//               onChange={(event) => {
//                 const value = event.target.value ? Number(event.target.value) : null;
//                 setForm((current) => ({
//                   ...current,
//                   primaryMuscleGroupId: value,
//                   secondaryMuscleGroupIds: value
//                     ? current.secondaryMuscleGroupIds.filter((id) => id !== value)
//                     : current.secondaryMuscleGroupIds,
//                 }));
//               }}
//               placeholder="Select primary muscle"
//               borderRadius="xl"
//             >
//               {muscleGroups.map((item) => (
//                 <option key={item.id} value={item.id}>{item.name}</option>
//               ))}
//             </Select>
//           </FormControl>

//           <Text fontSize="sm" fontWeight="700" color="gray.700" mb={3}>
//             Secondary muscles
//           </Text>

//           <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={3} mb={7}>
//             {secondaryMuscles.map((item) => (
//               <Checkbox
//                 key={item.id}
//                 isChecked={form.secondaryMuscleGroupIds.includes(item.id)}
//                 onChange={() => toggleSecondaryMuscle(item.id)}
//               >
//                 {item.name}
//               </Checkbox>
//             ))}
//           </Grid>

//           <Text fontSize="sm" fontWeight="700" color="gray.700" mb={3}>
//             Equipment
//           </Text>

//           <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={3}>
//             {equipment.map((item) => (
//               <Checkbox
//                 key={item.id}
//                 isChecked={form.equipmentIds.includes(item.id)}
//                 onChange={() => toggleEquipment(item.id)}
//               >
//                 {item.name}
//               </Checkbox>
//             ))}
//           </Grid>
//         </Box>

//         <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
//           <Heading size="sm" color="gray.800" mb={5}>Instructions & media</Heading>

//           <VStack align="stretch" spacing={5}>
//             <FormControl>
//               <FormLabel fontSize="sm">Instructions</FormLabel>
//               <Textarea
//                 value={form.instructions}
//                 onChange={(event) =>
//                   setForm((current) => ({ ...current, instructions: event.target.value }))
//                 }
//                 placeholder="Step-by-step instructions..."
//                 borderRadius="xl"
//                 rows={6}
//               />
//             </FormControl>

//             <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
//               <FormControl>
//                 <FormLabel fontSize="sm">Image URL</FormLabel>
//                 <Input
//                   value={form.imageUrl}
//                   onChange={(event) =>
//                     setForm((current) => ({ ...current, imageUrl: event.target.value }))
//                   }
//                   placeholder="https://..."
//                   borderRadius="xl"
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel fontSize="sm">Video URL</FormLabel>
//                 <Input
//                   value={form.videoUrl}
//                   onChange={(event) =>
//                     setForm((current) => ({ ...current, videoUrl: event.target.value }))
//                   }
//                   placeholder="https://..."
//                   borderRadius="xl"
//                 />
//               </FormControl>
//             </Grid>
//           </VStack>
//         </Box>

//         <Flex justify="flex-end" gap={3} pb={4}>
//           <Button
//             variant="ghost"
//             borderRadius="xl"
//             onClick={() => navigate("/staff/workouts/exercises")}
//             isDisabled={saving}
//           >
//             Cancel
//           </Button>

//           <Button
//             colorScheme="blue"
//             borderRadius="xl"
//             leftIcon={<FiCheck />}
//             isLoading={saving}
//             onClick={submit}
//           >
//             {isEdit ? "Save Changes" : "Create Exercise"}
//           </Button>
//         </Flex>
//       </VStack>
//     </Box>
//   );
// };

// export default StaffWorkoutExerciseFormPage;




// Version 2

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiArrowLeft, FiCheck, FiTrash2 } from "react-icons/fi";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createWorkoutExercise,
  deleteWorkoutExercise,
  getWorkoutEquipment,
  getWorkoutExerciseById,
  getWorkoutMuscleGroups,
  updateWorkoutExercise,
  type CreateWorkoutExercisePayload,
  type WorkoutEquipment,
  type WorkoutExerciseDetail,
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

const MOVEMENT_OPTIONS = [
  "PUSH",
  "PULL",
  "SQUAT",
  "HINGE",
  "LUNGE",
  "CARRY",
  "ROTATION",
  "ANTI_ROTATION",
  "ISOMETRIC",
  "OTHER",
];

type FormState = CreateWorkoutExercisePayload;

const emptyForm: FormState = {
  name: "",
  description: "",
  primaryMuscleGroupId: null,
  secondaryMuscleGroupIds: [],
  equipmentIds: [],
  movementPattern: "",
  trackingType: "REPS_WEIGHT",
  difficulty: "BEGINNER",
  instructions: "",
  imageUrl: "",
  videoUrl: "",
  environment: "BOTH",
};

const StaffWorkoutExerciseFormPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { exerciseId } = useParams();
  const isEdit = Boolean(exerciseId);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [muscleGroups, setMuscleGroups] = useState<WorkoutMuscleGroup[]>([]);
  const [equipment, setEquipment] = useState<WorkoutEquipment[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [muscles, equipmentData, detail] = await Promise.all([
          getWorkoutMuscleGroups(),
          getWorkoutEquipment(),
          isEdit
            ? getWorkoutExerciseById(Number(exerciseId))
            : Promise.resolve<WorkoutExerciseDetail | null>(null),
        ]);

        setMuscleGroups(muscles);
        setEquipment(equipmentData);

        if (detail) {
          const primary =
            detail.muscles?.find((item) => item.role === "PRIMARY")?.muscle_group_id ??
            detail.primary_muscle_group_id ??
            null;

          const secondary =
            detail.muscles
              ?.filter((item) => item.role !== "PRIMARY")
              .map((item) => Number(item.muscle_group_id)) ?? [];

          setForm({
            name: detail.name ?? "",
            description: detail.description ?? "",
            primaryMuscleGroupId: primary,
            secondaryMuscleGroupIds: secondary,
            equipmentIds:
              detail.equipment?.map((item) => Number(item.equipment_id)) ?? [],
            movementPattern: detail.movement_pattern ?? "",
            trackingType: detail.tracking_type ?? "REPS_WEIGHT",
            difficulty: detail.difficulty ?? "BEGINNER",
            instructions: detail.instructions ?? "",
            imageUrl: detail.image_url ?? "",
            videoUrl: detail.video_url ?? "",
            environment:
              (detail.environment as FormState["environment"]) ?? "BOTH",
          });
        }
      } catch (error: any) {
        console.error("Failed to load exercise form:", error);

        toast({
          title: "Unable to load exercise",
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
    };

    void load();
  }, [exerciseId, isEdit, toast]);

  const secondaryMuscles = useMemo(
    () =>
      muscleGroups.filter(
        (item) => Number(item.id) !== Number(form.primaryMuscleGroupId)
      ),
    [form.primaryMuscleGroupId, muscleGroups]
  );

  const toggleSecondaryMuscle = (id: number) => {
    setForm((current) => ({
      ...current,
      secondaryMuscleGroupIds: current.secondaryMuscleGroupIds.includes(id)
        ? current.secondaryMuscleGroupIds.filter((item) => item !== id)
        : [...current.secondaryMuscleGroupIds, id],
    }));
  };

  const toggleEquipment = (id: number) => {
    setForm((current) => ({
      ...current,
      equipmentIds: current.equipmentIds.includes(id)
        ? current.equipmentIds.filter((item) => item !== id)
        : [...current.equipmentIds, id],
    }));
  };

  const submit = async () => {
    if (!form.name.trim()) {
      toast({
        title: "Exercise name is required",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    try {
      setSaving(true);

      const payload: FormState = {
        ...form,
        name: form.name.trim(),
        description: form.description?.trim() ?? "",
        instructions: form.instructions?.trim() ?? "",
        imageUrl: form.imageUrl?.trim() ?? "",
        videoUrl: form.videoUrl?.trim() ?? "",
      };

      if (isEdit) {
        await updateWorkoutExercise(Number(exerciseId), payload);
      } else {
        await createWorkoutExercise(payload);
      }

      toast({
        title: isEdit ? "Exercise updated" : "Exercise created",
        description: isEdit
          ? "The exercise has been updated successfully."
          : "The exercise is now available in the exercise library.",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      navigate("/staff/workouts/exercises");
    } catch (error: any) {
      console.error("Failed to save exercise:", error);

      toast({
        title: isEdit ? "Unable to update exercise" : "Unable to create exercise",
        description:
          error?.response?.data?.error ??
          error?.message ??
          "Please try again.",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!isEdit || !exerciseId) return;

    try {
      setDeleting(true);

      const deleted = await deleteWorkoutExercise(
        Number(exerciseId)
      );

      toast({
        title: "Exercise deleted",
        description:
          `${deleted?.name ?? form.name} has been removed from the exercise library.`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      setDeleteDialogOpen(false);
      navigate("/staff/workouts/exercises");
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


  if (loading) {
    return (
      <Flex minH="60vh" align="center" justify="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.400" />
          <Text fontSize="sm" color="gray.500">Loading exercise...</Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <>
    <Box maxW="1100px" mx="auto" px={{ base: 4, md: 6, xl: 8 }} py={{ base: 5, md: 8 }}>
      <HStack mb={6}>
        <Button
          variant="ghost"
          leftIcon={<FiArrowLeft />}
          borderRadius="xl"
          onClick={() => navigate("/staff/workouts/exercises")}
        >
          Exercise Library
        </Button>
      </HStack>

      <Box mb={7}>
        <Heading size={{ base: "lg", md: "xl" }} color="gray.800">
          {isEdit ? "Edit Exercise" : "Create Exercise"}
        </Heading>
        <Text mt={2} color="gray.500" lineHeight="1.7">
          Keep the exercise definition reusable and clean so it can be used across multiple workout templates.
        </Text>
      </Box>

      <VStack align="stretch" spacing={6}>
        <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
          <Heading size="sm" color="gray.800" mb={5}>Basic information</Heading>

          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={5}>
            <FormControl isRequired>
              <FormLabel fontSize="sm">Exercise name</FormLabel>
              <Input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="e.g. Dumbbell Biceps Curl"
                borderRadius="xl"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Difficulty</FormLabel>
              <Select
                value={form.difficulty ?? ""}
                onChange={(event) =>
                  setForm((current) => ({ ...current, difficulty: event.target.value }))
                }
                borderRadius="xl"
              >
                {DIFFICULTY_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item.charAt(0) + item.slice(1).toLowerCase()}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl gridColumn={{ base: "auto", md: "1 / -1" }}>
              <FormLabel fontSize="sm">Description</FormLabel>
              <Textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                placeholder="What does this exercise target?"
                borderRadius="xl"
                rows={3}
              />
            </FormControl>
          </Grid>
        </Box>

        <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
          <Heading size="sm" color="gray.800" mb={5}>Movement & tracking</Heading>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={5}>
            <FormControl>
              <FormLabel fontSize="sm">Movement pattern</FormLabel>
              <Select
                value={form.movementPattern ?? ""}
                onChange={(event) =>
                  setForm((current) => ({ ...current, movementPattern: event.target.value }))
                }
                placeholder="Select movement"
                borderRadius="xl"
              >
                {MOVEMENT_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item.replace(/_/g, " ")}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm">Tracking type</FormLabel>
              <Select
                value={form.trackingType}
                onChange={(event) =>
                  setForm((current) => ({ ...current, trackingType: event.target.value }))
                }
                borderRadius="xl"
              >
                {TRACKING_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm">Environment</FormLabel>
              <Select
                value={form.environment}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    environment: event.target.value as FormState["environment"],
                  }))
                }
                borderRadius="xl"
              >
                {ENVIRONMENT_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Box>

        <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
          <Heading size="sm" color="gray.800" mb={5}>Muscles & equipment</Heading>

          <FormControl mb={6}>
            <FormLabel fontSize="sm">Primary muscle</FormLabel>
            <Select
              value={form.primaryMuscleGroupId ?? ""}
              onChange={(event) => {
                const value = event.target.value ? Number(event.target.value) : null;
                setForm((current) => ({
                  ...current,
                  primaryMuscleGroupId: value,
                  secondaryMuscleGroupIds: value
                    ? current.secondaryMuscleGroupIds.filter((id) => id !== value)
                    : current.secondaryMuscleGroupIds,
                }));
              }}
              placeholder="Select primary muscle"
              borderRadius="xl"
            >
              {muscleGroups.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Select>
          </FormControl>

          <Text fontSize="sm" fontWeight="700" color="gray.700" mb={3}>
            Secondary muscles
          </Text>

          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={3} mb={7}>
            {secondaryMuscles.map((item) => (
              <Checkbox
                key={item.id}
                isChecked={form.secondaryMuscleGroupIds.includes(item.id)}
                onChange={() => toggleSecondaryMuscle(item.id)}
              >
                {item.name}
              </Checkbox>
            ))}
          </Grid>

          <Text fontSize="sm" fontWeight="700" color="gray.700" mb={3}>
            Equipment
          </Text>

          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={3}>
            {equipment.map((item) => (
              <Checkbox
                key={item.id}
                isChecked={form.equipmentIds.includes(item.id)}
                onChange={() => toggleEquipment(item.id)}
              >
                {item.name}
              </Checkbox>
            ))}
          </Grid>
        </Box>

        <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="2xl" p={{ base: 5, md: 6 }} boxShadow="0 6px 24px rgba(15, 23, 42, 0.035)">
          <Heading size="sm" color="gray.800" mb={5}>Instructions & media</Heading>

          <VStack align="stretch" spacing={5}>
            <FormControl>
              <FormLabel fontSize="sm">Instructions</FormLabel>
              <Textarea
                value={form.instructions}
                onChange={(event) =>
                  setForm((current) => ({ ...current, instructions: event.target.value }))
                }
                placeholder="Step-by-step instructions..."
                borderRadius="xl"
                rows={6}
              />
            </FormControl>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
              <FormControl>
                <FormLabel fontSize="sm">Image URL</FormLabel>
                <Input
                  value={form.imageUrl}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, imageUrl: event.target.value }))
                  }
                  placeholder="https://..."
                  borderRadius="xl"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Video URL</FormLabel>
                <Input
                  value={form.videoUrl}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, videoUrl: event.target.value }))
                  }
                  placeholder="https://..."
                  borderRadius="xl"
                />
              </FormControl>
            </Grid>
          </VStack>
        </Box>

        <Flex
          justify="space-between"
          align="center"
          gap={3}
          pb={4}
          direction={{ base: "column", sm: "row" }}
        >
          {isEdit ? (
            <Button
              alignSelf={{ base: "stretch", sm: "auto" }}
              variant="ghost"
              colorScheme="red"
              borderRadius="xl"
              leftIcon={<FiTrash2 />}
              onClick={() => setDeleteDialogOpen(true)}
              isDisabled={saving || deleting}
            >
              Delete Exercise
            </Button>
          ) : (
            <Box />
          )}

          <HStack
            spacing={3}
            width={{ base: "full", sm: "auto" }}
            justify="flex-end"
          >
            <Button
              variant="ghost"
              borderRadius="xl"
              onClick={() => navigate("/staff/workouts/exercises")}
              isDisabled={saving || deleting}
            >
              Cancel
            </Button>

            <Button
              colorScheme="blue"
              borderRadius="xl"
              leftIcon={<FiCheck />}
              isLoading={saving}
              onClick={submit}
              isDisabled={deleting}
            >
              {isEdit ? "Save Changes" : "Create Exercise"}
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Box>

      <AlertDialog
        isOpen={deleteDialogOpen}
        leastDestructiveRef={cancelDeleteRef}
        onClose={() => {
          if (!deleting) {
            setDeleteDialogOpen(false);
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
            Are you sure you want to remove <Text as="span" fontWeight="800">{form.name || "this exercise"}</Text> from the exercise library?

            <Text mt={3} fontSize="sm" color="gray.500">
              The exercise will be deactivated and will no longer appear in the library or be available for new workout templates. Existing templates that already use it will keep their reference.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter gap={3}>
            <Button
              ref={cancelDeleteRef}
              variant="ghost"
              borderRadius="xl"
              onClick={() => setDeleteDialogOpen(false)}
              isDisabled={deleting}
            >
              Cancel
            </Button>

            <Button
              colorScheme="red"
              borderRadius="xl"
              leftIcon={<FiTrash2 />}
              isLoading={deleting}
              onClick={() => void confirmDelete()}
            >
              Delete Exercise
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StaffWorkoutExerciseFormPage;

