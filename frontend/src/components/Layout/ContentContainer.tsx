import {
  Box
} from "@chakra-ui/react";

import {
  WORKSPACE_LAYOUT
} from "../../config/layout/workspace.layout";

interface Props {

  children: React.ReactNode;

}

const ContentContainer = ({
  children
}: Props) => {

  return (

    <Box

      maxW={
        WORKSPACE_LAYOUT.content.maxWidth
      }

      mx="auto"

      px={
        WORKSPACE_LAYOUT.content.padding
      }
      

      py={8}

      w="100%"

    >

      {children}

    </Box>

  );

};

export default ContentContainer;