import {
  Box,
  useDisclosure
} from "@chakra-ui/react";

import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

import {
  STAFF_LAYOUT
} from "../../config/layout/staff.layout";
import Navbar from "../Navbar";

const StaffLayout = () => {

  const {
    isOpen,
    onClose
  } = useDisclosure();

  return (

    <Box minH="100vh" bg="gray.50">

      <Sidebar />

      <MobileSidebar
        isOpen={isOpen}
        onClose={onClose}
      />

      {/* <Topbar
        onMenuClick={onOpen}
      /> */}

      <Navbar />

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