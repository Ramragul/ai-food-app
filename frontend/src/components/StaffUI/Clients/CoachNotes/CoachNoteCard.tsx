import {
  Badge,
  Box,
  HStack,
  IconButton,
  Text,
  VStack
} from "@chakra-ui/react";

import {
  FiEdit2,
  FiTrash2,
  FiUser
} from "react-icons/fi";

import type { CoachNote } from "../../../../services/staff/client.types";

interface Props {

  note: CoachNote;

  onEdit: () => void;

  onDelete: () => void;

}

const CoachNoteCard = ({
  note,
  onEdit,
  onDelete
}: Props) => {

  return (

    <Box

      bg="white"

      borderRadius="xl"

      borderWidth="1px"

      borderColor="gray.200"

      p={5}

      shadow="sm"

      transition="all .2s"

      _hover={{

        shadow: "md",

        borderColor: "blue.200"

      }}

    >

      <VStack

        align="stretch"

        spacing={4}

      >

        <Badge

          alignSelf="flex-start"

          colorScheme="blue"

          px={3}

          py={1}

          borderRadius="full"

        >

          {note.category}

        </Badge>

        <Text

          fontWeight="bold"

          fontSize="lg"

        >

          {note.title}

        </Text>

        <Text

          color="gray.600"

          whiteSpace="pre-wrap"

        >

          {note.note}

        </Text>

        <HStack

          justify="space-between"

        >

          <HStack>

            <FiUser />

            <Text

              fontSize="sm"

              color="gray.500"

            >

              {note.coach_name}

            </Text>

          </HStack>

          <Text

            fontSize="sm"

            color="gray.500"

          >

            {new Date(
              note.created_at
            ).toLocaleDateString()}

          </Text>

        </HStack>

        <HStack

          justify="flex-end"

        >

          <IconButton

            aria-label="Edit Note"

            icon={<FiEdit2 />}

            variant="ghost"

            colorScheme="blue"

            onClick={onEdit}

          />

          <IconButton

            aria-label="Delete Note"

            icon={<FiTrash2 />}

            variant="ghost"

            colorScheme="red"

            onClick={onDelete}

          />

        </HStack>

      </VStack>

    </Box>

  );

};

export default CoachNoteCard;