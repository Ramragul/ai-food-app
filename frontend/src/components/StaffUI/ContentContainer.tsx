import {
  Box
} from "@chakra-ui/react";

import {
  STAFF_LAYOUT
} from "../../config/layout/staff.layout";

interface Props {

  children: React.ReactNode;

}

const ContentContainer = ({
  children
}: Props) => {

  return (

    <Box

      maxW={
        STAFF_LAYOUT.content.maxWidth
      }

      mx="auto"

      px={
        STAFF_LAYOUT.content.padding
      }
      

      py={8}

      w="100%"

    >

      {children}

    </Box>

  );

};

export default ContentContainer;