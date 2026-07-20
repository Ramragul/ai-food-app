// Version 1

// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Spinner,
//   VStack
// } from "@chakra-ui/react";

// import { useEffect, useState } from "react";

// import {
//   CoachNote,
//   getCoachNotes,
//   createCoachNote,
//   updateCoachNote,
//   deleteCoachNote
// } from "../../../../services/staff/coachNotes.service";

// import CoachNoteCard from "./CoachNoteCard";
// import CoachNoteEditor from "./CoachNoteEditor";
// import EmptyCoachNotes from "./EmptyCoachNotes";

// interface Props {

//   memberId: number;

// }

// const CoachNotes = ({
//   memberId
// }: Props) => {

//   const [
//     notes,
//     setNotes
//   ] = useState<CoachNote[]>([]);

//   const [
//     loading,
//     setLoading
//   ] = useState(true);

//   const [
//     selectedNote,
//     setSelectedNote
//   ] = useState<CoachNote | null>(null);

//   const [
//     isEditorOpen,
//     setIsEditorOpen
//   ] = useState(false);

//   useEffect(() => {

//     loadNotes();

//   }, [memberId]);

//   const loadNotes = async () => {

//     try {

//       setLoading(true);

//       const data =
//         await getCoachNotes(memberId);

//       setNotes(data);

//     }

//     finally {

//       setLoading(false);

//     }

//   };

//   const handleCreate = () => {

//     setSelectedNote(null);

//     setIsEditorOpen(true);

//   };

//   const handleEdit = (
//     note: CoachNote
//   ) => {

//     setSelectedNote(note);

//     setIsEditorOpen(true);

//   };

//   const handleDelete = async (
//     noteId: number
//   ) => {

//     if (
//       !window.confirm(
//         "Delete this note?"
//       )
//     ) {

//       return;

//     }

//     await deleteCoachNote(noteId);

//     await loadNotes();

//   };

//   const handleSave = async (
//     payload: any
//   ) => {

//     if (selectedNote) {

//       await updateCoachNote(
//         selectedNote.id,
//         payload
//       );

//     } else {

//       await createCoachNote(
//         memberId,
//         payload
//       );

//     }

//     setIsEditorOpen(false);

//     setSelectedNote(null);

//     await loadNotes();

//   };

//   return (

//     <Box>

//       <Flex

//         justify="space-between"

//         align="center"

//         mb={5}

//       >

//         <Heading
//           size="md"
//         >

//           Coach Notes

//         </Heading>

//         <Button

//           colorScheme="blue"

//           onClick={handleCreate}

//         >

//           Add Note

//         </Button>

//       </Flex>

//       {

//         loading ?

//           (

//             <Flex
//               justify="center"
//               py={8}
//             >

//               <Spinner />

//             </Flex>

//           )

//           :

//           notes.length === 0 ?

//             (

//               <EmptyCoachNotes

//                 onCreate={
//                   handleCreate
//                 }

//               />

//             )

//             :

//             (

//               <VStack

//                 spacing={4}

//                 align="stretch"

//               >

//                 {

//                   notes.map(

//                     note => (

//                       <CoachNoteCard

//                         key={note.id}

//                         note={note}

//                         onEdit={() =>
//                           handleEdit(note)
//                         }

//                         onDelete={() =>
//                           handleDelete(note.id)
//                         }

//                       />

//                     )

//                   )

//                 }

//               </VStack>

//             )

//       }

//       <CoachNoteEditor

//         isOpen={isEditorOpen}

//         note={selectedNote}

//         onClose={() => {

//           setIsEditorOpen(false);

//           setSelectedNote(null);

//         }}

//         onSave={handleSave}

//       />

//     </Box>

//   );

// };

// export default CoachNotes;


// Version 2


import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  VStack,
  useToast
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import type {
  CoachNote
} from "../../../../services/staff/client.types";

import {
  createCoachNote,
  deleteCoachNote,
  getCoachNotes,
  updateCoachNote
} from "../../../../services/staff/coachNotes.service";

import CoachNoteCard from "./CoachNoteCard";
import CoachNoteEditor from "./CoachNoteEditor";
import EmptyCoachNotes from "./EmptyCoachNotes";

interface Props {

  memberId: number;

}

const CoachNotes = ({
  memberId
}: Props) => {

  const toast = useToast();

  const [
    notes,
    setNotes
  ] = useState<CoachNote[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    selectedNote,
    setSelectedNote
  ] = useState<CoachNote | null>(null);

  const [
    isEditorOpen,
    setIsEditorOpen
  ] = useState(false);

  useEffect(() => {

    void loadNotes();

  }, [memberId]);

  const loadNotes = async () => {

    try {

      setLoading(true);

      const data =
        await getCoachNotes(memberId);

      setNotes(data);

    }

    catch {

      toast({

        title: "Unable to load coach notes.",

        status: "error",

        duration: 3000,

        isClosable: true

      });

    }

    finally {

      setLoading(false);

    }

  };

  const handleCreate = () => {

    setSelectedNote(null);

    setIsEditorOpen(true);

  };

  const handleEdit = (
    note: CoachNote
  ) => {

    setSelectedNote(note);

    setIsEditorOpen(true);

  };

  const handleDelete = async (
    noteId: number
  ) => {

    const confirmed =
      window.confirm(
        "Delete this coach note?"
      );

    if (!confirmed) {

      return;

    }

    try {

      await deleteCoachNote(noteId);

      toast({

        title: "Coach note deleted.",

        status: "success",

        duration: 2500,

        isClosable: true

      });

      await loadNotes();

    }

    catch {

      toast({

        title: "Unable to delete coach note.",

        status: "error",

        duration: 3000,

        isClosable: true

      });

    }

  };

  const handleSave = async (
    payload: any
  ) => {

    try {

      if (selectedNote) {

        await updateCoachNote(

          selectedNote.id,

          payload

        );

        toast({

          title: "Coach note updated.",

          status: "success",

          duration: 2500,

          isClosable: true

        });

      }

      else {

        await createCoachNote(

          memberId,

          payload

        );

        toast({

          title: "Coach note created.",

          status: "success",

          duration: 2500,

          isClosable: true

        });

      }

      setIsEditorOpen(false);

      setSelectedNote(null);

      await loadNotes();

    }

    catch {

      toast({

        title: "Unable to save coach note.",

        status: "error",

        duration: 3000,

        isClosable: true

      });

    }

  };

  return (

    <Box>

      <Flex

        justify="space-between"

        align="center"

        mb={5}

      >

        <Heading size="md">

          Coach Notes

        </Heading>

        <Button

          colorScheme="blue"

          onClick={handleCreate}

        >

          Add Note

        </Button>

      </Flex>

      {

        loading ?

        (

          <Flex

            justify="center"

            py={8}

          >

            <Spinner />

          </Flex>

        )

        :

        notes.length === 0 ?

        (

          <EmptyCoachNotes

            onCreate={handleCreate}

          />

        )

        :

        (

          <VStack

            spacing={4}

            align="stretch"

          >

            {

              notes.map(

                note => (

                  <CoachNoteCard

                    key={note.id}

                    note={note}

                    onEdit={() =>
                      handleEdit(note)
                    }

                    onDelete={() =>
                      handleDelete(note.id)
                    }

                  />

                )

              )

            }

          </VStack>

        )

      }

      <CoachNoteEditor

        isOpen={isEditorOpen}

        note={selectedNote}

        onClose={() => {

          setIsEditorOpen(false);

          setSelectedNote(null);

        }}

        onSave={handleSave}

      />

    </Box>

  );

};

export default CoachNotes;