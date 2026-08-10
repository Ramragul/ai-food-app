import {
  FormControl,
  FormLabel,
  Select,
  SimpleGrid
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

const PreferencesSettingsCard = ({
  form,
  updateField
}: Props) => {

  return (

    <SettingsSection

      title="Preferences"

      description="Configure regional workspace preferences."

    >

      <SimpleGrid

        columns={{
          base: 1,
          md: 2
        }}

        spacing={5}

      >

        <FormControl>

          <FormLabel>
            Timezone
          </FormLabel>

          <Select

            value={form.timezone}

            onChange={(e) =>
              updateField(
                "timezone",
                e.target.value
              )
            }

          >

            <option value="Asia/Kolkata">
              Asia/Kolkata
            </option>

            <option value="Asia/Dubai">
              Asia/Dubai
            </option>

            <option value="Asia/Riyadh">
              Asia/Riyadh
            </option>

            <option value="Europe/London">
              Europe/London
            </option>

            <option value="Europe/Berlin">
              Europe/Berlin
            </option>

            <option value="America/New_York">
              America/New_York
            </option>

            <option value="America/Los_Angeles">
              America/Los_Angeles
            </option>

          </Select>

        </FormControl>


        <FormControl>

          <FormLabel>
            Currency
          </FormLabel>

          <Select

            value={form.currency}

            onChange={(e) =>
              updateField(
                "currency",
                e.target.value
              )
            }

          >

            <option value="INR">
              INR — Indian Rupee
            </option>

            <option value="USD">
              USD — US Dollar
            </option>

            <option value="AED">
              AED — UAE Dirham
            </option>

            <option value="SAR">
              SAR — Saudi Riyal
            </option>

            <option value="GBP">
              GBP — British Pound
            </option>

            <option value="EUR">
              EUR — Euro
            </option>

          </Select>

        </FormControl>

      </SimpleGrid>

    </SettingsSection>

  );

};

export default PreferencesSettingsCard;