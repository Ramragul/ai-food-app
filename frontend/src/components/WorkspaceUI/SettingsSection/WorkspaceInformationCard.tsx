import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid
} from "@chakra-ui/react";

import SettingsSection
  from "./SettingsSection";

export interface WorkspaceSettingsForm {

  name: string;

  organization_type: string;

  email: string;

  mobile: string;

  website: string;

  address: string;

  city: string;

  state: string;

  country: string;

  timezone: string;

  currency: string;

  logo_url: string;

}

interface Props {

  form: WorkspaceSettingsForm;

  errors: Record<string, string>;

  updateField: (
    field: keyof WorkspaceSettingsForm,
    value: string
  ) => void;

  workspaceCode: string;

}

const WorkspaceInformationCard = ({
  form,
  errors,
  updateField,
  workspaceCode
}: Props) => {

  return (

    <SettingsSection

      title="Workspace Information"

      description="Basic information about your organization."

    >

      <SimpleGrid

        columns={{
          base: 1,
          md: 2
        }}

        spacing={5}

      >

        <FormControl

          isRequired

          isInvalid={
            !!errors.name
          }

        >

          <FormLabel>
            Workspace Name
          </FormLabel>

          <Input

            value={form.name}

            onChange={(e) =>
              updateField(
                "name",
                e.target.value
              )
            }

          />

          <FormErrorMessage>

            {errors.name}

          </FormErrorMessage>

        </FormControl>


        <FormControl

          isRequired

          isInvalid={
            !!errors.organization_type
          }

        >

          <FormLabel>
            Organization Type
          </FormLabel>

          <Select

            value={
              form.organization_type
            }

            onChange={(e) =>
              updateField(
                "organization_type",
                e.target.value
              )
            }

          >

            <option value="">
              Select type
            </option>

            <option value="GYM">
              Gym
            </option>

            <option value="FITNESS_CENTER">
              Fitness Center
            </option>

            <option value="WELLNESS_CENTER">
              Wellness Center
            </option>

            <option value="CLINIC">
              Clinic
            </option>

            <option value="NUTRITION_CENTER">
              Nutrition Center
            </option>

            <option value="OTHER">
              Other
            </option>

          </Select>

          <FormErrorMessage>

            {errors.organization_type}

          </FormErrorMessage>

        </FormControl>


        <FormControl

          isInvalid={
            !!errors.email
          }

        >

          <FormLabel>
            Email
          </FormLabel>

          <Input

            type="email"

            value={form.email}

            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }

          />

          <FormErrorMessage>

            {errors.email}

          </FormErrorMessage>

        </FormControl>


        <FormControl>

          <FormLabel>
            Mobile
          </FormLabel>

          <Input

            value={form.mobile}

            onChange={(e) =>
              updateField(
                "mobile",
                e.target.value
              )
            }

          />

        </FormControl>


        <FormControl>

          <FormLabel>
            Website
          </FormLabel>

          <Input

            value={form.website}

            onChange={(e) =>
              updateField(
                "website",
                e.target.value
              )
            }

            placeholder="https://example.com"

          />

        </FormControl>


        <FormControl>

          <FormLabel>
            Workspace Code
          </FormLabel>

          <Input

            value={workspaceCode}

            isReadOnly

            bg="gray.50"

          />

        </FormControl>

      </SimpleGrid>

    </SettingsSection>

  );

};

export default WorkspaceInformationCard;