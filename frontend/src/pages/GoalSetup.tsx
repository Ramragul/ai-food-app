// Version 1

// import {
//     Box,
//     Input,
//     Select,
//     Button,
//     Text,
//     VStack
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import axios from "axios";
  
//   const GoalSetup = () => {
//     const [form, setForm] = useState({
//       height: "",
//       weight: "",
//       goal: "LOSS",
//       activity: "MEDIUM",
//       targetWeight: "",
//       duration: ""
//     });
  
//     const handleChange = (e: any) => {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = async () => {
//       await axios.post("http://localhost:3004/api/users/profile", {
//         userId: 1,
//         height_cm: Number(form.height),
//         weight_kg: Number(form.weight),
//         goal_type: form.goal,
//         activity_level: form.activity,
//         target_weight: Number(form.targetWeight),
//         duration_days: Number(form.duration)
//       });
  
//       alert("Profile Saved 💙");
//     };
  
//     return (
//       <Box p={6} maxW="400px" mx="auto">
//         <Text fontSize="xl" mb={4}>Set Your Goal</Text>
  
//         <VStack spacing={4}>
//           <Input placeholder="Height (cm)" name="height" onChange={handleChange} />
//           <Input placeholder="Weight (kg)" name="weight" onChange={handleChange} />
  
//           <Select name="goal" onChange={handleChange}>
//             <option value="LOSS">Weight Loss</option>
//             <option value="GAIN">Weight Gain</option>
//             <option value="BULK">Lean Bulk</option>
//             <option value="MAINTENANCE">Maintenance</option>
//           </Select>
  
//           <Select name="activity" onChange={handleChange}>
//             <option value="LOW">Low Activity</option>
//             <option value="MEDIUM">Medium</option>
//             <option value="HIGH">High</option>
//           </Select>
  
//           <Input placeholder="Target Weight" name="targetWeight" onChange={handleChange} />
//           <Input placeholder="Duration (days)" name="duration" onChange={handleChange} />
  
//           <Button colorScheme="blue" onClick={handleSubmit}>
//             Save Goal
//           </Button>
//         </VStack>
//       </Box>
//     );
//   };
  
//   export default GoalSetup;


// Version 2 

import {
    Box,
    Input,
    Select,
    Button,
    Text,
    VStack,
    HStack
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  
  const GoalSetup = () => {
    const [form, setForm] = useState({
      height: "",
      weight: "",
      gender: "male",
      goal: "weight_loss",
      activity: "moderate",
      targetWeight: "",
      duration: ""
    });
  
    const handleChange = (e: any) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      if (!form.height || !form.weight || !form.gender) {
        alert("Please fill required fields");
        return;
      }
  
      await axios.post("http://localhost:3004/api/users/profile", {
        userId: 1,
        height_cm: Number(form.height),
        weight_kg: Number(form.weight),
        gender: form.gender,
        goal_type: form.goal,
        activity_level: form.activity,
        target_weight: Number(form.targetWeight) || null,
        duration_days: Number(form.duration) || null
      });
  
      alert("Profile Saved 💙");
    };
  
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(180deg,#f8fbff,#eef5fb)"
        p={6}
      >
        <Box
          maxW="420px"
          mx="auto"
          bg="white"
          p={6}
          borderRadius="2xl"
          boxShadow="0 10px 40px rgba(99,189,244,0.15)"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={5}>
            Set Your Goal 🎯
          </Text>
  
          <VStack spacing={4}>
  
            {/* HEIGHT & WEIGHT */}
            <HStack w="100%">
              <Input
                placeholder="Height (cm)"
                name="height"
                onChange={handleChange}
              />
              <Input
                placeholder="Weight (kg)"
                name="weight"
                onChange={handleChange}
              />
            </HStack>
  
            {/* GENDER */}
            <Select name="gender" onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
  
            {/* GOAL */}
            <Select name="goal" onChange={handleChange}>
              <option value="weight_loss">Weight Loss</option>
              <option value="weight_gain">Weight Gain</option>
              <option value="maintenance">Maintenance</option>
            </Select>
  
            {/* ACTIVITY */}
            <Select name="activity" onChange={handleChange}>
              <option value="sedentary">Low Activity</option>
              <option value="moderate">Moderate</option>
              <option value="active">High</option>
            </Select>
  
            {/* CONDITIONAL FIELDS */}
            {(form.goal === "weight_loss" || form.goal === "weight_gain") && (
              <>
                <Input
                  placeholder="Target Weight"
                  name="targetWeight"
                  onChange={handleChange}
                />
                <Input
                  placeholder="Duration (days)"
                  name="duration"
                  onChange={handleChange}
                />
              </>
            )}
  
            {/* BUTTON */}
            <Button
              w="100%"
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.600" }}
              onClick={handleSubmit}
            >
              Save Goal
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  };
  
  export default GoalSetup;