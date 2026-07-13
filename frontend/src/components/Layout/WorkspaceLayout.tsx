// import {
//   Box,
//   Flex
// } from "@chakra-ui/react";

// import {
//   Outlet
// } from "react-router-dom";

// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// import {
//   WORKSPACE_LAYOUT
// } from "../../config/layout/workspace.layout";
// import ContentContainer from "./ContentContainer";

// const WorkspaceLayout = () => {

//   return (

//     <Flex
//       bg="gray.50"
//       minH="100vh"
//     >

//       <Sidebar />

//       <Box
//         flex="1"
//         ml={{
//           base: 0,
//           lg: WORKSPACE_LAYOUT.sidebar.width
//         }}
//       >

//         <Topbar />

//         <Box
//           pt={WORKSPACE_LAYOUT.topbar.height}
//           px={WORKSPACE_LAYOUT.content.padding}
//         >
//          <ContentContainer>
//           <Outlet />
//           </ContentContainer>

//         </Box>

//       </Box>

//     </Flex>

//   );

// };

// export default WorkspaceLayout;


// Version 2

// import {
//   Box,
//   Flex,
//   useDisclosure
// } from "@chakra-ui/react";

// import {
//   Outlet
// } from "react-router-dom";

// import Sidebar from "./Sidebar";
// import MobileSidebar from "./MobileSidebar";
// import Topbar from "./Topbar";

// import {
//   WORKSPACE_LAYOUT
// } from "../../config/layout/workspace.layout";

// import ContentContainer from "./ContentContainer";

// import {
//   useWorkspace
// } from "../../context/WorkspaceContext";

// const WorkspaceLayout = () => {

//   const {
//     isOpen,
//     onOpen,
//     onClose
//   } = useDisclosure();

//   return (

//     <Flex

//       bg="gray.50"

//       minH="100vh"

//     >

//       <Sidebar />

//       <MobileSidebar

//         isOpen={isOpen}

//         onClose={onClose}

//       />

//       <Box

//         flex="1"

//         ml={{
//           base: 0,
//           lg: WORKSPACE_LAYOUT.sidebar.width
//         }}

//       >

//         <Topbar

//           onMenuClick={onOpen}

//         />

//         <Box

//           pt={WORKSPACE_LAYOUT.topbar.height}

     

//         >

//           <ContentContainer>

//             <Outlet />

//           </ContentContainer>

//         </Box>

//       </Box>

//     </Flex>

//   );

// };

// export default WorkspaceLayout;


// Version 3

import {
  Box,
  Flex,
  Center,
  Spinner,
  useDisclosure
} from "@chakra-ui/react";

import {
  Outlet
} from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";
import ContentContainer from "./ContentContainer";

import {
  WORKSPACE_LAYOUT
} from "../../config/layout/workspace.layout";

import {
  useWorkspace
} from "../../context/WorkspaceContext";

const WorkspaceLayout = () => {

  const {

    isLoading

  } = useWorkspace();

  const {

    isOpen,

    onOpen,

    onClose

  } = useDisclosure();

  if (isLoading) {

    return (

      <Center

        h="100vh"

        bg="gray.50"

      >

        <Spinner

          size="xl"

          color="brand.500"

        />

      </Center>

    );

  }

  return (

    <Flex

      bg="gray.50"

      minH="100vh"

    >

      <Sidebar />

      <MobileSidebar

        isOpen={isOpen}

        onClose={onClose}

      />

      <Box

        flex="1"

        ml={{
          base: 0,
          lg: WORKSPACE_LAYOUT.sidebar.width
        }}

      >

        <Topbar

          onMenuClick={onOpen}

        />

        <Box

          pt={WORKSPACE_LAYOUT.topbar.height}

        >

          <ContentContainer>

            <Outlet />

          </ContentContainer>

        </Box>

      </Box>

    </Flex>

  );

};

export default WorkspaceLayout;