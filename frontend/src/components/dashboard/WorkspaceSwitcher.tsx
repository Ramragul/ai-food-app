import {
  HStack,
  Text,
  Icon
} from "@chakra-ui/react";

import { FiArrowRight } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { useWorkspace } from "../../context/WorkspaceContext";

const WorkspaceSwitcher = () => {

  const navigate = useNavigate();

  const { organization } = useWorkspace();

  if (!organization) {

    return null;

  }

  return (

    <HStack

      mt={2}

      spacing={2}

      cursor="pointer"

      display="inline-flex"

      color="whiteAlpha.900"

      transition="all .2s"

      onClick={() => navigate("/workspace/dashboard")}

      _hover={{

        transform: "translateX(2px)",

        color: "white"

      }}

    >

      <Text

        fontSize="sm"

        fontWeight="600"

      >

        Open {organization.name}

      </Text>

      <Icon
        as={FiArrowRight}
        boxSize={4}
      />

    </HStack>

  );

};

export default WorkspaceSwitcher;