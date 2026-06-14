// Version 1 


// import {
//   Box,
//   Text,
//   VStack,
//   HStack,
//   Button
// } from "@chakra-ui/react";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import api from "../utils/api";

// const MotionBox = motion(Box);

// const TABS = ["DAY", "WEEK", "MONTH"];

// const Dashboard = () => {
//   const [data, setData] = useState<any>(null);
//   const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
//   const [view, setView] = useState("DAY");
//   const { user } = useAuth();

//   const userId = user?.id;

//   const fetchData = async (type: string) => {
//     // const res = await axios.get(
//     //   `http://localhost:3004/api/nutrition/dashboard-summary?userId=${userId}&type=${type}`
//     // );
//     const res = await api.get(
//       `/nutrition/dashboard-summary?userId=${userId}&type=${type}`
//     );
//     setData(res.data);
//   };

//   useEffect(() => {
//     fetchData(view);
//   }, [view]);

//   if (!data) return <Text>Loading...</Text>;

//   return (
//     <Box bg="linear-gradient(180deg,#f8fbff,#eef5fb)" minH="100vh" p={6}>

//       {/* 🔥 HEADER */}
//       <HStack justify="space-between" mb={4}>
//         <Text fontSize="2xl" fontWeight="bold">
//           {view === "DAY" ? "Today" : view === "WEEK" ? "This Week" : "This Month"}
//         </Text>
//       </HStack>

//       {/* 🔥 TABS */}
//       <HStack mb={6} spacing={3}>
//         {TABS.map((t) => (
//           <Button
//             key={t}
//             size="sm"
//             borderRadius="full"
//             bg={view === t ? "brand.500" : "white"}
//             color={view === t ? "white" : "black"}
//             onClick={() => setView(t)}
//           >
//             {t}
//           </Button>
//         ))}
//       </HStack>

//       {/* 🔥 MACROS */}
//       <Box bg="white" borderRadius="2xl" p={5} mb={6}>
//         <Text mb={4}>Macros</Text>

//         <HStack justify="space-around">
//           <MacroRing
//             label="Carbs"
//             value={data.carbs}
//             dailyTarget={data.targets?.carbs}
//             view={view}
//             hasProfile={data.hasProfile}
//             color="#4da3ff"
//           />

//           <MacroRing
//             label="Fat"
//             value={data.fats}
//             dailyTarget={data.targets?.fats}
//             view={view}
//             hasProfile={data.hasProfile}
//             color="#a78bfa"
//           />

//           <MacroRing
//             label="Protein"
//             value={data.protein}
//             dailyTarget={data.targets?.protein}
//             view={view}
//             hasProfile={data.hasProfile}
//             color="#22c55e"
//           />
//         </HStack>
//       </Box>

//       {/* 🔥 CALORIES */}
//       <MotionBox
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         bg="linear-gradient(135deg,#eaf6ff,#d6efff)"
//         borderRadius="2xl"
//         p={6}
//         mb={6}
//       >
//         <Text fontSize="3xl" fontWeight="bold">
//           {Math.round(data.consumed)} kcal
//         </Text>

//         {data.hasProfile && (
//           <Text fontSize="sm">
//             Target: {Math.round(data.target)} kcal
//           </Text>
//         )}

//         <HStack mt={4} justify="space-between">
//           <MacroMini label="Protein" value={data.protein} />
//           <MacroMini label="Carbs" value={data.carbs} />
//           <MacroMini label="Fats" value={data.fats} />
//         </HStack>
//       </MotionBox>

//       {/* 🔥 MEALS */}
//       <VStack spacing={3}>
//         {data.mealSplit.map((m: any) => (
//           <MotionBox
//             key={m.meal_type}
//             w="100%"
//             p={4}
//             bg="white"
//             borderRadius="xl"
//             whileTap={{ scale: 0.97 }}
//             onClick={() =>
//               setExpandedMeal(
//                 expandedMeal === m.meal_type ? null : m.meal_type
//               )
//             }
//           >
//             <HStack justify="space-between">
//               <Text fontWeight="medium">{m.meal_type}</Text>
//               <Text>{Math.round(m.calories)} kcal</Text>
//             </HStack>

//             {expandedMeal === m.meal_type && (
//               <HStack mt={3} justify="space-between">
//                 <MacroMini label="Protein" value={m.protein || 0} />
//                 <MacroMini label="Carbs" value={m.carbs || 0} />
//                 <MacroMini label="Fats" value={m.fats || 0} />
//               </HStack>
//             )}
//           </MotionBox>
//         ))}
//       </VStack>

//       {/* 🔥 AI COACH */}
//       <Box
//         mt={6}
//         p={4}
//         bg="linear-gradient(135deg,#b9e2fd,#63bdf4)"
//         borderRadius="xl"
//         color="white"
//       >
//         <Text fontSize="sm">
//           {data.hasProfile
//             ? data.consumed > data.target
//               ? "You went slightly above. A walk will balance it 🚶"
//               : "You're doing great 💙"
//             : "Set your goal to unlock smart insights 💡"}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// /* 🔥 COMPONENTS */

// const MacroMini = ({ label, value }: any) => (
//   <VStack spacing={0}>
//     <Text fontSize="xs" color="gray.500">{label}</Text>
//     <Text fontWeight="bold">{Math.round(value)}g</Text>
//   </VStack>
// );

// const MacroRing = ({ label, value, dailyTarget, view, hasProfile, color }: any) => {
//   const radius = 36;
//   const stroke = 6;
//   const normalizedRadius = radius - stroke * 0.5;
//   const circumference = normalizedRadius * 2 * Math.PI;

//   // 🔥 dynamic target
//   let totalTarget = dailyTarget;

//   if (hasProfile && dailyTarget) {
//     if (view === "WEEK") totalTarget = dailyTarget * 7;
//     if (view === "MONTH") totalTarget = dailyTarget * 30;
//   }

//   // 🔥 percent logic (colour change)
//   // let percent = 1; // default full (no profile case)

//   // if (hasProfile && totalTarget) {
//   //   percent = Math.min(value / totalTarget, 1);
//   // } 

//   let percent;

// if (!hasProfile) {
//   percent = 1; // ✅ full ring
// } else if (totalTarget) {
//   percent = Math.min(value / totalTarget, 1);
// } else {
//   percent = 0;
// }

//   const offset = circumference - percent * circumference;

//   // Colour Change

//   // const strokeColor = !hasProfile
//   //   ? "#cbd5e1"
//   //   : percent >= 1
//   //   ? "#ef4444" // 🔥 overconsumed
//   //   : color;

//   const strokeColor = !hasProfile
//   ? "#cbd5e1" // neutral grey full ring
//   : percent >= 1
//   ? "#ef4444" // overconsumed
//   : color;

//   return (
//     <VStack spacing={1}>
//       <svg height={radius * 2} width={radius * 2}>
//         <circle
//           stroke="#e6edf5"
//           fill="transparent"
//           strokeWidth={stroke}
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//         />

//         <circle
//           // stroke={strokeColor}
//           stroke={hasProfile ? strokeColor : `${color}90`}
//           fill="transparent"
//           strokeWidth={stroke}
//           strokeDasharray={`${circumference}`}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//           transform={`rotate(-90 ${radius} ${radius})`}
//         />
//       </svg>

//       <Text fontSize="sm">{label}</Text>

//       <Text fontSize="xs" textAlign="center">
//         {Math.round(value)}g
//         {hasProfile && totalTarget && (
//           <> / {Math.round(totalTarget)}g</>
//         )}
//       </Text>
//     </VStack>
//   );
// };

// export default Dashboard;


// Version 2 : Clone of V1 - Edit pending

import {
  Box,
  Text,
  HStack,
  Button
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

import DashboardHero
from "../components/dashboard/DashboardHero";

import GoalCard
from "../components/dashboard/GoalCard";

import MealTimeline
from "../components/dashboard/MealTimeline";

import CoachCard
from "../components/dashboard/CoachCard";

import StreakCard
from "../components/dashboard/StreakCard";

import MacroSection
from "../components/dashboard/MacroSection";

import TrendCard
from "../components/dashboard/TrendCard";

import AddMealCTA from
"../components/dashboard/AddMealCTA";

import DashboardHeader from "../components/dashboard/DashboardHeader";

import DashboardSkeleton
from "../components/dashboard/DashboardSkeleton";



// const MotionBox = motion(Box);

const TABS = ["DAY", "WEEK", "MONTH"];

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  // const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const [view, setView] = useState("DAY");
  const { user } = useAuth();

  const userId = user?.id;

  const fetchData = async (type: string) => {
    // const res = await axios.get(
    //   `http://localhost:3004/api/nutrition/dashboard-summary?userId=${userId}&type=${type}`
    // );
    const res = await api.get(
      `/nutrition/dashboard-summary?userId=${userId}&type=${type}`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData(view);
  }, [view]);

  // if (!data) return <Text>Loading...</Text>;
  if (!data) {
  return (
    <DashboardSkeleton />
  );
}

  // const targetMultiplier =
  // view === "WEEK"
  //   ? 7
  //   : view === "MONTH"
  //   ? 30
  //   : 1;

  



  return (
    <Box bg="linear-gradient(180deg,#f8fbff,#eef5fb)" minH="100vh" p={6}>




{/* Hero Section Ends */}

<DashboardHeader
  user={user}
  goalInfo={
    data.goalInfo
  }
  target={
    data.target
  }
/>

<AddMealCTA
  mealCount={
    data.mealSplit?.length || 0
  }
/>




      {/* 🔥 HEADER */}
      <HStack justify="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {view === "DAY" ? "Today" : view === "WEEK" ? "This Week" : "This Month"}
        </Text>
      </HStack>

      {/* 🔥 TABS */}
      <HStack mb={6} spacing={3}>
        {TABS.map((t) => (
          <Button
            key={t}
            size="sm"
            borderRadius="full"
            bg={view === t ? "brand.500" : "white"}
            color={view === t ? "white" : "black"}
            onClick={() => setView(t)}
          >
            {t}
          </Button>
        ))}
      </HStack>


<DashboardHero
  consumed={data.consumed}
  target={data.target}
  remaining={data.remaining.calories}
  status={data.status}
/>


<GoalCard
  goalInfo={
    data.goalInfo
  }
/>

<StreakCard
  streak={data.streak}
/>

<MacroSection
  data={data}
/>

      <MealTimeline
  meals={
    data.mealSplit || []
  }
/>



      <CoachCard
      data={data}
    />

    {
  (
    view === "WEEK" ||
    view === "MONTH"
  ) && (
    <TrendCard
      trend={data.trend}
    />
  )
}

    </Box>
  );
};

/* 🔥 COMPONENTS */



export default Dashboard;