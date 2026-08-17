// Version 1

// import {
//   Box,
//   useDisclosure
// } from "@chakra-ui/react";

// import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
// import MobileSidebar from "./MobileSidebar";

// import {
//   STAFF_LAYOUT
// } from "../../config/layout/staff.layout";
// // import Navbar from "../Navbar";
// import Topbar from "./Topbar";


// const StaffLayout = () => {

//   const {
//     isOpen,
//     onOpen,
//     onClose
//   } = useDisclosure();

//   return (

//     <Box minH="100vh" bg="gray.50">

//       <Sidebar />

//       <MobileSidebar
//         isOpen={isOpen}
//         onClose={onClose}
//       />

//       <Topbar
//         onMenuClick={onOpen}
//       />

//       {/* <Navbar /> */}

//       <Box
//         ml={{
//           base: 0,
//           lg: STAFF_LAYOUT.sidebar.width
//         }}
//         pt={STAFF_LAYOUT.topbar.height}
//         p={6}
//       >

//         <Outlet />

//       </Box>

//     </Box>

//   );

// };

// export default StaffLayout;


// Version 2 

import {
  Box,
  useDisclosure
} from "@chakra-ui/react";

import {
  Outlet
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "./Sidebar";

import MobileSidebar
  from "./MobileSidebar";

import {
  STAFF_LAYOUT
} from "../../config/layout/staff.layout";

import Topbar from "./Topbar";

import {
  getDashboard
} from "../../services/staff/dashboard.service";


export interface StaffOrganization {

  id: number;

  name: string;

  organization_type: string;

  logo_url: string | null;

  workspace_code: string;

  timezone: string;

  currency: string;

}


const StaffLayout = () => {

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();


  const [
    organization,
    setOrganization
  ] = useState<
    StaffOrganization | null
  >(null);


  useEffect(() => {

    void loadStaffOrganization();

  }, []);


  const loadStaffOrganization =
    async () => {

      try {

        const dashboard =
          await getDashboard();

        setOrganization(
          dashboard.organization
        );

      }

      catch (error) {

        console.error(
          "Unable to load staff organization",
          error
        );

        setOrganization(null);

      }

    };


  return (

    <Box
      minH="100vh"
      bg="gray.50"
    >

      <Sidebar
        organization={
          organization
        }
      />


      <MobileSidebar
        isOpen={isOpen}
        onClose={onClose}
        organization={
          organization
        }
      />

      


      <Topbar
        onMenuClick={onOpen}
      />


      <Box

        ml={{
          base: 0,
          lg: STAFF_LAYOUT.sidebar.width
        }}

        pt={STAFF_LAYOUT.topbar.height}

        p={6}

      >

        <Outlet />

      </Box>

    </Box>

  );

};


export default StaffLayout;