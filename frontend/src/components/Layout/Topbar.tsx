// Version 1

// import {

//   Box,

//   Flex,

//   Text,

//   Avatar,

//   HStack,

//   IconButton,

//   useBreakpointValue

// } from "@chakra-ui/react";

// import {

//   FiBell,

//   FiMenu

// } from "react-icons/fi";

// import {

//   WORKSPACE_LAYOUT

// } from "../../config/layout/workspace.layout";





// interface Props {

//   onMenuClick: () => void;

// }

// const Topbar = ({
//   onMenuClick
// }: Props) => {

//   const isDesktop =
//     useBreakpointValue({

//       base: false,

//       lg: true

//     });



//   // const currentPage =
//   //   workspaceNavigation.find(
//   //     ({ path }) => path === location.pathname
//   //   );

//   return (

//     <Box

//       position="fixed"

//       top={0}

//       right={0}

//       left={{

//         base: 0,

//         lg: WORKSPACE_LAYOUT.sidebar.width

//       }}

//       h={WORKSPACE_LAYOUT.topbar.height}

//       bg="rgba(255,255,255,.82)"

//       backdropFilter="blur(18px)"

//       borderBottom="1px solid"

//       borderColor="gray.100"

//       zIndex={100}

//     >

//       <Flex

//         h="100%"

//         align="center"

//         justify="space-between"

//         px={6}

//       >

//         <HStack spacing={4}>

//           {

//             !isDesktop && (



//               <IconButton

//                 aria-label="Menu"

//                 icon={<FiMenu />}

//                 variant="ghost"

//                 onClick={onMenuClick}

//             />

//             )

//           }

//            {/* <Box>

//           <Text
//             fontSize="2xl"
//             fontWeight="700"
//           >
//             {currentPage?.label ?? "Workspace"}
//           </Text>

//           <Text
//             fontSize="sm"
//             color="gray.500"
//           >
//             {currentPage?.subtitle}
//           </Text>

//           </Box>  */}

//         </HStack>

//         <HStack spacing={5}>

//           <Text

//             color="gray.500"

//             fontWeight="500"

//             display={{

//               base: "none",

//               md: "block"

//             }}

//           >

//             Good Morning 👋

//           </Text>

//           <IconButton

//             aria-label="Notifications"

//             icon={<FiBell />}

//             variant="ghost"

//             borderRadius="full"

//           />

//           <Avatar

//             size="sm"

//             name="Bairava"

//           />

//         </HStack>

//       </Flex>

//     </Box>

//   );

// };

// export default Topbar;


// Version 2 

// import {
//   Box,
//   Flex,
//   Text,
//   Avatar,
//   HStack,
//   IconButton,
//   useBreakpointValue,
//   VStack
// } from "@chakra-ui/react";

// import {
//   FiBell,
//   FiMenu
// } from "react-icons/fi";

// import {
//   WORKSPACE_LAYOUT
// } from "../../config/layout/workspace.layout";

// import {
//   useWorkspace
// } from "../../context/WorkspaceContext";


// interface Props {

//   onMenuClick: () => void;

// }


// const Topbar = ({
//   onMenuClick
// }: Props) => {

//   const {
//     organization
//   } = useWorkspace();


//   const isDesktop =
//     useBreakpointValue({
//       base: false,
//       lg: true
//     });


//   return (

//     <Box

//       position="fixed"

//       top={0}

//       right={0}

//       left={{
//         base: 0,
//         lg: WORKSPACE_LAYOUT.sidebar.width
//       }}

//       h={
//         WORKSPACE_LAYOUT.topbar.height
//       }

//       bg="rgba(255,255,255,.82)"

//       backdropFilter="blur(18px)"

//       borderBottom="1px solid"

//       borderColor="gray.100"

//       zIndex={100}

//     >

//       <Flex

//         h="100%"

//         align="center"

//         justify="space-between"

//         px={6}

//       >

//         {/* Left */}

//         <HStack spacing={4}>

//           {!isDesktop && (

//             <IconButton

//               aria-label="Menu"

//               icon={
//                 <FiMenu />
//               }

//               variant="ghost"

//               onClick={
//                 onMenuClick
//               }

//             />

//           )}


//           {/* Organization */}

//           <VStack

//             align="start"

//             spacing={0}

//             display={{
//               base: "none",
//               md: "flex"
//             }}

//           >

//             <Text

//               fontSize="sm"

//               fontWeight="700"

//               color="gray.800"

//               noOfLines={1}

//               maxW={{
//                 md: "250px",
//                 lg: "350px"
//               }}

//             >

//               {
//                 organization?.name ??
//                 "Workspace"
//               }

//             </Text>


//             <Text

//               fontSize="xs"

//               color="gray.500"

//               noOfLines={1}

//             >

//               {

//                 organization

//                   ? `${organization.organization_type} • ${organization.workspace_code}`

//                   : "Organization"

//               }

//             </Text>

//           </VStack>

//         </HStack>


//         {/* Right */}

//         <HStack spacing={5}>

//           <Text

//             color="gray.500"

//             fontWeight="500"

//             display={{
//               base: "none",
//               md: "block"
//             }}

//           >

//             Good Morning 👋

//           </Text>


//           <IconButton

//             aria-label="Notifications"

//             icon={
//               <FiBell />
//             }

//             variant="ghost"

//             borderRadius="full"

//           />


//           <Avatar

//             size="sm"

//             name={
//               organization?.name ??
//               "Workspace"
//             }

//           />

//         </HStack>

//       </Flex>

//     </Box>

//   );

// };


// export default Topbar;


// Version 3 

import {
  Box,
  Flex,
  Text,
  Avatar,
  HStack,
  IconButton,
  useBreakpointValue,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";

import {
  FiBell,
  FiMenu,
  FiHome
} from "react-icons/fi";

import {
  useNavigate
} from "react-router-dom";

import {
  WORKSPACE_LAYOUT
} from "../../config/layout/workspace.layout";

import {
  useWorkspace
} from "../../context/WorkspaceContext";


interface Props {

  onMenuClick: () => void;

}


const Topbar = ({
  onMenuClick
}: Props) => {

  const navigate = useNavigate();

  const {
    organization
  } = useWorkspace();


  const isDesktop =
    useBreakpointValue({
      base: false,
      lg: true
    });


  return (

    <Box

      position="fixed"

      top={0}

      right={0}

      left={{
        base: 0,
        lg: WORKSPACE_LAYOUT.sidebar.width
      }}

      h={
        WORKSPACE_LAYOUT.topbar.height
      }

      bg="rgba(255,255,255,.82)"

      backdropFilter="blur(18px)"

      borderBottom="1px solid"

      borderColor="gray.100"

      zIndex={100}

    >

      <Flex

        h="100%"

        align="center"

        justify="space-between"

        px={6}

      >

        {/* ---------------------------------------
            LEFT
        ---------------------------------------- */}

        <HStack spacing={4}>

          {!isDesktop && (

            <IconButton

              aria-label="Menu"

              icon={
                <FiMenu />
              }

              variant="ghost"

              onClick={
                onMenuClick
              }

            />

          )}


          {/* Organization */}

          {/* <VStack

            align="start"

            spacing={0}

            display={{
              base: "none",
              md: "flex"
            }}

          >

            <Text

              fontSize="sm"

              fontWeight="700"

              color="gray.800"

              noOfLines={1}

              maxW={{
                md: "250px",
                lg: "350px"
              }}

            >

              {
                organization?.name ??
                "Workspace"
              }

            </Text>


            <Text

              fontSize="xs"

              color="gray.500"

              noOfLines={1}

            >

              {

                organization

                  ? `${organization.organization_type} • ${organization.workspace_code}`

                  : "Organization"

              }

            </Text>

          </VStack> */}

          <VStack
  align="start"
  spacing={0}
>

  {/* Organization Name */}
  <Text
    fontSize="sm"
    fontWeight="700"
    color="gray.800"
    noOfLines={1}
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    maxW={{
      base: "180px",
      sm: "220px",
      md: "250px",
      lg: "350px"
    }}
  >
    {
      organization?.name ??
      "Workspace"
    }
  </Text>


  {/* Organization Type + Workspace Code
      Desktop / Tablet only */}

  <Text
    fontSize="xs"
    color="gray.500"
    noOfLines={1}
    display={{
      base: "none",
      md: "block"
    }}
    maxW={{
      md: "250px",
      lg: "350px"
    }}
  >
    {
      organization
        ? `${organization.organization_type} • ${organization.workspace_code}`
        : "Organization"
    }
  </Text>

</VStack>

        </HStack>


        {/* ---------------------------------------
            RIGHT
        ---------------------------------------- */}

        <HStack spacing={5}>

          {/* <Text

            color="gray.500"

            fontWeight="500"

            display={{
              base: "none",
              md: "block"
            }}

          >

            Good Morning 👋

          </Text> */}


          {/* Notifications */}

          <IconButton

            aria-label="Notifications"

            icon={
              <FiBell />
            }

            variant="ghost"

            borderRadius="full"

          />


          {/* ---------------------------------------
              ACCOUNT / NAVIGATION MENU
          ---------------------------------------- */}

          <Menu>

            <MenuButton

              as={IconButton}

              aria-label="Workspace menu"

              icon={

                <Avatar

                  size="sm"

                  name={
                    organization?.name ??
                    "Workspace"
                  }

                />

              }

              variant="ghost"

              borderRadius="full"

              _hover={{
                bg: "gray.100"
              }}

              _active={{
                bg: "gray.100"
              }}

            />

            <MenuList>

              <MenuItem

                icon={
                  <FiHome />
                }

                onClick={() =>
                  navigate("/home")
                }

              >

                NEKA Dashboard

              </MenuItem>

            </MenuList>

          </Menu>

        </HStack>

      </Flex>

    </Box>

  );

};


export default Topbar;