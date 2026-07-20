import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import type { CoachNote } from "../../../../services/staff/client.types";
import type { CoachNotePayload } from "../../../../services/staff/coachNotes.service";

interface Props {

  isOpen: boolean;

  note: CoachNote | null;

  onClose: () => void;

  onSave: (payload: CoachNotePayload) => Promise<void>;

}

const CoachNoteEditor = ({
  isOpen,
  note,
  onClose,
  onSave
}: Props) => {

  const [category, setCategory] =
    useState("GENERAL");

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] =
    useState({

      title: "",

      note: ""

    });

  useEffect(() => {

    if (note) {

      setCategory(note.category);

      setTitle(note.title);

      setContent(note.note);

    }

    else {

      setCategory("GENERAL");

      setTitle("");

      setContent("");

    }

    setErrors({

      title: "",

      note: ""

    });

  }, [note, isOpen]);

  const validate = () => {

    const validationErrors = {

      title: "",

      note: ""

    };

    let valid = true;

    if (!title.trim()) {

      validationErrors.title =
        "Title is required.";

      valid = false;

    }

    if (!content.trim()) {

      validationErrors.note =
        "Please enter a note.";

      valid = false;

    }

    setErrors(validationErrors);

    return valid;

  };

  const handleSave = async () => {

    if (!validate()) {

      return;

    }

    try {

      setSaving(true);

      await onSave({

        category,

        title: title.trim(),

        note: content.trim()

      });

    }

    finally {

      setSaving(false);

    }

  };

  return (

    <Drawer

      isOpen={isOpen}

      placement="right"

      size="md"

      onClose={onClose}

    >

      <DrawerOverlay />

      <DrawerContent>

        <DrawerCloseButton />

        <DrawerHeader>

          {

            note

              ? "Edit Coach Note"

              : "Add Coach Note"

          }

        </DrawerHeader>

        <DrawerBody>

          <VStack

            spacing={5}

            align="stretch"

          >

            <FormControl>

              <FormLabel>

                Category

              </FormLabel>

              <Select

                value={category}

                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }

              >

                <option value="GENERAL">

                  GENERAL

                </option>

                <option value="WORKOUT">

                  WORKOUT

                </option>

                <option value="NUTRITION">

                  NUTRITION

                </option>

                <option value="FOLLOW_UP">

                  FOLLOW UP

                </option>

                <option value="MOTIVATION">

                  MOTIVATION

                </option>

              </Select>

            </FormControl>

            <FormControl

              isInvalid={
                !!errors.title
              }

            >

              <FormLabel>

                Title

              </FormLabel>

              <Input

                value={title}

                maxLength={100}

                placeholder="Enter title"

                onChange={(e) => {

                  setTitle(
                    e.target.value
                  );

                  setErrors({

                    ...errors,

                    title: ""

                  });

                }}

              />

              <FormErrorMessage>

                {errors.title}

              </FormErrorMessage>

            </FormControl>

            <FormControl

              isInvalid={
                !!errors.note
              }

            >

              <FormLabel>

                Note

              </FormLabel>

              <Textarea

                rows={10}

                resize="vertical"

                maxLength={1000}

                placeholder="Write your observation..."

                value={content}

                onChange={(e) => {

                  setContent(
                    e.target.value
                  );

                  setErrors({

                    ...errors,

                    note: ""

                  });

                }}

              />

              <FormErrorMessage>

                {errors.note}

              </FormErrorMessage>

            </FormControl>

          </VStack>

        </DrawerBody>

        <DrawerFooter>

          <Button

            mr={3}

            variant="ghost"

            onClick={onClose}

            isDisabled={saving}

          >

            Cancel

          </Button>

          <Button

            colorScheme="blue"

            onClick={handleSave}

            isLoading={saving}

            loadingText="Saving..."

          >

            Save

          </Button>

        </DrawerFooter>

      </DrawerContent>

    </Drawer>

  );

};

export default CoachNoteEditor;