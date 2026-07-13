import {
  Box,
  Button,
  Divider,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  notes: any[];

}

const CoachNotesCard = ({
  notes
}: Props) => {

  return (

    <Box

      bg="white"

      p={6}

      borderRadius="20px"

      shadow="sm"

    >

      <Text

        fontSize="lg"

        fontWeight="700"

        mb={5}

      >

        📝 Coach Notes

      </Text>

      {

        notes.length === 0 ? (

          <VStack>

            <Text

              color="gray.500"

            >

              No coach notes yet.

            </Text>

            <Button

              isDisabled

              colorScheme="blue"

              variant="outline"

            >

              Add Note

            </Button>

          </VStack>

        ) : (

          notes.map(

            (note) => (

              <Box

                key={note.id}

              >

                <Text>

                  {note.note}

                </Text>

                <Divider mt={3} />

              </Box>

            )

          )

        )

      }

    </Box>

  );

};

export default CoachNotesCard;