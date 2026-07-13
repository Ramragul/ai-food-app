import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";

import type {
  ReactNode
} from "react";

import {
  WORKSPACE_FORM
} from "../../config/workspace/workspace.form";

interface Props {

  isOpen: boolean;

  onClose: () => void;

  title: string;

  children: ReactNode;

  footer?: ReactNode;

}

const WorkspaceDrawer = ({

  isOpen,

  onClose,

  title,

  children,

  footer

}: Props) => {

  return (

    <Drawer

      isOpen={isOpen}

      placement="right"

      onClose={onClose}

      size={
        WORKSPACE_FORM.drawer.size
      }

    >

      <DrawerOverlay />

      <DrawerContent>

        <DrawerCloseButton />

        <DrawerHeader>

          {title}

        </DrawerHeader>

        <DrawerBody>

          {children}

        </DrawerBody>

        {

          footer && (

            <DrawerFooter>

              {footer}

            </DrawerFooter>

          )

        }

      </DrawerContent>

    </Drawer>

  );

};

export default WorkspaceDrawer;