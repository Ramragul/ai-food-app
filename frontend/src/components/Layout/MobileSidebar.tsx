import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useBreakpointValue
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";

interface Props {

  isOpen: boolean;

  onClose: () => void;

}

const MobileSidebar = ({
  isOpen,
  onClose
}: Props) => {

  const isDesktop =
    useBreakpointValue({
      base: false,
      lg: true
    });

  if (isDesktop) {

    return null;

  }

  return (

    <Drawer

      isOpen={isOpen}

      placement="left"

      onClose={onClose}

      size="xs"

    >

      <DrawerOverlay />

      <DrawerContent>

        <Sidebar

         mobile

        onNavigate={onClose}

/>

      </DrawerContent>

    </Drawer>

  );

};

export default MobileSidebar;