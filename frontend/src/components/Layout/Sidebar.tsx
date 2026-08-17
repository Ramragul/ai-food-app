// Version 1

// import {

//   Box,

//   VStack,

//   Text,

//   Flex,

//   Divider,

//   Avatar,

//   Spacer

// } from "@chakra-ui/react";

// // import NavigationItem from "./NavigationItem";

// import NavigationItem from "./NavigationItem";

// import {

//   workspaceNavigation

// } from "../../config/navigation/workspace.navigation";

// import {

//   WORKSPACE_LAYOUT

// } from "../../config/layout/workspace.layout";

// // interface Props {

// //   mobile?: boolean;

// // }

// // const Sidebar = ({
// //   mobile = false
// // }: Props) => {

// interface Props {

//   mobile?: boolean;

//   onNavigate?: () => void;

// }

// const Sidebar = ({
//   mobile = false,
//   onNavigate
// }: Props) => {

//   return (
// <Box

//   w={WORKSPACE_LAYOUT.sidebar.width}

//   h="100vh"

//   bg="white"

//   borderRight="1px solid"

//   borderColor="gray.100"

//   position={
//     mobile
//       ? "relative"
//       : "fixed"
//   }

//   left={0}

//   top={0}

//   display={{
//     base: mobile ? "flex" : "none",
//     lg: "flex"
//   }}

//   flexDirection="column"

// >

//       {/* Logo */}

//       <Flex

//         h={WORKSPACE_LAYOUT.topbar.height}

//         align="center"

//         px={6}

//       >

//         <Box>

//           <Text

//             fontSize="2xl"

//             fontWeight="800"

//             color="brand.600"

//           >

//             NEKA

//           </Text>

//           <Text

//             fontSize="sm"

//             color="gray.500"

//           >

//             Workspace

//           </Text>

//         </Box>

//       </Flex>

//       <Divider />

//       {/* Navigation */}

//       <VStack

//         spacing={2}

//         align="stretch"

//         p={4}

//       >

//         {

//           workspaceNavigation.map(

//             item => (

//               <NavigationItem

//                 key={item.id}

//                 item={item}
//                 onNavigate={onNavigate}

//               />

//             )

//           )

//         }

//       </VStack>

//       <Spacer />

//       <Divider />

//       {/* Footer */}

//       <Flex

//         p={5}

//         align="center"

//         gap={3}

//       >

//         <Avatar

//           name="Bairava Fitness Hub"

//           size="sm"

//         />

//         <Box>

//           <Text

//             fontWeight="600"

//             fontSize="sm"

//           >

//             Bairava Fitness Hub

//           </Text>

//           <Text

//             fontSize="xs"

//             color="gray.500"

//           >

//             Owner

//           </Text>

//         </Box>

//       </Flex>

//     </Box>

//   );

// };

// export default Sidebar;


// Version 2

// import {
//   Box,
//   VStack,
//   Text,
//   Flex,
//   Divider,
//   Avatar,
//   Spacer
// } from "@chakra-ui/react";

// import NavigationItem
//   from "./NavigationItem";

// import {
//   workspaceNavigation
// } from "../../config/navigation/workspace.navigation";

// import {
//   WORKSPACE_LAYOUT
// } from "../../config/layout/workspace.layout";

// import {
//   useWorkspace
// } from "../../context/WorkspaceContext";


// interface Props {

//   mobile?: boolean;

//   onNavigate?: () => void;

// }


// const Sidebar = ({
//   mobile = false,
//   onNavigate
// }: Props) => {

//   const {
//     organization,
//     isLoading
//   } = useWorkspace();


//   return (

//     <Box

//       w={
//         WORKSPACE_LAYOUT.sidebar.width
//       }

//       h="100vh"

//       bg="white"

//       borderRight="1px solid"

//       borderColor="gray.100"

//       position={
//         mobile
//           ? "relative"
//           : "fixed"
//       }

//       left={0}

//       top={0}

//       display={{
//         base: mobile
//           ? "flex"
//           : "none",

//         lg: "flex"
//       }}

//       flexDirection="column"

//     >

//       {/* Logo */}

//        <Flex

//         h={
//           WORKSPACE_LAYOUT.topbar.height
//         }

//         align="center"

//         px={6}

//       >

//         <Box>

//           <Text

//             fontSize="2xl"

//             fontWeight="800"

//             color="brand.600"

//           >



//             {organization?.name}

//           </Text>

//           <Text

//             fontSize="sm"

//             color="gray.500"

//           >

//             Workspace

//           </Text>

//         </Box>

//       </Flex> 

//       {/* Logo / Workspace Identity */}




//       <Divider />


//       {/* Navigation */}

//       <VStack

//         spacing={2}

//         align="stretch"

//         p={4}

//       >

//         {

//           workspaceNavigation.map(
//             item => (

//               <NavigationItem

//                 key={item.id}

//                 item={item}

//                 onNavigate={
//                   onNavigate
//                 }

//               />

//             )
//           )

//         }

//       </VStack>


//       <Spacer />


//       <Divider />


//       {/* Organization Footer */}

//       <Flex

//         p={5}

//         align="center"

//         gap={3}

//         minW={0}

//       >

//         <Avatar

//           size="sm"

//           name={
//             organization?.name ??
//             "Workspace"
//           }

//           flexShrink={0}

//         />


//         <Box

//           minW={0}

//         >

//           <Text

//             fontWeight="600"

//             fontSize="sm"

//             noOfLines={1}

//           >

//             {

//               isLoading

//                 ? "Loading..."

//                 : organization?.name ??
//                   "Workspace"

//             }

//           </Text>


//           <Text

//             fontSize="xs"

//             color="gray.500"

//             noOfLines={1}

//           >

//             {

//               organization?.organization_type ??
//               "Organization"

//             }

//           </Text>


//           {

//             organization?.workspace_code && (

//               <Text

//                 fontSize="xs"

//                 color="gray.400"

//                 noOfLines={1}

//               >

//                 {
//                   organization.workspace_code
//                 }

//               </Text>

//             )

//           }

//         </Box>

//       </Flex>

//     </Box>

//   );

// };


// export default Sidebar;



// Version 3

import {
  Box,
  VStack,
  Text,
  Flex,
  Divider,
  // Avatar,
  Spacer
} from "@chakra-ui/react";

import NavigationItem
  from "./NavigationItem";

import {
  workspaceNavigation
} from "../../config/navigation/workspace.navigation";

import {
  WORKSPACE_LAYOUT
} from "../../config/layout/workspace.layout";

// import {
//   useWorkspace
// } from "../../context/WorkspaceContext";


interface Props {

  mobile?: boolean;

  onNavigate?: () => void;

}


const Sidebar = ({
  mobile = false,
  onNavigate
}: Props) => {

  // const {
  //   organization,
  //   isLoading
  // } = useWorkspace();


  return (

    <Box

      w={
        WORKSPACE_LAYOUT.sidebar.width
      }

      h="100vh"

      bg="white"

      borderRight="1px solid"

      borderColor="gray.100"

      position={
        mobile
          ? "relative"
          : "fixed"
      }

      left={0}

      top={0}

      display={{
        base: mobile
          ? "flex"
          : "none",

        lg: "flex"
      }}

      flexDirection="column"

    >

      {/* -----------------------------------------
          BRAND HEADER
      ------------------------------------------ */}

      <Flex

        h={
          WORKSPACE_LAYOUT.topbar.height
        }

        align="center"

        px={6}

      >

        <Box>

          <Text

            fontSize="2xl"

            fontWeight="800"

            color="brand.600"

            lineHeight="1"

          >

            NEKA

          </Text>

          <Text

            fontSize="sm"

            color="gray.500"

            mt={1}

          >

            Workspace

          </Text>

        </Box>

      </Flex>


      <Divider />


      {/* -----------------------------------------
          NAVIGATION
      ------------------------------------------ */}

      <VStack

        spacing={2}

        align="stretch"

        p={4}

      >

        {

          workspaceNavigation.map(
            item => (

              <NavigationItem

                key={item.id}

                item={item}

                onNavigate={
                  onNavigate
                }

              />

            )
          )

        }

      </VStack>


      <Spacer />


      <Divider />


      {/* -----------------------------------------
          ORGANIZATION FOOTER
      ------------------------------------------ */}

      {/* <Flex

        p={5}

        align="center"

        gap={3}

        minW={0}

      >

        <Avatar

          size="sm"

          name={
            organization?.name ??
            "Workspace"
          }

          flexShrink={0}

        />


        <Box

          minW={0}

          overflow="hidden"

        >

         

          <Text

            fontWeight="600"

            fontSize="sm"

            noOfLines={1}

            overflow="hidden"

            textOverflow="ellipsis"

            whiteSpace="nowrap"

            title={
              organization?.name ??
              ""
            }

          >

            {

              isLoading

                ? "Loading..."

                : organization?.name ??
                  "Workspace"

            }

          </Text>


          

          <Text

            fontSize="xs"

            color="gray.500"

            noOfLines={1}

            overflow="hidden"

            textOverflow="ellipsis"

            whiteSpace="nowrap"

          >

            {

              organization?.organization_type ??
              "Organization"

            }

          </Text> 


          
          {

            organization?.workspace_code && (

              <Text

                fontSize="xs"

                color="gray.400"

                noOfLines={1}

                overflow="hidden"

                textOverflow="ellipsis"

                whiteSpace="nowrap"

              >

                {
                  organization.workspace_code
                }

              </Text>

            )

          }

        </Box>

      </Flex> */}

    </Box>

  );

};


export default Sidebar;