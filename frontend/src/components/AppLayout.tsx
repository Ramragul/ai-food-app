// Version 1

// import { Box } from "@chakra-ui/react";
// import Navbar from "./Navbar";

// const AppLayout = ({ children }: any) => {
//   return (
//     <Box>
//       <Navbar />
//       <Box>{children}</Box>
//     </Box>
//   );
// };

// export default AppLayout;


// Version 2 

import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const AppLayout: React.FC = () => {
  return (
    <Box pb={{ base: "80px", md: "0px" }}>
      <Navbar />
      <Outlet />
      <BottomNav />
    </Box>
  );
};

export default AppLayout;


