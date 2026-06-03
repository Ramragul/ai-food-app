// Version 1 :

// import {
//   Box,
//   Input,
//   Button,
//   Text,
//   VStack,
//   HStack,
//   Badge,
//   Collapse,
//   useDisclosure,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem
// } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import api from "../utils/api";
// import { useAuth } from "../context/AuthContext";

// const GoalSetup = () => {
//   const { user } = useAuth();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

 

//   const [form, setForm] = useState<any>({
//     height: "",
//     weight: "",
//     gender: "male",
//     goal: "weight_loss",
//     activity: "moderate",
//     targetWeight: "",
//     duration: ""
//   });

//   const [goal, setGoal] = useState<any>(null);

//   const { isOpen: showForm, onToggle: toggleForm } = useDisclosure();

//   // 🔥 FETCH ACTIVE GOAL
//   const fetchGoal = async () => {
//     try {
//       const res = await api.get("/profile/active/me");
//       setGoal(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔥 INIT USER DATA
//   useEffect(() => {
//     if (!user) return;

//     setForm((prev: any) => ({
//       ...prev,
//       gender: user.gender || "male"
//     }));

//     fetchGoal();
//   }, [user]);

//   // 🔥 HANDLE INPUT
//   const handleChange = (e: any) => {
//     setForm((prev: any) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   // 🔥 SUBMIT
//   const handleSubmit = async () => {
//     await api.post("/profile", {
//       height_cm: Number(form.height),
//       weight_kg: Number(form.weight),
//       gender: form.gender,
//       goal_type: form.goal,
//       activity_level: form.activity,
//       target_weight: Number(form.targetWeight) || null,
//       duration_days: Number(form.duration) || null,
//       userId: user.id
//     });

//     fetchGoal();
//     toggleForm();
//   };

//   // 🔥 FORMAT
//   const formatGoal = (g: any) => {
//     if (!g) return "";
//     if (!g.target_weight) return "Maintain current weight";

//     return `${g.goal_type.replace("_", " ")} from ${g.weight_kg} → ${g.target_weight} kg`;
//   };

//   return (
//     <Box minH="100vh" bg="linear-gradient(180deg,#eaf6ff,#ffffff)" p={4}>
//       <VStack maxW="420px" mx="auto" spacing={6}>

//         {/* 🔥 HEADER */}
//         <Text fontSize="2xl" fontWeight="bold">
//           Your Fitness Journey 💙
//         </Text>

//         {/* 💎 HERO CARD */}
//         <Box
//           w="100%"
//           p={5}
//           borderRadius="2xl"
//           bg="rgba(255,255,255,0.7)"
//           backdropFilter="blur(25px)"
//           boxShadow="0 20px 60px rgba(0,0,0,0.1)"
//         >
//           {!goal ? (
//             <VStack>
//               <Text fontWeight="bold">No Goal Set 😴</Text>
//               <Text fontSize="sm" color="gray.500">
//                 Let’s define your fitness journey 🚀
//               </Text>
//             </VStack>
//           ) : (
//             <>
//               <HStack justify="space-between">
//                 <Text fontWeight="bold">Active Goal 🎯</Text>
//                 <Badge colorScheme="green">ACTIVE</Badge>
//               </HStack>

//               {/* 🔥 GOAL STORY */}
//               <Text mt={3} fontSize="sm" color="gray.600">
//                 {formatGoal(goal)}
//               </Text>

//               {goal.duration_days && (
//                 <Text fontSize="xs" color="gray.500">
//                   Target duration: {goal.duration_days} days
//                 </Text>
//               )}

//               {/* 🔥 DAILY TARGET */}
//               <Box mt={4}>
//                 <Text fontSize="sm" fontWeight="bold">
//                   Daily Target Intake 🍽️
//                 </Text>

//                 <HStack mt={2} wrap="wrap">
//                   <Badge bg="blue.100">🔥 {goal.target_calories} kcal</Badge>
//                   <Badge bg="blue.100">💪 {goal.protein_target}g protein</Badge>
//                   <Badge bg="blue.100">🍞 {goal.carbs_target}g carbs</Badge>
//                   <Badge bg="blue.100">🥑 {goal.fats_target}g fats</Badge>
//                 </HStack>
//               </Box>
//             </>
//           )}
//         </Box>

//         {/* ➕ CTA */}
//         <Button
//           w="100%"
//           borderRadius="full"
//           bgGradient="linear(to-r, blue.400, cyan.400)"
//           color="white"
//           _hover={{ transform: "scale(1.03)" }}
//           onClick={toggleForm}
//         >
//           {showForm ? "Close ✖" : "Set New Goal 🚀"}
//         </Button>

//         {/* 🔥 FORM */}
//         <Collapse in={showForm}>
//           <Box
//             w="100%"
//             p={5}
//             borderRadius="2xl"
//             bg="white"
//             boxShadow="lg"
//           >
//             <VStack spacing={4}>

//               <HStack w="100%">
//                 <Input name="height" placeholder="Height (cm)" onChange={handleChange}/>
//                 <Input name="weight" placeholder="Weight (kg)" onChange={handleChange}/>
//               </HStack>

//               {/* 🔥 GENDER MENU */}
//               <Menu>
//                 <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
//                   {form.gender === "male" ? "👨 Male" : "👩 Female"}
//                 </MenuButton>
//                 <MenuList>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, gender: "male" }))
//                   }>
//                     👨 Male
//                   </MenuItem>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, gender: "female" }))
//                   }>
//                     👩 Female
//                   </MenuItem>
//                 </MenuList>
//               </Menu>

//               {/* 🔥 GOAL MENU */}
//               <Menu>
//                 <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
//                   {form.goal.replace("_", " ")}
//                 </MenuButton>
//                 <MenuList>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, goal: "weight_loss" }))
//                   }>🔥 Weight Loss</MenuItem>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, goal: "weight_gain" }))
//                   }>💪 Weight Gain</MenuItem>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, goal: "maintenance" }))
//                   }>⚖️ Maintenance</MenuItem>
//                 </MenuList>
//               </Menu>

//               {/* 🔥 ACTIVITY MENU */}
//               <Menu>
//                 <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
//                   {form.activity}
//                 </MenuButton>
//                 <MenuList>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, activity: "sedentary" }))
//                   }>🪑 Low</MenuItem>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, activity: "moderate" }))
//                   }>🚶 Moderate</MenuItem>
//                   <MenuItem onClick={() =>
//                     setForm((prev: any) => ({ ...prev, activity: "active" }))
//                   }>🏃 Active</MenuItem>
//                 </MenuList>
//               </Menu>

//               {form.goal !== "maintenance" && (
//                 <>
//                   <Input name="targetWeight" placeholder="Target Weight" onChange={handleChange}/>
//                   <Input name="duration" placeholder="Duration (days)" onChange={handleChange}/>
//                 </>
//               )}

//               <Button w="100%" colorScheme="blue" onClick={handleSubmit}>
//                 Save Goal 💙
//               </Button>

//             </VStack>
//           </Box>
//         </Collapse>

//       </VStack>
//     </Box>
//   );
// };

// export default GoalSetup;



// Verion 2 

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

const GOALS = [
  { id: "fat_loss", icon: "🔥", title: "Fat Loss", description: "Burn body fat while preserving muscle" },
  { id: "weight_loss", icon: "⚖️", title: "Weight Loss", description: "Reduce overall body weight" },
  { id: "lean_muscle_gain", icon: "💪", title: "Lean Muscle Gain", description: "Build muscle with minimal fat gain" },
  { id: "bulk_up", icon: "🏋️", title: "Bulk Up", description: "Aggressive muscle growth" },
  { id: "strength_gain", icon: "🧱", title: "Strength Gain", description: "Increase power and performance" },
  { id: "maintenance", icon: "🎯", title: "Maintenance", description: "Maintain current physique" },
  { id: "healthy_lifestyle", icon: "❤️", title: "Healthy Lifestyle", description: "General wellness" },
  { id: "athletic_performance", icon: "🏃", title: "Athletic Performance", description: "Improve endurance and recovery" },
];

const ACTIVITIES = [
  {
    id: "sedentary",
    icon: "🪑",
    title: "Low Activity",
    description:
      "Office job, little exercise, less than 5,000 steps/day",
  },

  {
    id: "moderate",
    icon: "🚶",
    title: "Moderate",
    description:
      "Walking regularly, gym 2-3 times/week, 5k-10k steps/day",
  },

  {
    id: "active",
    icon: "🏃",
    title: "Active",
    description:
      "Gym 4-6 times/week, sports, 10k+ steps/day",
  },

  {
    id: "athlete",
    icon: "🏋️",
    title: "Athlete",
    description:
      "Intense training, competitive sports, daily workouts",
  },
];

const GoalSetup = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    height: "",
    weight: "",
    gender: "male",
    goal: "lean_muscle_gain",
    activity: "moderate",
    targetWeight: "",
    duration: "",
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

  const handleDeleteGoal = async () => {
    await api.delete("/profile/active");
    setGoal(null);
    toast({ title: "Goal removed", status: "success" });
  };

  const handleSubmit = async () => {
    await api.post("/profile", {
      height_cm: Number(form.height),
      weight_kg: Number(form.weight),
      gender: form.gender,
      goal_type: form.goal,
      activity_level: form.activity,
      target_weight: Number(form.targetWeight) || null,
      duration_days: Number(form.duration) || null,
      userId: user.id,
    });

    await fetchGoal();
    setShowForm(false);

    toast({
      title: "Goal saved successfully",
      status: "success",
    });
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
    <Box minH="100vh" bg="gray.50" p={4}>
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

            {form.goal !== "maintenance" && (
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
            )}

            <Box mt={6} p={4} bg="blue.50" borderRadius="2xl">
              <Text fontWeight="bold">
                Estimated Protein Target
              </Text>

              <Text fontSize="2xl">
                💪 {proteinPreview}g
              </Text>
            </Box>

            <Button
              mt={6}
              w="100%"
              colorScheme="blue"
              size="lg"
              onClick={handleSubmit}
            >
              Save Goal 🚀
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default GoalSetup;
