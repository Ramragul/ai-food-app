import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea
} from "@chakra-ui/react";

import SettingsSection
  from "./SettingsSection";

import type {
  WorkspaceSettingsForm
} from "./WorkspaceInformationCard";

interface Props {

  form: WorkspaceSettingsForm;

  updateField: (
    field: keyof WorkspaceSettingsForm,
    value: string
  ) => void;

}

const AddressSettingsCard = ({
  form,
  updateField
}: Props) => {

  return (

    <SettingsSection

      title="Address"

      description="Where your workspace is located."

    >

      <FormControl>

        <FormLabel>
          Address
        </FormLabel>

        <Textarea

          value={form.address}

          onChange={(e) =>
            updateField(
              "address",
              e.target.value
            )
          }

          rows={3}

          resize="vertical"

        />

      </FormControl>


      <SimpleGrid

        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}

        spacing={5}

      >

        <FormControl>

          <FormLabel>
            City
          </FormLabel>

          <Input

            value={form.city}

            onChange={(e) =>
              updateField(
                "city",
                e.target.value
              )
            }

          />

        </FormControl>


        <FormControl>

          <FormLabel>
            State
          </FormLabel>

          <Input

            value={form.state}

            onChange={(e) =>
              updateField(
                "state",
                e.target.value
              )
            }

          />

        </FormControl>


        <FormControl>

          <FormLabel>
            Country
          </FormLabel>

          <Input

            value={form.country}

            onChange={(e) =>
              updateField(
                "country",
                e.target.value
              )
            }

          />

        </FormControl>

      </SimpleGrid>

    </SettingsSection>

  );

};

export default AddressSettingsCard;