// Version 1

// import {
//   Box,
//   Spinner,
//   VStack,
//   Center
// } from "@chakra-ui/react";
// import {
//   useEffect,
//   useState
// } from "react";

// import WelcomeBanner from "../../components/StaffUI/Dashboard/WelcomeBanner";
// import DashboardSummary from "../../components/StaffUI/Dashboard/DashboardSummary";
// import DashboardClients from "../../components/StaffUI/Dashboard/DashboardClients";

// import {
//   type CoachDashboard,
//   getDashboard
// } from "../../services/staff/dashboard.service";

// const StaffDashboardPage = () => {

//   const [dashboard, setDashboard] =
//     useState<CoachDashboard | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {

//     loadDashboard();

//   }, []);

//   const loadDashboard = async () => {

//     try {

//       const response =
//         await getDashboard();

//       setDashboard(response);

//     }

//     finally {

//       setLoading(false);

//     }

//   };

//   if (loading) {

//     return (

//       <Center h="70vh">

//         <Spinner
//           size="xl"
//         />

//       </Center>

//     );

//   }

//   if (!dashboard) {

//     return null;

//   }

//   return (

//     <Box
//     pt={{
//       base: "72px",
//       md: "80px",
//       lg: "88px"
//     }}
//     >

//       <VStack
//         spacing={8}
//         align="stretch"
//       >

//         <WelcomeBanner
//           name={
//             dashboard.coach.name
//           }
//         />

//         <DashboardSummary
//           summary={
//             dashboard.summary
//           }
//         />

//         <DashboardClients
//           clients={
//             dashboard.clients
//           }
//         />

//       </VStack>

//     </Box>

//   );

// };

// export default StaffDashboardPage;


// Version 2 

import {
  Box,
  Spinner,
  VStack,
  Center
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import WelcomeBanner
  from "../../components/StaffUI/Dashboard/WelcomeBanner";

import DashboardSummary
  from "../../components/StaffUI/Dashboard/DashboardSummary";

import DashboardClients
  from "../../components/StaffUI/Dashboard/DashboardClients";

import {
  type CoachDashboard,
  getDashboard
} from "../../services/staff/dashboard.service";


const StaffDashboardPage = () => {

  const [
    dashboard,
    setDashboard
  ] = useState<CoachDashboard | null>(
    null
  );

  const [
    loading,
    setLoading
  ] = useState(true);


  useEffect(() => {

    void loadDashboard();

  }, []);


  const loadDashboard = async () => {

    try {

      const response =
        await getDashboard();

      setDashboard(response);

    }

    finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (

      <Center h="70vh">

        <Spinner
          size="xl"
        />

      </Center>

    );

  }


  if (!dashboard) {

    return null;

  }


  return (

    <Box
      pt={{
        base: "72px",
        md: "80px",
        lg: "88px"
      }}
    >

      <VStack
        spacing={8}
        align="stretch"
      >

        <WelcomeBanner
          name={
            dashboard.coach.name
          }
        />

        <DashboardSummary
          summary={
            dashboard.summary
          }
        />

        <DashboardClients
          clients={
            dashboard.clients
          }
        />

      </VStack>

    </Box>

  );

};


export default StaffDashboardPage;