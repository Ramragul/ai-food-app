


// Version 1 :  Working version

// import {
//   Box,
//   Input,
//   Select,
//   Button,
//   Text,
//   VStack,
//   HStack,
//   Badge,
//   Collapse,
//   useDisclosure
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import api from "../utils/api";
// import { useAuth } from "../context/AuthContext";

// const GoalSetup = () => {
//   const { user } = useAuth();

//   const userId = user.id
//   console.log("USER VALUES" +JSON.stringify(user))

//   console.log("userId: " +userId)

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
//   const { isOpen: showHistory, onToggle: toggleHistory } = useDisclosure();

//   const fetchGoal = async () => {
//     try {
//       const res = await api.get("/profile/active/me");
//       setGoal(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (!user) return;
//     fetchGoal();
//   }, [user]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await api.post("/profile", {
//       height_cm: Number(form.height),
//       weight_kg: Number(form.weight),
//       gender: form.gender,
//       goal_type: form.goal,
//       activity_level: form.activity,
//       target_weight: Number(form.targetWeight) || null,
//       duration_days: Number(form.duration) || null,
//       userId: user.id || null
//     });

//     fetchGoal();
//     toggleForm();
//   };

//   const formatGoal = (g: any) => {
//     if (!g) return "";
//     if (!g.target_weight) return "Maintain current weight";

//     return `${g.goal_type.replace("_", " ")} from ${g.weight_kg} → ${g.target_weight} kg`;
//   };

//   return (
//     <Box minH="100vh" bg="linear-gradient(180deg,#eaf6ff,#ffffff)" p={4}>
//       <VStack maxW="420px" mx="auto" spacing={6}>

//         {/* HEADER */}
//         <Text fontSize="2xl" fontWeight="bold">
//           Your Fitness Journey 💙
//         </Text>

//         {/* HERO CARD */}
//         <Box
//           w="100%"
//           p={5}
//           borderRadius="2xl"
//           bg="rgba(255,255,255,0.7)"
//           backdropFilter="blur(30px)"
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

//               <Text mt={3} fontSize="sm" color="gray.600">
//                 {formatGoal(goal)}
//               </Text>

//               {goal.duration_days && (
//                 <Text fontSize="xs" color="gray.500">
//                   Target duration: {goal.duration_days} days
//                 </Text>
//               )}

//               <Box mt={4}>
//                 <Text fontSize="sm" fontWeight="bold">
//                   Daily Target Intake 🍽️
//                 </Text>

//                 <HStack mt={2} wrap="wrap">
//                   <Badge bg="blue.100">🔥 {goal.target_calories} kcal</Badge>
//                   <Badge bg="blue.100">💪 {goal.protein_target}g</Badge>
//                   <Badge bg="blue.100">🍞 {goal.carbs_target}g</Badge>
//                   <Badge bg="blue.100">🥑 {goal.fats_target}g</Badge>
//                 </HStack>
//               </Box>
//             </>
//           )}
//         </Box>

//         {/* CTA */}
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

//         {/* FORM */}
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
//                 <Input
//                   placeholder="Height (cm)"
//                   name="height"
//                   onChange={handleChange}
//                   focusBorderColor="blue.400"
//                 />
//                 <Input
//                   placeholder="Weight (kg)"
//                   name="weight"
//                   onChange={handleChange}
//                   focusBorderColor="blue.400"
//                 />
//               </HStack>

//               {/* PREMIUM SELECT */}
//               <Select
//                 name="gender"
//                 onChange={handleChange}
//                 borderRadius="full"
//                 bg="gray.50"
//                 _focus={{ bg: "white" }}
//                 value={user.gender}
//               >
//                 <option value="male">👨 Male</option>
//                 <option value="female">👩 Female</option>
//               </Select>

//               <Select
//                 name="goal"
//                 onChange={handleChange}
//                 borderRadius="full"
//                 bg="gray.50"
//               >
//                 <option value="weight_loss">🔥 Weight Loss</option>
//                 <option value="weight_gain">💪 Weight Gain</option>
//                 <option value="maintenance">⚖️ Maintenance</option>
//               </Select>

//               <Select
//                 name="activity"
//                 onChange={handleChange}
//                 borderRadius="full"
//                 bg="gray.50"
//               >
//                 <option value="sedentary">🪑 Low Activity</option>
//                 <option value="moderate">🚶 Moderate</option>
//                 <option value="active">🏃 Active</option>
//               </Select>

//               {form.goal !== "maintenance" && (
//                 <>
//                   <Input
//                     placeholder="Target Weight"
//                     name="targetWeight"
//                     onChange={handleChange}
//                   />
//                   <Input
//                     placeholder="Duration (days)"
//                     name="duration"
//                     onChange={handleChange}
//                   />
//                 </>
//               )}

//               <Button
//                 w="100%"
//                 bgGradient="linear(to-r, blue.400, cyan.400)"
//                 color="white"
//                 borderRadius="full"
//                 _hover={{ transform: "scale(1.05)" }}
//                 onClick={handleSubmit}
//               >
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


// Version 2 :

import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  Collapse,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const GoalSetup = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 

  const [form, setForm] = useState<any>({
    height: "",
    weight: "",
    gender: "male",
    goal: "weight_loss",
    activity: "moderate",
    targetWeight: "",
    duration: ""
  });

  const [goal, setGoal] = useState<any>(null);

  const { isOpen: showForm, onToggle: toggleForm } = useDisclosure();

  // 🔥 FETCH ACTIVE GOAL
  const fetchGoal = async () => {
    try {
      const res = await api.get("/profile/active/me");
      setGoal(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 INIT USER DATA
  useEffect(() => {
    if (!user) return;

    setForm((prev: any) => ({
      ...prev,
      gender: user.gender || "male"
    }));

    fetchGoal();
  }, [user]);

  // 🔥 HANDLE INPUT
  const handleChange = (e: any) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    await api.post("/profile", {
      height_cm: Number(form.height),
      weight_kg: Number(form.weight),
      gender: form.gender,
      goal_type: form.goal,
      activity_level: form.activity,
      target_weight: Number(form.targetWeight) || null,
      duration_days: Number(form.duration) || null,
      userId: user.id
    });

    fetchGoal();
    toggleForm();
  };

  // 🔥 FORMAT
  const formatGoal = (g: any) => {
    if (!g) return "";
    if (!g.target_weight) return "Maintain current weight";

    return `${g.goal_type.replace("_", " ")} from ${g.weight_kg} → ${g.target_weight} kg`;
  };

  return (
    <Box minH="100vh" bg="linear-gradient(180deg,#eaf6ff,#ffffff)" p={4}>
      <VStack maxW="420px" mx="auto" spacing={6}>

        {/* 🔥 HEADER */}
        <Text fontSize="2xl" fontWeight="bold">
          Your Fitness Journey 💙
        </Text>

        {/* 💎 HERO CARD */}
        <Box
          w="100%"
          p={5}
          borderRadius="2xl"
          bg="rgba(255,255,255,0.7)"
          backdropFilter="blur(25px)"
          boxShadow="0 20px 60px rgba(0,0,0,0.1)"
        >
          {!goal ? (
            <VStack>
              <Text fontWeight="bold">No Goal Set 😴</Text>
              <Text fontSize="sm" color="gray.500">
                Let’s define your fitness journey 🚀
              </Text>
            </VStack>
          ) : (
            <>
              <HStack justify="space-between">
                <Text fontWeight="bold">Active Goal 🎯</Text>
                <Badge colorScheme="green">ACTIVE</Badge>
              </HStack>

              {/* 🔥 GOAL STORY */}
              <Text mt={3} fontSize="sm" color="gray.600">
                {formatGoal(goal)}
              </Text>

              {goal.duration_days && (
                <Text fontSize="xs" color="gray.500">
                  Target duration: {goal.duration_days} days
                </Text>
              )}

              {/* 🔥 DAILY TARGET */}
              <Box mt={4}>
                <Text fontSize="sm" fontWeight="bold">
                  Daily Target Intake 🍽️
                </Text>

                <HStack mt={2} wrap="wrap">
                  <Badge bg="blue.100">🔥 {goal.target_calories} kcal</Badge>
                  <Badge bg="blue.100">💪 {goal.protein_target}g protein</Badge>
                  <Badge bg="blue.100">🍞 {goal.carbs_target}g carbs</Badge>
                  <Badge bg="blue.100">🥑 {goal.fats_target}g fats</Badge>
                </HStack>
              </Box>
            </>
          )}
        </Box>

        {/* ➕ CTA */}
        <Button
          w="100%"
          borderRadius="full"
          bgGradient="linear(to-r, blue.400, cyan.400)"
          color="white"
          _hover={{ transform: "scale(1.03)" }}
          onClick={toggleForm}
        >
          {showForm ? "Close ✖" : "Set New Goal 🚀"}
        </Button>

        {/* 🔥 FORM */}
        <Collapse in={showForm}>
          <Box
            w="100%"
            p={5}
            borderRadius="2xl"
            bg="white"
            boxShadow="lg"
          >
            <VStack spacing={4}>

              <HStack w="100%">
                <Input name="height" placeholder="Height (cm)" onChange={handleChange}/>
                <Input name="weight" placeholder="Weight (kg)" onChange={handleChange}/>
              </HStack>

              {/* 🔥 GENDER MENU */}
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
                  {form.gender === "male" ? "👨 Male" : "👩 Female"}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, gender: "male" }))
                  }>
                    👨 Male
                  </MenuItem>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, gender: "female" }))
                  }>
                    👩 Female
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* 🔥 GOAL MENU */}
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
                  {form.goal.replace("_", " ")}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, goal: "weight_loss" }))
                  }>🔥 Weight Loss</MenuItem>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, goal: "weight_gain" }))
                  }>💪 Weight Gain</MenuItem>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, goal: "maintenance" }))
                  }>⚖️ Maintenance</MenuItem>
                </MenuList>
              </Menu>

              {/* 🔥 ACTIVITY MENU */}
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
                  {form.activity}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, activity: "sedentary" }))
                  }>🪑 Low</MenuItem>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, activity: "moderate" }))
                  }>🚶 Moderate</MenuItem>
                  <MenuItem onClick={() =>
                    setForm((prev: any) => ({ ...prev, activity: "active" }))
                  }>🏃 Active</MenuItem>
                </MenuList>
              </Menu>

              {form.goal !== "maintenance" && (
                <>
                  <Input name="targetWeight" placeholder="Target Weight" onChange={handleChange}/>
                  <Input name="duration" placeholder="Duration (days)" onChange={handleChange}/>
                </>
              )}

              <Button w="100%" colorScheme="blue" onClick={handleSubmit}>
                Save Goal 💙
              </Button>

            </VStack>
          </Box>
        </Collapse>

      </VStack>
    </Box>
  );
};

export default GoalSetup;