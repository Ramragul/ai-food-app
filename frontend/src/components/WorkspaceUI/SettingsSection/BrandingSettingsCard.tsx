import {
  FormControl,
  FormLabel,
  Input
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

const BrandingSettingsCard = ({
  form,
  updateField
}: Props) => {

  return (

    <SettingsSection

      title="Branding"

      description="Customize how your workspace is represented."

    >

      <FormControl>

        <FormLabel>
          Logo URL
        </FormLabel>

        <Input

          placeholder="https://example.com/logo.png"

          value={form.logo_url}

          onChange={(e) =>
            updateField(
              "logo_url",
              e.target.value
            )
          }

        />

      </FormControl>

    </SettingsSection>

  );

};

export default BrandingSettingsCard;