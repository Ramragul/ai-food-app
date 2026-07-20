import {

  Box,

  VStack,

  Text,

  Flex,

  Divider,

  Avatar,

  Spacer

} from "@chakra-ui/react";

import NavigationItem from "./NavigationItem";

import {

  staffNavigation

} from "../../config/navigation/staff.navigation";

import {

  STAFF_LAYOUT

} from "../../config/layout/staff.layout";

import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";

// interface Props {

//   mobile?: boolean;

// }

// const Sidebar = ({
//   mobile = false
// }: Props) => {

interface Props {

  mobile?: boolean;

  onNavigate?: () => void;

}

const Sidebar = ({
  mobile = false,
  onNavigate
}: Props) => {

    const { user } = useAuth();

    
    const { organization } = useWorkspace();

  return (
<Box

  w={STAFF_LAYOUT.sidebar.width}

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
    base: mobile ? "flex" : "none",
    lg: "flex"
  }}

  flexDirection="column"

>

      {/* Logo */}

      <Flex

        h={STAFF_LAYOUT.topbar.height}

        align="center"

        px={6}

      >

        <Box>

          <Text

            fontSize="2xl"

            fontWeight="800"

            color="brand.600"

          >

            NEKA

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
                onNavigate={onNavigate}

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

<Flex
    p={5}
    align="center"
    gap={3}
>

    <Avatar
        name={user?.name}
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
        >
            {organization?.name}
        </Text>

    </Box>

</Flex>

      </Flex>

    </Box>

  );

};

export default Sidebar;