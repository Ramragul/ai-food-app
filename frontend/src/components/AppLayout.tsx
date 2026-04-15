import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

const AppLayout = ({ children }: any) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default AppLayout;