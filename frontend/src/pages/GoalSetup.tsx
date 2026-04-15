// Version 1 : working version

// import {
//     Box,
//     Input,
//     Select,
//     Button,
//     Text,
//     VStack,
//     HStack
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import axios from "axios";
  
//   const GoalSetup = () => {
//     const [form, setForm] = useState({
//       height: "",
//       weight: "",
//       gender: "male",
//       goal: "weight_loss",
//       activity: "moderate",
//       targetWeight: "",
//       duration: ""
//     });
  
//     const handleChange = (e: any) => {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = async () => {
//       if (!form.height || !form.weight || !form.gender) {
//         alert("Please fill required fields");
//         return;
//       }
  
//       await axios.post("http://localhost:3004/api/users/profile", {
//         userId: 1,
//         height_cm: Number(form.height),
//         weight_kg: Number(form.weight),
//         gender: form.gender,
//         goal_type: form.goal,
//         activity_level: form.activity,
//         target_weight: Number(form.targetWeight) || null,
//         duration_days: Number(form.duration) || null
//       });
  
//       alert("Profile Saved 💙");
//     };
  
//     return (
//       <Box
//         minH="100vh"
//         bg="linear-gradient(180deg,#f8fbff,#eef5fb)"
//         p={6}
//       >
//         <Box
//           maxW="420px"
//           mx="auto"
//           bg="white"
//           p={6}
//           borderRadius="2xl"
//           boxShadow="0 10px 40px rgba(99,189,244,0.15)"
//         >
//           <Text fontSize="2xl" fontWeight="bold" mb={5}>
//             Set Your Goal 🎯
//           </Text>
  
//           <VStack spacing={4}>
  
//             {/* HEIGHT & WEIGHT */}
//             <HStack w="100%">
//               <Input
//                 placeholder="Height (cm)"
//                 name="height"
//                 onChange={handleChange}
//               />
//               <Input
//                 placeholder="Weight (kg)"
//                 name="weight"
//                 onChange={handleChange}
//               />
//             </HStack>
  
//             {/* GENDER */}
//             <Select name="gender" onChange={handleChange}>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </Select>
  
//             {/* GOAL */}
//             <Select name="goal" onChange={handleChange}>
//               <option value="weight_loss">Weight Loss</option>
//               <option value="weight_gain">Weight Gain</option>
//               <option value="maintenance">Maintenance</option>
//             </Select>
  
//             {/* ACTIVITY */}
//             <Select name="activity" onChange={handleChange}>
//               <option value="sedentary">Low Activity</option>
//               <option value="moderate">Moderate</option>
//               <option value="active">High</option>
//             </Select>
  
//             {/* CONDITIONAL FIELDS */}
//             {(form.goal === "weight_loss" || form.goal === "weight_gain") && (
//               <>
//                 <Input
//                   placeholder="Target Weight"
//                   name="targetWeight"
//                   onChange={handleChange}
//                 />
//                 <Input
//                   placeholder="Duration (days)"
//                   name="duration"
//                   onChange={handleChange}
//                 />
//               </>
//             )}
  
//             {/* BUTTON */}
//             <Button
//               w="100%"
//               bg="brand.500"
//               color="white"
//               _hover={{ bg: "brand.600" }}
//               onClick={handleSubmit}
//             >
//               Save Goal
//             </Button>
//           </VStack>
//         </Box>
//       </Box>
//     );
//   };
  
//   export default GoalSetup;


// Version 2 : Design and Functionality enhancements to v1

// import {
//   Box,
//   Input,
//   Select,
//   Button,
//   Text,
//   VStack,
//   HStack,
//   Badge,
//   Divider
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const GoalSetup = () => {
//   const [form, setForm] = useState<any>({
//     height: "",
//     weight: "",
//     gender: "male",
//     goal: "weight_loss",
//     activity: "moderate",
//     targetWeight: "",
//     duration: ""
//   });

//   const [goals, setGoals] = useState<any[]>([]);

//   const userId = 3;

//   const fetchGoals = async () => {
//     const res = await axios.get(
//       `http://localhost:3004/api/users/profile/${userId}`
//     );
//     setGoals(res.data);
//   };

//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await axios.post("http://localhost:3004/api/users/profile", {
//       userId,
//       height_cm: Number(form.height),
//       weight_kg: Number(form.weight),
//       gender: form.gender,
//       goal_type: form.goal,
//       activity_level: form.activity,
//       target_weight: Number(form.targetWeight) || null,
//       duration_days: Number(form.duration) || null
//     });

//     fetchGoals();
//     alert("New Goal Set 🚀");
//   };

//   const activeGoal = goals.find(g => g.is_active);

//   return (
//     <Box p={6} bg="#f6fbff" minH="100vh">

//       <VStack maxW="500px" mx="auto" spacing={6}>

//         {/* 🔥 HEADER */}
//         <Text fontSize="2xl" fontWeight="bold">
//           Your Fitness Journey 💙
//         </Text>

//         {/* ❌ NO GOAL */}
//         {!activeGoal && (
//           <Box bg="white" p={5} borderRadius="xl" w="100%" textAlign="center">
//             <Text fontWeight="bold">No Goal Set 😴</Text>
//             <Text color="gray.500">
//               Let’s set your first goal and transform yourself 🚀
//             </Text>
//           </Box>
//         )}

//         {/* ✅ ACTIVE GOAL */}
//         {activeGoal && (
//           <Box bg="white" p={5} borderRadius="xl" w="100%">
//             <HStack justify="space-between">
//               <Text fontWeight="bold">Active Goal 🎯</Text>
//               <Badge colorScheme="green">ACTIVE</Badge>
//             </HStack>

//             <Text mt={2}>
//               Calories: {activeGoal.target_calories}
//             </Text>
//             <Text>Protein: {activeGoal.protein_target}</Text>
//             <Text>Carbs: {activeGoal.carbs_target}</Text>
//             <Text>Fats: {activeGoal.fats_target}</Text>
//           </Box>
//         )}

//         {/* 🕘 HISTORY */}
//         {goals.length > 1 && (
//           <Box w="100%">
//             <Text fontWeight="bold">Past Goals 📜</Text>

//             {goals
//               .filter(g => !g.is_active)
//               .map((g, i) => (
//                 <Box
//                   key={i}
//                   mt={3}
//                   bg="white"
//                   p={4}
//                   borderRadius="lg"
//                   opacity={0.6}
//                 >
//                   <Text>{g.goal_type}</Text>
//                   <Text fontSize="sm">
//                     {g.target_calories} kcal
//                   </Text>
//                 </Box>
//               ))}
//           </Box>
//         )}

//         <Divider />

//         {/* 🆕 NEW GOAL FORM */}
//         <Box bg="white" p={5} borderRadius="xl" w="100%">

//           <Text fontWeight="bold" mb={3}>
//             Set New Goal 🚀
//           </Text>

//           <VStack spacing={3}>

//             <HStack w="100%">
//               <Input placeholder="Height" name="height" onChange={handleChange}/>
//               <Input placeholder="Weight" name="weight" onChange={handleChange}/>
//             </HStack>

//             <Select name="gender" onChange={handleChange}>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </Select>

//             <Select name="goal" onChange={handleChange}>
//               <option value="weight_loss">Weight Loss</option>
//               <option value="weight_gain">Weight Gain</option>
//               <option value="maintenance">Maintenance</option>
//             </Select>

//             <Select name="activity" onChange={handleChange}>
//               <option value="sedentary">Low</option>
//               <option value="moderate">Moderate</option>
//               <option value="active">High</option>
//             </Select>

//             {(form.goal !== "maintenance") && (
//               <>
//                 <Input placeholder="Target Weight" name="targetWeight" onChange={handleChange}/>
//                 <Input placeholder="Duration (days)" name="duration" onChange={handleChange}/>
//               </>
//             )}

//             <Button w="100%" bg="brand.500" color="white" onClick={handleSubmit}>
//               Save New Goal
//             </Button>

//           </VStack>
//         </Box>

//       </VStack>
//     </Box>
//   );
// };

// export default GoalSetup;



// Version 3 : Enhancement to version 2

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
//   useDisclosure,
//   Flex
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const GoalSetup = () => {
//   const [form, setForm] = useState<any>({
//     height: "",
//     weight: "",
//     gender: "male",
//     goal: "weight_loss",
//     activity: "moderate",
//     targetWeight: "",
//     duration: ""
//   });

//   const [goals, setGoals] = useState<any[]>([]);
//   const { isOpen: showForm, onToggle: toggleForm } = useDisclosure();
//   const { isOpen: showHistory, onToggle: toggleHistory } = useDisclosure();

//   const userId = 1;

//   const fetchGoals = async () => {
//     const res = await axios.get(
//       `http://localhost:3004/api/users/profile/${userId}`
//     );
//     setGoals(res.data);
//   };

//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await axios.post("http://localhost:3004/api/users/profile", {
//       userId,
//       height_cm: Number(form.height),
//       weight_kg: Number(form.weight),
//       gender: form.gender,
//       goal_type: form.goal,
//       activity_level: form.activity,
//       target_weight: Number(form.targetWeight) || null,
//       duration_days: Number(form.duration) || null
//     });

//     fetchGoals();
//     toggleForm();
//   };

//   const activeGoal = goals.find(g => g.is_active);

//   return (
//     <Box
//       minH="100vh"
//       bg="linear-gradient(180deg,#eaf6ff,#ffffff)"
//       p={4}
//     >
//       <VStack maxW="420px" mx="auto" spacing={6}>

//         {/* 🔥 HEADER */}
//         <Text fontSize="2xl" fontWeight="bold" textAlign="center">
//           Your Fitness Journey 💙
//         </Text>

//         {/* 💎 ACTIVE GOAL CARD */}
//         <Box
//           w="100%"
//           p={5}
//           borderRadius="2xl"
//           bg="rgba(255,255,255,0.6)"
//           backdropFilter="blur(20px)"
//           boxShadow="0 10px 40px rgba(99,189,244,0.2)"
//         >
//           {!activeGoal ? (
//             <VStack spacing={2}>
//               <Text fontWeight="bold">No Goal Set 😴</Text>
//               <Text fontSize="sm" color="gray.600">
//                 Start your transformation today 🚀
//               </Text>
//             </VStack>
//           ) : (
//             <>
//               <HStack justify="space-between">
//                 <Text fontWeight="bold">Active Goal 🎯</Text>
//                 <Badge colorScheme="green">ACTIVE</Badge>
//               </HStack>

//               <Text mt={2} fontSize="sm" color="gray.600">
//                 {activeGoal.goal_type.replace("_", " ").toUpperCase()}
//               </Text>

//               <HStack mt={3} spacing={3} wrap="wrap">
//                 <Badge>🔥 {activeGoal.target_calories} kcal</Badge>
//                 <Badge>💪 {activeGoal.protein_target}g</Badge>
//                 <Badge>🍞 {activeGoal.carbs_target}g</Badge>
//                 <Badge>🥑 {activeGoal.fats_target}g</Badge>
//               </HStack>

//               {activeGoal.target_weight && (
//                 <Text mt={3} fontSize="sm">
//                   Target: {activeGoal.weight_kg} → {activeGoal.target_weight} kg
//                 </Text>
//               )}

//               {activeGoal.duration_days && (
//                 <Text fontSize="sm" color="gray.500">
//                   Duration: {activeGoal.duration_days} days
//                 </Text>
//               )}
//             </>
//           )}
//         </Box>

//         {/* ➕ SET NEW GOAL BUTTON */}
//         <Button
//           w="100%"
//           borderRadius="full"
//           bg="brand.500"
//           color="white"
//           _hover={{ bg: "brand.600", transform: "scale(1.02)" }}
//           onClick={toggleForm}
//         >
//           {showForm ? "Close ✖" : "Set New Goal 🚀"}
//         </Button>

//         {/* 🆕 FORM */}
//         <Collapse in={showForm} animateOpacity>
//           <Box
//             w="100%"
//             p={5}
//             borderRadius="2xl"
//             bg="rgba(255,255,255,0.6)"
//             backdropFilter="blur(20px)"
//             boxShadow="md"
//           >
//             <VStack spacing={3}>

//               <HStack w="100%">
//                 <Input placeholder="Height (cm)" name="height" onChange={handleChange}/>
//                 <Input placeholder="Weight (kg)" name="weight" onChange={handleChange}/>
//               </HStack>

//               <Select name="gender" onChange={handleChange}>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </Select>

//               <Select name="goal" onChange={handleChange}>
//                 <option value="weight_loss">Weight Loss</option>
//                 <option value="weight_gain">Weight Gain</option>
//                 <option value="maintenance">Maintenance</option>
//               </Select>

//               <Select name="activity" onChange={handleChange}>
//                 <option value="sedentary">Low Activity</option>
//                 <option value="moderate">Moderate</option>
//                 <option value="active">High</option>
//               </Select>

//               {(form.goal !== "maintenance") && (
//                 <>
//                   <Input placeholder="Target Weight" name="targetWeight" onChange={handleChange}/>
//                   <Input placeholder="Duration (days)" name="duration" onChange={handleChange}/>
//                 </>
//               )}

//               <Button
//                 w="100%"
//                 bg="brand.500"
//                 color="white"
//                 borderRadius="full"
//                 _hover={{ bg: "brand.600" }}
//                 onClick={handleSubmit}
//               >
//                 Save Goal 💙
//               </Button>

//             </VStack>
//           </Box>
//         </Collapse>

//         {/* 📜 HISTORY TOGGLE */}
//         {goals.length > 1 && (
//           <>
//             <Button variant="ghost" onClick={toggleHistory}>
//               {showHistory ? "Hide History ▲" : "View Past Goals ▼"}
//             </Button>

//             <Collapse in={showHistory}>
//               <VStack w="100%">
//                 {goals
//                   .filter(g => !g.is_active)
//                   .map((g, i) => (
//                     <Box
//                       key={i}
//                       w="100%"
//                       p={4}
//                       borderRadius="xl"
//                       bg="white"
//                       opacity={0.7}
//                     >
//                       <Text fontWeight="bold">
//                         {g.goal_type.replace("_", " ")}
//                       </Text>
//                       <Text fontSize="sm">
//                         {g.target_calories} kcal
//                       </Text>
//                     </Box>
//                   ))}
//               </VStack>
//             </Collapse>
//           </>
//         )}

//       </VStack>
//     </Box>
//   );
// };

// export default GoalSetup;


import {
  Box,
  Input,
  Select,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  Collapse,
  useDisclosure,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const GoalSetup = () => {
  const [form, setForm] = useState<any>({
    height: "",
    weight: "",
    gender: "male",
    goal: "weight_loss",
    activity: "moderate",
    targetWeight: "",
    duration: ""
  });

  const [goals, setGoals] = useState<any[]>([]);
  const { isOpen: showForm, onToggle: toggleForm } = useDisclosure();
  const { isOpen: showHistory, onToggle: toggleHistory } = useDisclosure();

  const userId = 3;

  const fetchGoals = async () => {
    const res = await axios.get(
      `http://localhost:3004/api/users/profile/${userId}`
    );
    setGoals(res.data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:3004/api/users/profile", {
      userId,
      height_cm: Number(form.height),
      weight_kg: Number(form.weight),
      gender: form.gender,
      goal_type: form.goal,
      activity_level: form.activity,
      target_weight: Number(form.targetWeight) || null,
      duration_days: Number(form.duration) || null
    });

    fetchGoals();
    toggleForm();
  };

  const activeGoal = goals.find(g => g.is_active);

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
          bg="rgba(255,255,255,0.65)"
          backdropFilter="blur(25px)"
          boxShadow="0 20px 60px rgba(0,0,0,0.1)"
        >
          {!activeGoal ? (
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
                {formatGoal(activeGoal)}
              </Text>

              {activeGoal.duration_days && (
                <Text fontSize="xs" color="gray.500">
                  Target duration: {activeGoal.duration_days} days
                </Text>
              )}

              {/* 🔥 DAILY TARGET */}
              <Box mt={4}>
                <Text fontSize="sm" fontWeight="bold">
                  Daily Target Intake 🍽️
                </Text>

                <HStack mt={2} wrap="wrap">
                  <Badge bg="brand.200">🔥 {activeGoal.target_calories} kcal</Badge>
                  <Badge bg="brand.200">💪 {activeGoal.protein_target}g protein</Badge>
                  <Badge bg="brand.200">🍞 {activeGoal.carbs_target}g carbs</Badge>
                  <Badge bg="brand.200">🥑 {activeGoal.fats_target}g fats</Badge>
                </HStack>
              </Box>
            </>
          )}
        </Box>

        {/* ➕ CTA */}
        <Button
          w="100%"
          borderRadius="full"
          bg="brand.500"
          color="white"
          onClick={toggleForm}
        >
          {showForm ? "Close ✖" : "Set New Goal 🚀"}
        </Button>

        {/* FORM */}
        <Collapse in={showForm}>
          <Box
            w="100%"
            p={5}
            borderRadius="2xl"
            bg="white"
            boxShadow="lg"
          >
            <VStack spacing={3}>

              <HStack w="100%">
                <Input placeholder="Height (cm)" name="height" onChange={handleChange}/>
                <Input placeholder="Weight (kg)" name="weight" onChange={handleChange}/>
              </HStack>

              <Select name="gender" onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>

              <Select name="goal" onChange={handleChange}>
                <option value="weight_loss">Weight Loss</option>
                <option value="weight_gain">Weight Gain</option>
                <option value="maintenance">Maintenance</option>
              </Select>

              <Select name="activity" onChange={handleChange}>
                <option value="sedentary">Low</option>
                <option value="moderate">Moderate</option>
                <option value="active">High</option>
              </Select>

              {(form.goal !== "maintenance") && (
                <>
                  <Input placeholder="Target Weight" name="targetWeight" onChange={handleChange}/>
                  <Input placeholder="Duration (days)" name="duration" onChange={handleChange}/>
                </>
              )}

              <Button w="100%" bg="brand.500" color="white" onClick={handleSubmit}>
                Save Goal 💙
              </Button>

            </VStack>
          </Box>
        </Collapse>

        {/* 📜 HISTORY */}
        {goals.length > 1 && (
          <>
            <Button variant="ghost" onClick={toggleHistory}>
              {showHistory ? "Hide History ▲" : "View Goal History ▼"}
            </Button>

            <Collapse in={showHistory}>
              <VStack w="100%">
                {goals
                  .filter(g => !g.is_active)
                  .map((g, i) => (
                    <Box
                      key={i}
                      w="100%"
                      p={4}
                      borderRadius="xl"
                      bg="rgba(255,255,255,0.7)"
                      backdropFilter="blur(10px)"
                    >
                      <Text fontWeight="bold">
                        {formatGoal(g)}
                      </Text>

                      <Text fontSize="sm" color="gray.500">
                        {g.duration_days} days • {g.target_calories} kcal/day
                      </Text>
                    </Box>
                  ))}
              </VStack>
            </Collapse>
          </>
        )}

      </VStack>
    </Box>
  );
};

export default GoalSetup;