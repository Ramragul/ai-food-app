


// Version 1 : Clone of V1 - Edit pending

// import {
//   Box,
//   Text,
//   HStack,
//   Button
// } from "@chakra-ui/react";

// import { useEffect, useState } from "react";

// import { useAuth } from "../context/AuthContext";
// import api from "../utils/api";

// import DashboardHero
// from "../components/dashboard/DashboardHero";

// import GoalCard
// from "../components/dashboard/GoalCard";

// import MealTimeline
// from "../components/dashboard/MealTimeline";

// import CoachCard
// from "../components/dashboard/CoachCard";

// import StreakCard
// from "../components/dashboard/StreakCard";

// import MacroSection
// from "../components/dashboard/MacroSection";

// import TrendCard
// from "../components/dashboard/TrendCard";

// import AddMealCTA from
// "../components/dashboard/AddMealCTA";

// import DashboardHeader from "../components/dashboard/DashboardHeader";

// import DashboardSkeleton
// from "../components/dashboard/DashboardSkeleton";
// import theme from "../theme/theme";
// import QuickActions from "../components/dashboard/QuickActions";



// // const MotionBox = motion(Box);

// const TABS = ["DAY", "WEEK", "MONTH"];

// const Dashboard = () => {
//   const [data, setData] = useState<any>(null);
//   // const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
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

//   // if (!data) return <Text>Loading...</Text>;
//   if (!data) {
//   return (
//     <DashboardSkeleton />
//   );
// }

//   // const targetMultiplier =
//   // view === "WEEK"
//   //   ? 7
//   //   : view === "MONTH"
//   //   ? 30
//   //   : 1;

  



//   return (
//     // <Box bg="linear-gradient(180deg,#f8fbff,#eef5fb)" minH="100vh" p={6}>


//  <Box
//   bg={theme.colors.background}
//   minH="100vh"
//   px={{
//     base: 4,
//     md: 6,
//     xl: 8,
//   }}
//   py={{
//     base: 5,
//     md: 6,
//     xl: 8,
//   }}
//   maxW="1500px"
//   mx="auto"
// > 



// {/* Hero Section Ends */}

// <DashboardHeader
//   user={user}
//   goalInfo={
//     data.goalInfo
//   }
//   target={
//     data.target
//   }
// />

// <AddMealCTA
//   mealCount={
//     data.mealSplit?.length || 0
//   }
// />

// <QuickActions />




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


// <DashboardHero
//   consumed={data.consumed}
//   target={data.target}
//   remaining={data.remaining.calories}
//   status={data.status}
// />


// <GoalCard
//   goalInfo={
//     data.goalInfo
//   }
// />

// <StreakCard
//   streak={data.streak}
// />

// <MacroSection
//   data={data}
// />

//       <MealTimeline
//   meals={
//     data.mealSplit || []
//   }
// />



//       <CoachCard
//       data={data}
//     />

//     {
//   (
//     view === "WEEK" ||
//     view === "MONTH"
//   ) && (
//     <TrendCard
//       trend={data.trend}
//     />
//   )
// }

//     </Box>
//   );
// };

// /* 🔥 COMPONENTS */



// export default Dashboard;


// Version 2 

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
import theme from "../theme/theme";
import QuickActions from "../components/dashboard/QuickActions";
import WorkspaceSwitcher from "../components/dashboard/WorkspaceSwitcher";
import ClientWorkspaceCard from "../components/dashboard/ClientWorkspaceCard";



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
    // <Box bg="linear-gradient(180deg,#f8fbff,#eef5fb)" minH="100vh" p={6}>


<Box
    bg="linear-gradient(180deg,#f8fbff,#eef5fb)"
    minH="100vh"
    px={{
        base: 4,
        md: 6,
        xl: 8,
    }}
    py={{
        base: 5,
        md: 6,
    }}
    maxW="1500px"
    mx="auto"
>



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

 <WorkspaceSwitcher />

<DashboardHero
  consumed={data.consumed}
  target={data.target}
  remaining={data.remaining.calories}
  status={data.status}
/>

{data.workspace && (
    <ClientWorkspaceCard
        workspace={data.workspace}
    />
)}

<AddMealCTA
  mealCount={
    data.mealSplit?.length || 0
  }
/>

<QuickActions />




      {/* 🔥 HEADER */}
      <HStack justify="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {view === "DAY" ? "Today" : view === "WEEK" ? "This Week" : "This Month"}
        </Text>
      </HStack>

      {/* 🔥 TABS */}
      {/* <HStack mb={6} spacing={3}> */}

      <HStack
    mb={6}
    spacing={3}
    overflowX="auto"
    css={{
        "&::-webkit-scrollbar": {
            display: "none",
        },
    }}
>
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