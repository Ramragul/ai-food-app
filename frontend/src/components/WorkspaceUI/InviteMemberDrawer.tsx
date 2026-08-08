import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";

import {
  FiChevronRight,
  FiHeart,
  FiUsers
} from "react-icons/fi";

import WorkspaceDrawer from "./WorkspaceDrawer";

interface Props {

  isOpen: boolean;

  onClose: () => void;

  onSelect: (
    type: "CLIENT" | "EMPLOYEE"
  ) => void;

}

const InviteMemberDrawer = ({
  isOpen,
  onClose,
  onSelect
}: Props) => {

const OptionCard = ({
  title,
  description,
  icon,
  color,
  onClick
}: {
  title: string;
  description: string;
  icon: any;
  color: string;
  onClick: () => void;
}) => (

<Box

    p={6}

    borderRadius="2xl"

    borderWidth="1px"

    borderColor="gray.200"

    cursor="pointer"

    transition="all .25s"

    _hover={{

        borderColor: "blue.400",

        transform: "translateY(-3px)",

        shadow: "lg"

    }}

    onClick={onClick}

>

<HStack

    justify="space-between"

    align="center"

>

<HStack spacing={5}>

<Box

    w="52px"

    h="52px"

    borderRadius="xl"

    bg={`${color}.50`}

    display="flex"

    alignItems="center"

    justifyContent="center"

>

<Icon

    as={icon}

    color={`${color}.500`}

    boxSize={6}

/>

</Box>

<VStack

    spacing={1}

    align="start"

>

<Text

    fontWeight="700"

>

{title}

</Text>

<Text

    fontSize="sm"

    color="gray.500"

>

{description}

</Text>

</VStack>

</HStack>

<FiChevronRight

    color="#A0AEC0"

/>

</HStack>

</Box>

);

  return (

    <WorkspaceDrawer

      isOpen={isOpen}

      onClose={onClose}

      title="Invite Member"

      footer={

        <Stack

          direction={{
            base: "column",
            md: "row"
          }}

          justify="flex-end"

          w="100%"

        >

          <Button
            onClick={onClose}
            w={{
              base: "100%",
              md: "auto"
            }}
          >
            Cancel
          </Button>

        </Stack>

      }

    >

      <VStack
        spacing={6}
        align="stretch"
      >

        <Text
          color="gray.500"
        >

          Who would you like to invite?

        </Text>
<OptionCard

    title="Client"

    description="Invite a client to receive coaching."

    icon={FiHeart}

    color="pink"

    onClick={() => onSelect("CLIENT")}

/>

<OptionCard

    title="Employee"

    description="Trainer, Dietitian, Receptionist or Admin."

    icon={FiUsers}

    color="blue"

    onClick={() => onSelect("EMPLOYEE")}

/>

      </VStack>

    </WorkspaceDrawer>

  );

};

export default InviteMemberDrawer;