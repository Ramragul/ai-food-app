import {

  Box,

  Flex,

  Text,

  Avatar,

  HStack,

  IconButton,

  useBreakpointValue

} from "@chakra-ui/react";

import {

  FiBell,

  FiMenu

} from "react-icons/fi";

import {

  WORKSPACE_LAYOUT

} from "../../config/layout/workspace.layout";

import { useLocation } from "react-router-dom";

import {
  workspaceNavigation
} from "../../config/navigation/workspace.navigation";

interface Props {

  onMenuClick: () => void;

}

const Topbar = ({
  onMenuClick
}: Props) => {

  const isDesktop =
    useBreakpointValue({

      base: false,

      lg: true

    });

    const location = useLocation();

  const currentPage =
    workspaceNavigation.find(
      ({ path }) => path === location.pathname
    );

  return (

    <Box

      position="fixed"

      top={0}

      right={0}

      left={{

        base: 0,

        lg: WORKSPACE_LAYOUT.sidebar.width

      }}

      h={WORKSPACE_LAYOUT.topbar.height}

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

        <HStack spacing={4}>

          {

            !isDesktop && (



              <IconButton

                aria-label="Menu"

                icon={<FiMenu />}

                variant="ghost"

                onClick={onMenuClick}

            />

            )

          }

           {/* <Box>

          <Text
            fontSize="2xl"
            fontWeight="700"
          >
            {currentPage?.label ?? "Workspace"}
          </Text>

          <Text
            fontSize="sm"
            color="gray.500"
          >
            {currentPage?.subtitle}
          </Text>

          </Box>  */}

        </HStack>

        <HStack spacing={5}>

          <Text

            color="gray.500"

            fontWeight="500"

            display={{

              base: "none",

              md: "block"

            }}

          >

            Good Morning 👋

          </Text>

          <IconButton

            aria-label="Notifications"

            icon={<FiBell />}

            variant="ghost"

            borderRadius="full"

          />

          <Avatar

            size="sm"

            name="Bairava"

          />

        </HStack>

      </Flex>

    </Box>

  );

};

export default Topbar;