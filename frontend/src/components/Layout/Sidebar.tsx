import {

  Box,

  VStack,

  Text,

  Flex,

  Divider,

  Avatar,

  Spacer

} from "@chakra-ui/react";

// import NavigationItem from "./NavigationItem";

import NavigationItem from "./NavigationItem";

import {

  workspaceNavigation

} from "../../config/navigation/workspace.navigation";

import {

  WORKSPACE_LAYOUT

} from "../../config/layout/workspace.layout";

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

  return (
<Box

  w={WORKSPACE_LAYOUT.sidebar.width}

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

        h={WORKSPACE_LAYOUT.topbar.height}

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

            Workspace

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

          workspaceNavigation.map(

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

        <Avatar

          name="Bairava Fitness Hub"

          size="sm"

        />

        <Box>

          <Text

            fontWeight="600"

            fontSize="sm"

          >

            Bairava Fitness Hub

          </Text>

          <Text

            fontSize="xs"

            color="gray.500"

          >

            Owner

          </Text>

        </Box>

      </Flex>

    </Box>

  );

};

export default Sidebar;