// Version 1 : Working Version

// import {
//   Box,
//   Button,
//   Text,
//   VStack,
//   HStack,
//   SimpleGrid,
//   Input,
//   Badge,
//   Center,
//   Spinner,
//   useToast,
// } from "@chakra-ui/react";
// import { useEffect, useMemo, useState } from "react";
// import api from "../utils/api";
// import { useAuth } from "../context/AuthContext";

// const GOALS = [
//   { id: "fat_loss", icon: "🔥", title: "Fat Loss", description: "Burn body fat while preserving muscle" },
//   { id: "weight_loss", icon: "⚖️", title: "Weight Loss", description: "Reduce overall body weight" },
//   { id: "lean_muscle_gain", icon: "💪", title: "Lean Muscle Gain", description: "Build muscle with minimal fat gain" },
//   { id: "bulk_up", icon: "🏋️", title: "Bulk Up", description: "Aggressive muscle growth" },
//   { id: "strength_gain", icon: "🧱", title: "Strength Gain", description: "Increase power and performance" },
//   { id: "maintenance", icon: "🎯", title: "Maintenance", description: "Maintain current physique" },
//   { id: "healthy_lifestyle", icon: "❤️", title: "Healthy Lifestyle", description: "General wellness" },
//   { id: "athletic_performance", icon: "🏃", title: "Athletic Performance", description: "Improve endurance and recovery" },
// ];


// const ACTIVITIES = [
//   {
//     id: "sedentary",
//     icon: "🪑",
//     title: "Low Activity",
//     description:
//       "Office job, little exercise, less than 5,000 steps/day",
//   },

//   {
//     id: "moderate",
//     icon: "🚶",
//     title: "Moderate",
//     description:
//       "Walking regularly, gym 2-3 times/week, 5k-10k steps/day",
//   },

//   {
//     id: "active",
//     icon: "🏃",
//     title: "Active",
//     description:
//       "Gym 4-6 times/week, sports, 10k+ steps/day",
//   },

//   {
//     id: "athlete",
//     icon: "🏋️",
//     title: "Athlete",
//     description:
//       "Intense training, competitive sports, daily workouts",
//   },
// ];


// const FOOD_PREFERENCES = [
//   {
//     id: "veg",
//     icon: "🥗",
//     title: "Vegetarian",
//     description:
//       "Receive only vegetarian meal recommendations",
//   },
//   {
//     id: "eggetarian",
//     icon: "🥚",
//     title: "Eggetarian",
//     description:
//       "Receive vegetarian and egg-based meal recommendations",
//   },
//   {
//     id: "nonveg",
//     icon: "🍗",
//     title: "Non-Vegetarian",
//     description:
//       "Receive vegetarian, egg and non-vegetarian meal recommendations",
//   },
// ];

// const GoalSetup = () => {
//   const { user } = useAuth();
//   const toast = useToast();

//   const [loading, setLoading] = useState(true);
//   const [goal, setGoal] = useState<any>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [savingGoal, setSavingGoal] = useState(false);

// const [goalSaved, setGoalSaved] = useState(false);
// const [goalSaveError, setGoalSaveError] = useState(false);

// //   const loadingMessages = [
// //   "🔍 Analysing body metrics...",
// //   "⚡ Calculating calorie targets...",
// //   "💪 Optimizing protein intake...",
// //   "🥗 Creating macro plan...",
// //   "🎯 Finalizing your goal..."
// // ];



//   const [form, setForm] = useState({
//     height: "",
//     weight: "",
//     gender: "male",
//     goal: "lean_muscle_gain",
//     foodPreference: "eggetarian",
//     activity: "moderate",
//     targetWeight: "",
//     duration: "",
//   });

//   const fetchGoal = async () => {
//     try {
//       const res = await api.get("/profile/active/me");
//       setGoal(res.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!user) return;
//     setForm((p) => ({ ...p, gender: user.gender || "male" }));
//     fetchGoal();
//   }, [user]);

//   const handleDeleteGoal = async () => {
//     await api.delete("/profile/active");
//     setGoal(null);
//     toast({ title: "Goal removed", status: "success" });
//   };

// const handleSubmit = async () => {
//   try {
//     setSavingGoal(true);
//     setGoalSaveError(false);

//     await api.post("/profile", {
//       height_cm: Number(form.height),
//       weight_kg: Number(form.weight),
//       gender: form.gender,
//       goal_type: form.goal,
//       food_preference: form.foodPreference,
//       activity_level: form.activity,
//       target_weight: Number(form.targetWeight) || null,
//       duration_days: Number(form.duration) || null,
//       userId: user.id,
//     });

//     await fetchGoal();

//     setGoalSaved(true);

//     setTimeout(() => {
//       setGoalSaved(false);
//       setShowForm(false);
//     }, 2000);

//   } catch (err) {
//     setGoalSaveError(true);
//   } finally {
//     setSavingGoal(false);
//   }
// };

//   const proteinPreview = useMemo(() => {
//     const weight = Number(form.weight || 0);
//     if (!weight) return 0;
//     return Math.round(weight * 2);
//   }, [form.weight]);

//   if (loading) {
//     return (
//       <Center h="80vh">
//         <Spinner size="xl" />
//       </Center>
//     );
//   }

//   const GOAL_EXPLANATION:any = {

//   fat_loss:
//     "Burn fat while preserving muscle.",

//   weight_loss:
//     "Reduce overall body weight.",

//   lean_muscle_gain:
//     "Build muscle with minimal fat gain.",

//   bulk_up:
//     "Aggressive calorie surplus for muscle growth.",

//   strength_gain:
//     "Focus on strength and power.",

//   maintenance:
//     "Maintain current physique.",

//   healthy_lifestyle:
//     "Long-term health and wellness.",

//   athletic_performance:
//     "Improve endurance and recovery."

// };

//   return (
//     <>



//     <Box minH="100vh" bg="gray.50" p={4}>

// {savingGoal && (
//   <Center
//     position="fixed"
//     top={0}
//     left={0}
//     w="100vw"
//     h="100vh"
//     bg="rgba(0,0,0,0.55)"
//     backdropFilter="blur(10px)"
//     zIndex={9999}
//   >
//     <Box
//       bg="white"
//       p={8}
//       borderRadius="3xl"
//       textAlign="center"
//       w="90%"
//       maxW="350px"
//       boxShadow="2xl"
//     >
//       <Text fontSize="5xl">
//         💪
//       </Text>

//       <Text
//         fontSize="xl"
//         fontWeight="bold"
//         mt={3}
//       >
//         Building Your Nutrition Plan
//       </Text>

//       <Text
//         mt={3}
//         color="gray.600"
//       >
//         Calculating calories, macros and protein targets...
//       </Text>

//       <Spinner
//         size="xl"
//         mt={6}
//       />
//     </Box>
//   </Center>
// )}

// {goalSaved && (
//   <Center
//     position="fixed"
//     top={0}
//     left={0}
//     w="100vw"
//     h="100vh"
//     bg="rgba(0,0,0,0.45)"
//     backdropFilter="blur(10px)"
//     zIndex={9999}
//   >
//     <Box
//       bg="white"
//       p={8}
//       borderRadius="3xl"
//       textAlign="center"
//       w="90%"
//       maxW="350px"
//     >
//       <Text fontSize="5xl">
//         ✅
//       </Text>

//       <Text
//         mt={3}
//         fontWeight="bold"
//         fontSize="xl"
//       >
//         Goal Created Successfully
//       </Text>

//       <Text mt={3}>
//         Calories Target Ready
//       </Text>

//       <Text>
//         Protein Target Ready
//       </Text>

//       <Text>
//         Personalized Nutrition Plan Ready
//       </Text>
//     </Box>
//   </Center>
// )}

// {goalSaveError && (
//   <Center
//     position="fixed"
//     top={0}
//     left={0}
//     w="100vw"
//     h="100vh"
//     bg="rgba(0,0,0,0.45)"
//     backdropFilter="blur(10px)"
//     zIndex={9999}
//   >
//     <Box
//       bg="white"
//       p={8}
//       borderRadius="3xl"
//       textAlign="center"
//       w="90%"
//       maxW="350px"
//     >
//       <Text fontSize="5xl">
//         ❌
//       </Text>

//       <Text
//         mt={3}
//         fontWeight="bold"
//         fontSize="xl"
//       >
//         Unable To Save Goal, Make sure you have filled all the required fields
//       </Text>

//       <Text
//         mt={3}
//         color="gray.600"
//       >
//         Please try again
//       </Text>

//       <Button
//         mt={5}
//         colorScheme="blue"
//         onClick={() => setGoalSaveError(false)}
//       >
//         Close
//       </Button>
//     </Box>
//   </Center>
// )}

//       <VStack maxW="800px" mx="auto" spacing={6}>

//         <Box
//           w="100%"
//           p={6}
//           borderRadius="3xl"
//           bgGradient="linear(to-r, brand.500, brand.700)"
//           color="white"
//         >
//           <Text fontSize="3xl" fontWeight="bold">
//             🔥 Transform Your Body
//           </Text>

//           <Text mt={2}>
//             Personalized nutrition goals powered by NEKA
//           </Text>
//         </Box>

//         <Box
//           w="100%"
//           bg="white"
//           borderRadius="3xl"
//           p={5}
//           boxShadow="md"
//         >
//           {!goal ? (
//             <VStack>
//               <Text fontWeight="bold">No Active Goal</Text>
//               <Text color="gray.500">
//                 Set your first goal to unlock personalized meal plans.
//               </Text>
//             </VStack>
//           ) : (
//             <>
//               <HStack justify="space-between">
//                 <Text fontWeight="bold">Active Goal 🎯</Text>
//                 <Badge colorScheme="green">ACTIVE</Badge>
//               </HStack>

// <Text
//   mt={3}
//   fontWeight="bold"
//   fontSize="xl"
// >
//   {goal.goal_type
//     ?.replaceAll("_"," ")
//     ?.toUpperCase()}
// </Text>

// <Text
//   mt={2}
//   color="gray.500"
// >
//   {
//     GOAL_EXPLANATION[
//       goal.goal_type
//     ]
//   }
// </Text>

// <Box
//   mt={5}
//   p={4}
//   borderRadius="2xl"
//   bg="blue.50"
// >
//   <Text
//     fontSize="sm"
//     color="gray.600"
//   >
//     Your Transformation
//   </Text>

//   <Text
//     fontSize="3xl"
//     fontWeight="bold"
//     mt={1}
//   >
//     {goal.weight_kg}kg
//     {" ➜ "}
//     {goal.target_weight || goal.weight_kg}kg
//   </Text>

//   <Text
//     fontSize="sm"
//     mt={2}
//     color="gray.600"
//   >
//     Duration:
//     {" "}
//     {goal.duration_days || "-"}
//     {" "}
//     days
//   </Text>

//   <Text
//     fontSize="sm"
//     mt={2}
//     color="gray.600"
//   >
//     Activity Level:
//     {" "}
//     {goal.activity_level
//       ?.replace("_"," ")
//       ?.toUpperCase()}
//   </Text>

// </Box>

//               <SimpleGrid columns={2} spacing={3} mt={4}>
//                 <Box bg="blue.50" p={3} borderRadius="xl">
//                   <Text>🔥 Calories</Text>
//                   <Text fontWeight="bold">{goal.target_calories}</Text>
//                 </Box>

//                 <Box bg="blue.50" p={3} borderRadius="xl">
//                   <Text>💪 Protein</Text>
//                   <Text fontWeight="bold">{goal.protein_target}g</Text>
//                 </Box>

//                 <Box bg="blue.50" p={3} borderRadius="xl">
//                   <Text>🍚 Carbs</Text>
//                   <Text fontWeight="bold">{goal.carbs_target}g</Text>
//                 </Box>

//                 <Box bg="blue.50" p={3} borderRadius="xl">
//                   <Text>🥑 Fats</Text>
//                   <Text fontWeight="bold">{goal.fats_target}g</Text>
//                 </Box>
//               </SimpleGrid>

//               <Button
//                 mt={4}
//                 size="sm"
//                 colorScheme="red"
//                 variant="ghost"
//                 onClick={handleDeleteGoal}
//               >
//                 Reset Goal
//               </Button>
//             </>
//           )}
//         </Box>

//         <Button
//           w="100%"
//           colorScheme="blue"
//           borderRadius="full"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close" : "Create New Goal"}
//         </Button>

//         {showForm && (
//           <Box w="100%" bg="white" p={5} borderRadius="3xl">
//             <Text fontWeight="bold" mb={3}>
//               Gender
//             </Text>

//             <HStack>
//               <Button
//                 flex={1}
//                 colorScheme={form.gender === "male" ? "blue" : "gray"}
//                 onClick={() => setForm((p) => ({ ...p, gender: "male" }))}
//               >
//                 👨 Male
//               </Button>

//               <Button
//                 flex={1}
//                 colorScheme={form.gender === "female" ? "blue" : "gray"}
//                 onClick={() => setForm((p) => ({ ...p, gender: "female" }))}
//               >
//                 👩 Female
//               </Button>
//             </HStack>

//             <Text fontWeight="bold" mt={6} mb={3}>
//               Select Goal
//             </Text>

//             <SimpleGrid columns={[1, 2]} spacing={3}>
//               {GOALS.map((g) => (
//                 <Box
//                   key={g.id}
//                   p={4}
//                   borderRadius="2xl"
//                   cursor="pointer"
//                   border={form.goal === g.id ? "2px solid #3182ce" : "1px solid #E2E8F0"}
//                   onClick={() => setForm((p) => ({ ...p, goal: g.id }))}
//                 >
//                   <Text fontSize="2xl">{g.icon}</Text>
//                   <Text fontWeight="bold">{g.title}</Text>
//                   <Text fontSize="xs" color="gray.500">
//                     {g.description}
//                   </Text>
//                 </Box>
//               ))}
//             </SimpleGrid>

//             <Text fontWeight="bold" mt={6} mb={3}>
//               Activity Level
//             </Text>

// <SimpleGrid
//   columns={[1,2]}
//   spacing={3}
// >
//   {ACTIVITIES.map((a) => (

//     <Box
//       key={a.id}
//       p={4}
//       borderRadius="2xl"
//       cursor="pointer"
//       bg={
//         form.activity === a.id
//           ? "blue.50"
//           : "white"
//       }
//       border={
//         form.activity === a.id
//           ? "2px solid"
//           : "1px solid"
//       }
//       borderColor={
//         form.activity === a.id
//           ? "blue.400"
//           : "gray.200"
//       }
//       onClick={() =>
//         setForm((p:any) => ({
//           ...p,
//           activity:a.id
//         }))
//       }
//     >
//       <Text
//         fontSize="2xl"
//       >
//         {a.icon}
//       </Text>

//       <Text
//         fontWeight="bold"
//         mt={2}
//       >
//         {a.title}
//       </Text>

//       <Text
//         mt={2}
//         fontSize="xs"
//         color="gray.500"
//       >
//         {a.description}
//       </Text>

//     </Box>

//   ))}
// </SimpleGrid>

// <Text fontWeight="bold" mt={6} mb={3}>
//   Food Preference
// </Text>

// <SimpleGrid columns={[1, 3]} spacing={3}>
//   {FOOD_PREFERENCES.map((food) => (
//     <Box
//       key={food.id}
//       p={4}
//       borderRadius="2xl"
//       cursor="pointer"
//       bg={
//         form.foodPreference === food.id
//           ? "blue.50"
//           : "white"
//       }
//       border={
//         form.foodPreference === food.id
//           ? "2px solid"
//           : "1px solid"
//       }
//       borderColor={
//         form.foodPreference === food.id
//           ? "blue.400"
//           : "gray.200"
//       }
//       onClick={() =>
//         setForm((p:any) => ({
//           ...p,
//           foodPreference: food.id
//         }))
//       }
//     >
//       <Text fontSize="2xl">
//         {food.icon}
//       </Text>

//       <Text
//         fontWeight="bold"
//         mt={2}
//       >
//         {food.title}
//       </Text>

//       <Text
//         mt={2}
//         fontSize="xs"
//         color="gray.500"
//       >
//         {food.description}
//       </Text>
//     </Box>
//   ))}
// </SimpleGrid>

//             <SimpleGrid columns={2} spacing={3} mt={6}>
//               <Input
//                 placeholder="Height (cm)"
//                 value={form.height}
//                 onChange={(e) => setForm((p) => ({ ...p, height: e.target.value }))}
//               />

//               <Input
//                 placeholder="Weight (kg)"
//                 value={form.weight}
//                 onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))}
//               />
//             </SimpleGrid>

//             {form.goal !== "maintenance" && (
//               <SimpleGrid columns={2} spacing={3} mt={4}>
//                 <Input
//                   placeholder="Target Weight"
//                   value={form.targetWeight}
//                   onChange={(e) => setForm((p) => ({ ...p, targetWeight: e.target.value }))}
//                 />

//                 <Input
//                   placeholder="Duration Days"
//                   value={form.duration}
//                   onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
//                 />
//               </SimpleGrid>
//             )}

//             <Box mt={6} p={4} bg="blue.50" borderRadius="2xl">
//               <Text fontWeight="bold">
//                 Estimated Protein Target
//               </Text>

//               <Text fontSize="2xl">
//                 💪 {proteinPreview}g
//               </Text>
//             </Box>

//             {savingGoal && (
//   <Box
//     mt={4}
//     p={4}
//     bg="green.50"
//     borderRadius="xl"
//     textAlign="center"
//   >
//     <Spinner size="sm" mr={2} />
//     <Text fontWeight="bold">
//       Calculating your calories, macros & protein targets...
//     </Text>
//   </Box>
// )}

//         <Button
//           mt={6}
//           w="100%"
//           colorScheme="blue"
//           size="lg"
//           onClick={handleSubmit}
//           // isLoading={savingGoal}
//           // loadingText="Creating your plan..."
//           isDisabled={savingGoal}
//         >
//           Save Goal 🚀
//         </Button>
//           </Box>
//         )}
//       </VStack>
//     </Box>
//     </>
//   );
// };

// export default GoalSetup;



// Version 2 : Custom Goal Logic Addition

import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Input,
  Badge,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

import GoalModeSelector from "../components/Profile/GoalModeSelector";
import CustomMacroSection from "../components/Profile/CustomMacroSection";

import {
    GOALS,
    ACTIVITIES
} from "../constants/goal.constants";

// const GOALS = [
//   { id: "fat_loss", icon: "🔥", title: "Fat Loss", description: "Burn body fat while preserving muscle" },
//   { id: "weight_loss", icon: "⚖️", title: "Weight Loss", description: "Reduce overall body weight" },
//   { id: "lean_muscle_gain", icon: "💪", title: "Lean Muscle Gain", description: "Build muscle with minimal fat gain" },
//   { id: "bulk_up", icon: "🏋️", title: "Bulk Up", description: "Aggressive muscle growth" },
//   { id: "strength_gain", icon: "🧱", title: "Strength Gain", description: "Increase power and performance" },
//   { id: "maintenance", icon: "🎯", title: "Maintenance", description: "Maintain current physique" },
//   { id: "healthy_lifestyle", icon: "❤️", title: "Healthy Lifestyle", description: "General wellness" },
//   { id: "athletic_performance", icon: "🏃", title: "Athletic Performance", description: "Improve endurance and recovery" },
// ];


// const ACTIVITIES = [
//   {
//     id: "sedentary",
//     icon: "🪑",
//     title: "Low Activity",
//     description:
//       "Office job, little exercise, less than 5,000 steps/day",
//   },

//   {
//     id: "moderate",
//     icon: "🚶",
//     title: "Moderate",
//     description:
//       "Walking regularly, gym 2-3 times/week, 5k-10k steps/day",
//   },

//   {
//     id: "active",
//     icon: "🏃",
//     title: "Active",
//     description:
//       "Gym 4-6 times/week, sports, 10k+ steps/day",
//   },

//   {
//     id: "athlete",
//     icon: "🏋️",
//     title: "Athlete",
//     description:
//       "Intense training, competitive sports, daily workouts",
//   },
// ];


const FOOD_PREFERENCES = [
  {
    id: "veg",
    icon: "🥗",
    title: "Vegetarian",
    description:
      "Receive only vegetarian meal recommendations",
  },
  {
    id: "eggetarian",
    icon: "🥚",
    title: "Eggetarian",
    description:
      "Receive vegetarian and egg-based meal recommendations",
  },
  {
    id: "nonveg",
    icon: "🍗",
    title: "Non-Vegetarian",
    description:
      "Receive vegetarian, egg and non-vegetarian meal recommendations",
  },
];

const GoalSetup = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [savingGoal, setSavingGoal] = useState(false);

const [goalSaved, setGoalSaved] = useState(false);
const [goalSaveError, setGoalSaveError] = useState(false);

const [goalMode, setGoalMode] = useState<"SMART" | "CUSTOM">("SMART");

//   const loadingMessages = [
//   "🔍 Analysing body metrics...",
//   "⚡ Calculating calorie targets...",
//   "💪 Optimizing protein intake...",
//   "🥗 Creating macro plan...",
//   "🎯 Finalizing your goal..."
// ];



  const [form, setForm] = useState({
    height: "",
    weight: "",
    gender: "male",
    goal: "lean_muscle_gain",
    foodPreference: "eggetarian",
    activity: "moderate",
    targetWeight: "",
    duration: "",
    target_calories:"",
    protein_target:"",
    carbs_target:"",
    fats_target:"",
  });

  const fetchGoal = async () => {
    try {
      const res = await api.get("/profile/active/me");
      setGoal(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    setForm((p) => ({ ...p, gender: user.gender || "male" }));
    fetchGoal();
  }, [user]);


  useEffect(() => {

  if (goalMode === "SMART") {

    setForm(prev => ({

      ...prev,

      goal:
        prev.goal ||
        "lean_muscle_gain",

      activity:
        prev.activity ||
        "moderate",

      target_calories: "",

      protein_target: "",

      carbs_target: "",

      fats_target: ""

    }));

  } else {

    setForm(prev => ({

      ...prev,

      goal: "",

      activity: ""

    }));

  }

}, [goalMode]);



  const handleDeleteGoal = async () => {
    await api.delete("/profile/active");
    setGoal(null);
    toast({ title: "Goal removed", status: "success" });
  };

const handleSubmit = async () => {
  try {

    if (goalMode === "CUSTOM") {

  if (

    !form.target_calories ||

    !form.protein_target ||

    !form.carbs_target ||

    !form.fats_target

  ) {

    toast({

      title:
        "Please enter all nutrition targets.",

      status: "warning"

    });

    return;

  }

}
    setSavingGoal(true);
    setGoalSaveError(false);

    // await api.post("/profile", {
    //   height_cm: Number(form.height),
    //   weight_kg: Number(form.weight),
    //   gender: form.gender,
    //   goal_type: form.goal,
    //   food_preference: form.foodPreference,
    //   activity_level: form.activity,
    //   target_weight: Number(form.targetWeight) || null,
    //   duration_days: Number(form.duration) || null,
    //   userId: user.id,
    // });

const payload: any = {

  userId: user.id,

  height_cm: Number(form.height),

  weight_kg: Number(form.weight),

  gender: form.gender,

  food_preference: form.foodPreference,

  target_weight:
    Number(form.targetWeight) || null,

  duration_days:
    Number(form.duration) || null,

  goal_mode: goalMode,

  target_source:
    goalMode === "SMART"
      ? "NEKA"
      : "USER"

};

if (goalMode === "SMART") {

  payload.goal_type =
    form.goal;

  payload.activity_level =
    form.activity;

} else {

  payload.goal_type =
    "custom";

  payload.activity_level =
    null;

  payload.target_calories =
    Number(
      form.target_calories
    );

  payload.protein_target =
    Number(
      form.protein_target
    );

  payload.carbs_target =
    Number(
      form.carbs_target
    );

  payload.fats_target =
    Number(
      form.fats_target
    );

}

await api.post(
  "/profile",
  payload
);

    await fetchGoal();

    setGoalSaved(true);

    setTimeout(() => {
      setGoalSaved(false);
      setShowForm(false);
    }, 2000);

  } catch (err) {
    setGoalSaveError(true);
  } finally {
    setSavingGoal(false);
  }
};

  const proteinPreview = useMemo(() => {
    const weight = Number(form.weight || 0);
    if (!weight) return 0;
    return Math.round(weight * 2);
  }, [form.weight]);

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const GOAL_EXPLANATION:any = {

  fat_loss:
    "Burn fat while preserving muscle.",

  weight_loss:
    "Reduce overall body weight.",

  lean_muscle_gain:
    "Build muscle with minimal fat gain.",

  bulk_up:
    "Aggressive calorie surplus for muscle growth.",

  strength_gain:
    "Focus on strength and power.",

  maintenance:
    "Maintain current physique.",

  healthy_lifestyle:
    "Long-term health and wellness.",

  athletic_performance:
    "Improve endurance and recovery."

};

  return (
    <>



    <Box minH="100vh" bg="gray.50" p={4}>

{savingGoal && (
  <Center
    position="fixed"
    top={0}
    left={0}
    w="100vw"
    h="100vh"
    bg="rgba(0,0,0,0.55)"
    backdropFilter="blur(10px)"
    zIndex={9999}
  >
    <Box
      bg="white"
      p={8}
      borderRadius="3xl"
      textAlign="center"
      w="90%"
      maxW="350px"
      boxShadow="2xl"
    >
      <Text fontSize="5xl">
        💪
      </Text>

      <Text
        fontSize="xl"
        fontWeight="bold"
        mt={3}
      >
        Building Your Nutrition Plan
      </Text>

      <Text
        mt={3}
        color="gray.600"
      >
        Calculating calories, macros and protein targets...
      </Text>

      <Spinner
        size="xl"
        mt={6}
      />
    </Box>
  </Center>
)}

{goalSaved && (
  <Center
    position="fixed"
    top={0}
    left={0}
    w="100vw"
    h="100vh"
    bg="rgba(0,0,0,0.45)"
    backdropFilter="blur(10px)"
    zIndex={9999}
  >
    <Box
      bg="white"
      p={8}
      borderRadius="3xl"
      textAlign="center"
      w="90%"
      maxW="350px"
    >
      <Text fontSize="5xl">
        ✅
      </Text>

      {/* <Text
        mt={3}
        fontWeight="bold"
        fontSize="xl"
      >
        Goal Created Successfully
      </Text> */}

      <Text
mt={3}
fontWeight="bold"
fontSize="xl"
>

{

goalMode==="SMART"

?

"Smart Goal Created"

:

"Custom Goal Created"

}

</Text>

      <Text
        mt={3}
        fontWeight="bold"
        fontSize="xl"
      >
        {goalMode === "SMART"
          ? "Smart Goal Created"
          : "Custom Goal Created"}
      </Text>

{

goalMode==="SMART"

?

<>

<Text mt={3}>

Calories Target Ready

</Text>

<Text>

Protein Target Ready

</Text>

<Text>

Personalized Nutrition Plan Ready

</Text>

</>

:

<>

<Text mt={3}>

Nutrition Targets Saved

</Text>

<Text>

Meal Planner Updated

</Text>

<Text>

Dashboard Ready

</Text>

</>

}
    </Box>
  </Center>
)}

{goalSaveError && (
  <Center
    position="fixed"
    top={0}
    left={0}
    w="100vw"
    h="100vh"
    bg="rgba(0,0,0,0.45)"
    backdropFilter="blur(10px)"
    zIndex={9999}
  >
    <Box
      bg="white"
      p={8}
      borderRadius="3xl"
      textAlign="center"
      w="90%"
      maxW="350px"
    >
      <Text fontSize="5xl">
        ❌
      </Text>

      <Text
        mt={3}
        fontWeight="bold"
        fontSize="xl"
      >
        Unable To Save Goal, Make sure you have filled all the required fields
      </Text>

      <Text
        mt={3}
        color="gray.600"
      >
        Please try again
      </Text>

      <Button
        mt={5}
        colorScheme="blue"
        onClick={() => setGoalSaveError(false)}
      >
        Close
      </Button>
    </Box>
  </Center>
)}

      <VStack maxW="800px" mx="auto" spacing={6}>

        <Box
          w="100%"
          p={6}
          borderRadius="3xl"
          bgGradient="linear(to-r, brand.500, brand.700)"
          color="white"
        >
          <Text fontSize="3xl" fontWeight="bold">
            🔥 Transform Your Body
          </Text>

          <Text mt={2}>
            Personalized nutrition goals powered by NEKA
          </Text>
        </Box>



        <Box
          w="100%"
          bg="white"
          borderRadius="3xl"
          p={5}
          boxShadow="md"
        >
          {!goal ? (
            <VStack>
              <Text fontWeight="bold">No Active Goal</Text>
              <Text color="gray.500">
                Set your first goal to unlock personalized meal plans.
              </Text>
            </VStack>
          ) : (
            <>
              <HStack justify="space-between">
                <Text fontWeight="bold">Active Goal 🎯</Text>
                <Badge colorScheme="green">ACTIVE</Badge>
              </HStack>

<Text
  mt={3}
  fontWeight="bold"
  fontSize="xl"
>
  {goal.goal_type
    ?.replaceAll("_"," ")
    ?.toUpperCase()}
</Text>

<Text
  mt={2}
  color="gray.500"
>
  {
    GOAL_EXPLANATION[
      goal.goal_type
    ]
  }
</Text>

<Box
  mt={5}
  p={4}
  borderRadius="2xl"
  bg="blue.50"
>
  <Text
    fontSize="sm"
    color="gray.600"
  >
    Your Transformation
  </Text>

  <Text
    fontSize="3xl"
    fontWeight="bold"
    mt={1}
  >
    {goal.weight_kg}kg
    {" ➜ "}
    {goal.target_weight || goal.weight_kg}kg
  </Text>

  <Text
    fontSize="sm"
    mt={2}
    color="gray.600"
  >
    Duration:
    {" "}
    {goal.duration_days || "-"}
    {" "}
    days
  </Text>

  <Text
    fontSize="sm"
    mt={2}
    color="gray.600"
  >
    Activity Level:
    {" "}
    {goal.activity_level
      ?.replace("_"," ")
      ?.toUpperCase()}
  </Text>

</Box>

              <SimpleGrid columns={2} spacing={3} mt={4}>
                <Box bg="blue.50" p={3} borderRadius="xl">
                  <Text>🔥 Calories</Text>
                  <Text fontWeight="bold">{goal.target_calories}</Text>
                </Box>

                <Box bg="blue.50" p={3} borderRadius="xl">
                  <Text>💪 Protein</Text>
                  <Text fontWeight="bold">{goal.protein_target}g</Text>
                </Box>

                <Box bg="blue.50" p={3} borderRadius="xl">
                  <Text>🍚 Carbs</Text>
                  <Text fontWeight="bold">{goal.carbs_target}g</Text>
                </Box>

                <Box bg="blue.50" p={3} borderRadius="xl">
                  <Text>🥑 Fats</Text>
                  <Text fontWeight="bold">{goal.fats_target}g</Text>
                </Box>
              </SimpleGrid>

              <Button
                mt={4}
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={handleDeleteGoal}
              >
                Reset Goal
              </Button>
            </>
          )}
        </Box>

        <Button
          w="100%"
          colorScheme="blue"
          borderRadius="full"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Create New Goal"}
        </Button>

        {showForm && (

          <>
                  <GoalModeSelector
    value={goalMode}
    onChange={setGoalMode}
/>
          <Box w="100%" bg="white" p={5} borderRadius="3xl">
            <Text fontWeight="bold" mb={3}>
              Gender
            </Text>

            <HStack>
              <Button
                flex={1}
                colorScheme={form.gender === "male" ? "blue" : "gray"}
                onClick={() => setForm((p) => ({ ...p, gender: "male" }))}
              >
                👨 Male
              </Button>

              <Button
                flex={1}
                colorScheme={form.gender === "female" ? "blue" : "gray"}
                onClick={() => setForm((p) => ({ ...p, gender: "female" }))}
              >
                👩 Female
              </Button>
            </HStack>

            {goalMode === "SMART" && (
            <>
            <Text fontWeight="bold" mt={6} mb={3}>
              Select Goal
            </Text>

            <SimpleGrid columns={[1, 2]} spacing={3}>
              {GOALS.map((g) => (
                <Box
                  key={g.id}
                  p={4}
                  borderRadius="2xl"
                  cursor="pointer"
                  border={form.goal === g.id ? "2px solid #3182ce" : "1px solid #E2E8F0"}
                  onClick={() => setForm((p) => ({ ...p, goal: g.id }))}
                >
                  <Text fontSize="2xl">{g.icon}</Text>
                  <Text fontWeight="bold">{g.title}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {g.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            </>
            )}
          
          {goalMode === "SMART" && (
            <>
            <Text fontWeight="bold" mt={6} mb={3}>
              Activity Level
            </Text>

<SimpleGrid
  columns={[1,2]}
  spacing={3}
>
  {ACTIVITIES.map((a) => (

    <Box
      key={a.id}
      p={4}
      borderRadius="2xl"
      cursor="pointer"
      bg={
        form.activity === a.id
          ? "blue.50"
          : "white"
      }
      border={
        form.activity === a.id
          ? "2px solid"
          : "1px solid"
      }
      borderColor={
        form.activity === a.id
          ? "blue.400"
          : "gray.200"
      }
      onClick={() =>
        setForm((p:any) => ({
          ...p,
          activity:a.id
        }))
      }
    >
      <Text
        fontSize="2xl"
      >
        {a.icon}
      </Text>

      <Text
        fontWeight="bold"
        mt={2}
      >
        {a.title}
      </Text>

      <Text
        mt={2}
        fontSize="xs"
        color="gray.500"
      >
        {a.description}
      </Text>

    </Box>

  ))}
</SimpleGrid>
   </>
 )}

<Text fontWeight="bold" mt={6} mb={3}>
  Food Preference
</Text>

<SimpleGrid columns={[1, 3]} spacing={3}>
  {FOOD_PREFERENCES.map((food) => (
    <Box
      key={food.id}
      p={4}
      borderRadius="2xl"
      cursor="pointer"
      bg={
        form.foodPreference === food.id
          ? "blue.50"
          : "white"
      }
      border={
        form.foodPreference === food.id
          ? "2px solid"
          : "1px solid"
      }
      borderColor={
        form.foodPreference === food.id
          ? "blue.400"
          : "gray.200"
      }
      onClick={() =>
        setForm((p:any) => ({
          ...p,
          foodPreference: food.id
        }))
      }
    >
      <Text fontSize="2xl">
        {food.icon}
      </Text>

      <Text
        fontWeight="bold"
        mt={2}
      >
        {food.title}
      </Text>

      <Text
        mt={2}
        fontSize="xs"
        color="gray.500"
      >
        {food.description}
      </Text>
    </Box>
  ))}
</SimpleGrid>

            <SimpleGrid columns={2} spacing={3} mt={6}>
              <Input
                placeholder="Height (cm)"
                value={form.height}
                onChange={(e) => setForm((p) => ({ ...p, height: e.target.value }))}
              />

              <Input
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))}
              />
            </SimpleGrid>

           {/* {goalMode === "SMART" && form.goal !== "maintenance" && ( */}
              <SimpleGrid columns={2} spacing={3} mt={4}>
                <Input
                  placeholder="Target Weight"
                  value={form.targetWeight}
                  onChange={(e) => setForm((p) => ({ ...p, targetWeight: e.target.value }))}
                />

                <Input
                  placeholder="Duration Days"
                  value={form.duration}
                  onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
                />
              </SimpleGrid>
            {/* )} */}

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

form.fats_target

}}

onChange={(field,value)=>

setForm(prev=>({

...prev,

[field]:value

}))

}

/>

)}

            {goalMode === "SMART" && (
            <Box mt={6} p={4} bg="blue.50" borderRadius="2xl">
              <Text fontWeight="bold">
                Estimated Protein Target
              </Text>

              <Text fontSize="2xl">
                💪 {proteinPreview}g
              </Text>
            </Box>
            )}
            {savingGoal && (
  <Box
    mt={4}
    p={4}
    bg="green.50"
    borderRadius="xl"
    textAlign="center"
  >
    <Spinner size="sm" mr={2} />
    <Text fontWeight="bold">
      Calculating your calories, macros & protein targets...
    </Text>
  </Box>
)}

        <Button
          mt={6}
          w="100%"
          colorScheme="blue"
          size="lg"
          onClick={handleSubmit}
          // isLoading={savingGoal}
          // loadingText="Creating your plan..."
          isDisabled={savingGoal}
        >
         {goalMode==="SMART"
        ?"Create Smart Goal 🚀"
        :"Create Custom Goal 🚀"}
        </Button>
          </Box>
          </>
        )}
        
      </VStack>
    </Box>
    </>
  );
};

export default GoalSetup;

