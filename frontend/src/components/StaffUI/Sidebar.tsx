//  Verion 1

// import {

//   Box,

//   VStack,

//   Text,

//   Flex,

//   Divider,

//   Avatar,

//   Spacer

// } from "@chakra-ui/react";

// import NavigationItem from "./NavigationItem";

// import {

//   staffNavigation

// } from "../../config/navigation/staff.navigation";

// import {

//   STAFF_LAYOUT

// } from "../../config/layout/staff.layout";

// import { useAuth } from "../../context/AuthContext";
// import { useWorkspace } from "../../context/WorkspaceContext";

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

//     const { user } = useAuth();

    
//     const { organization } = useWorkspace();

//     console.log("User: " + JSON.stringify(user));
//     console.log("Organization: " + JSON.stringify(organization));

//   return (
// <Box

//   w={STAFF_LAYOUT.sidebar.width}

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

//         h={STAFF_LAYOUT.topbar.height}

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

//             Coach Portal

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

//           staffNavigation.map(

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

// <Flex
//     p={5}
//     align="center"
//     gap={3}
// >

//     <Avatar
//         name={user?.name}
//         size="sm"
//     />

//     <Box>

//         <Text
//             fontWeight="600"
//             fontSize="sm"
//         >
//             {user?.name}
//         </Text>

//         <Text
//             fontSize="xs"
//             color="gray.500"
//         >
//             {user?.role}
//         </Text>

//         <Text
//             fontSize="xs"
//             color="gray.400"
//         >
//             {organization?.name}
//         </Text>

//     </Box>

// </Flex>

//       </Flex>

//     </Box>

//   );

// };

// export default Sidebar;


// Version 2

import {
  Box,
  VStack,
  Text,
  Flex,
  Divider,
  Avatar,
  Spacer
} from "@chakra-ui/react";

import NavigationItem
  from "./NavigationItem";

import {
  staffNavigation
} from "../../config/navigation/staff.navigation";

import {
  STAFF_LAYOUT
} from "../../config/layout/staff.layout";

import {
  useAuth
} from "../../context/AuthContext";

import type {
  StaffOrganization
} from "./StaffLayout";


interface Props {

  mobile?: boolean;

  onNavigate?: () => void;

  organization:
    StaffOrganization | null;

}


const Sidebar = ({
  mobile = false,
  onNavigate,
  organization
}: Props) => {

  const {
    user
  } = useAuth();


  return (

    <Box

      w={
        STAFF_LAYOUT.sidebar.width
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
        base:
          mobile
            ? "flex"
            : "none",

        lg: "flex"
      }}

      flexDirection="column"

    >

      {/* Logo */}

      <Flex

        h={
          STAFF_LAYOUT.topbar.height
        }

        align="center"

        px={6}

      >

        <Box>

          <Text

            fontSize="2xl"

            fontWeight="800"

            color="brand.600"

          >

            {/* NEKA  */}
            {organization?.name}

          </Text>

          <Text

            fontSize="sm"

            color="gray.500"

          >

            Coach Portal

          </Text>

        </Box>

      </Flex>


      <Divider />


      {/* Navigation */}

      <VStack

        spacing={2}

        align="stretch"

        p={4}

      >

        {

          staffNavigation.map(
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


      {/* Footer */}

      <Flex

        p={5}

        align="center"

        gap={3}

      >

        <Avatar

          name={
            user?.name
          }

          size="sm"

        />


        <Box>

          <Text

            fontWeight="600"

            fontSize="sm"

          >

            {user?.name}

          </Text>


          <Text

            fontSize="xs"

            color="gray.500"

          >

            {user?.role}

          </Text>


          <Text

            fontSize="xs"

            color="gray.400"

            noOfLines={1}

          >

            {organization?.name ??
              "Loading workspace..."}

          </Text>

        </Box>

      </Flex>

    </Box>

  );

};


export default Sidebar;