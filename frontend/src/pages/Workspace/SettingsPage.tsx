import {
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import PageHeader
  from "../../components/WorkspaceUI/PageHeader";

import WorkspaceInformationCard
  from "../../components/WorkspaceUI/SettingsSection/WorkspaceInformationCard";

import AddressSettingsCard
  from "../../components/WorkspaceUI/SettingsSection/AddressSettingsCard";

import PreferencesSettingsCard
  from "../../components/WorkspaceUI/SettingsSection/PreferencesSettingsCard";

import BrandingSettingsCard
  from "../../components/WorkspaceUI/SettingsSection/BrandingSettingsCard";

import DangerZoneCard
  from "../../components/WorkspaceUI/SettingsSection/DangerZoneCard";

import type {
  WorkspaceSettingsForm
} from "../../components/WorkspaceUI/SettingsSection/WorkspaceInformationCard";

import {
  getWorkspaceSettings,
  updateWorkspaceSettings,
  deleteWorkspace,
  type WorkspaceSettings,
  type UpdateWorkspaceSettingsRequest
} from "../../services/workspace/settings.service";


const initialForm:
  WorkspaceSettingsForm = {

  name: "",

  organization_type: "",

  email: "",

  mobile: "",

  website: "",

  address: "",

  city: "",

  state: "",

  country: "",

  timezone: "Asia/Kolkata",

  currency: "INR",

  logo_url: ""

};


const SettingsPage = () => {

  const toast = useToast();

  const navigate = useNavigate();


  const [
    settings,
    setSettings
  ] = useState<WorkspaceSettings | null>(
    null
  );


  const [
    form,
    setForm
  ] = useState<WorkspaceSettingsForm>(
    initialForm
  );


  const [
    errors,
    setErrors
  ] = useState<
    Record<string, string>
  >({});


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    saving,
    setSaving
  ] = useState(false);


  const [
    deleting,
    setDeleting
  ] = useState(false);


  const [
    deleteConfirmation,
    setDeleteConfirmation
  ] = useState("");


  useEffect(() => {

    void loadSettings();

  }, []);


  const loadSettings = async () => {

    try {

      setLoading(true);

      const data =
        await getWorkspaceSettings();

      setSettings(data);

      setForm({

        name:
          data.name ?? "",

        organization_type:
          data.organization_type ?? "",

        email:
          data.email ?? "",

        mobile:
          data.mobile ?? "",

        website:
          data.website ?? "",

        address:
          data.address ?? "",

        city:
          data.city ?? "",

        state:
          data.state ?? "",

        country:
          data.country ?? "",

        timezone:
          data.timezone ??
          "Asia/Kolkata",

        currency:
          data.currency ??
          "INR",

        logo_url:
          data.logo_url ?? ""

      });

    } catch (error: any) {

      toast({

        title:
          error?.response?.data?.message ??
          "Unable to load workspace settings.",

        status: "error",

        duration: 4000,

        isClosable: true

      });

    } finally {

      setLoading(false);

    }

  };


  const updateField = (
    field: keyof WorkspaceSettingsForm,
    value: string
  ) => {

    setForm(prev => ({

      ...prev,

      [field]: value

    }));

    setErrors(prev => ({

      ...prev,

      [field]: ""

    }));

  };


  const validate = () => {

    const validationErrors:
      Record<string, string> = {};


    if (!form.name.trim()) {

      validationErrors.name =
        "Workspace name is required.";

    }


    if (!form.organization_type) {

      validationErrors.organization_type =
        "Organization type is required.";

    }


    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {

      validationErrors.email =
        "Enter a valid email address.";

    }


    setErrors(
      validationErrors
    );


    return (
      Object.keys(
        validationErrors
      ).length === 0
    );

  };


  const handleSave = async () => {

    if (!validate()) {

      return;

    }


    try {

      setSaving(true);


      const payload:
        UpdateWorkspaceSettingsRequest = {

        name:
          form.name.trim(),

        organization_type:
          form.organization_type,

        email:
          form.email.trim(),

        mobile:
          form.mobile.trim(),

        website:
          form.website.trim(),

        address:
          form.address.trim(),

        city:
          form.city.trim(),

        state:
          form.state.trim(),

        country:
          form.country.trim(),

        timezone:
          form.timezone,

        currency:
          form.currency,

        logo_url:
          form.logo_url.trim()

      };


      const updated =
        await updateWorkspaceSettings(
          payload
        );


      setSettings(
        updated
      );


      toast({

        title:
          "Settings saved.",

        description:
          "Workspace information has been updated.",

        status: "success",

        duration: 3000,

        isClosable: true

      });

    } catch (error: any) {

      toast({

        title:
          error?.response?.data?.message ??
          "Unable to save settings.",

        status: "error",

        duration: 4000,

        isClosable: true

      });

    } finally {

      setSaving(false);

    }

  };


  const handleDelete = async () => {

    if (!settings) {

      return;

    }


    if (
      deleteConfirmation !==
      settings.name
    ) {

      toast({

        title:
          "Workspace name doesn't match.",

        status: "error",

        duration: 4000,

        isClosable: true

      });

      return;

    }


    try {

      setDeleting(true);

      await deleteWorkspace();


      toast({

        title:
          "Workspace deleted.",

        description:
          "The workspace has been deactivated.",

        status: "success",

        duration: 4000,

        isClosable: true

      });


      navigate(
        "/home",
        {
          replace: true
        }
      );

    } catch (error: any) {

      toast({

        title:
          error?.response?.data?.message ??
          "Unable to delete workspace.",

        status: "error",

        duration: 5000,

        isClosable: true

      });

    } finally {

      setDeleting(false);

    }

  };


  if (loading) {

    return (

      <Center h="300px">

        <Spinner

          size="xl"

          color="brand.500"

        />

      </Center>

    );

  }


  if (!settings) {

    return (

      <VStack

        align="stretch"

        spacing={6}

      >

        <PageHeader

          title="Settings"

          subtitle="Manage your workspace."

        />

        <Text color="red.500">

          Unable to load workspace settings.

        </Text>

      </VStack>

    );

  }


  return (

    <VStack

      spacing={8}

      align="stretch"

      pb={10}

    >

      <PageHeader

        title="Settings"

        subtitle="Manage your workspace information and preferences."

      />


      <WorkspaceInformationCard

        form={form}

        errors={errors}

        updateField={updateField}

        workspaceCode={
          settings.workspace_code ?? ""
        }

      />


      <AddressSettingsCard

        form={form}

        updateField={updateField}

      />


      <PreferencesSettingsCard

        form={form}

        updateField={updateField}

      />


      <BrandingSettingsCard

        form={form}

        updateField={updateField}

      />


      <HStack

        justify="flex-end"

        w="full"

      >

        <Button

          colorScheme="blue"

          borderRadius="12px"

          px={8}

          isLoading={saving}

          loadingText="Saving..."

          onClick={handleSave}

          w={{
            base: "full",
            md: "auto"
          }}

        >

          Save Changes

        </Button>

      </HStack>


      <DangerZoneCard

        workspaceName={
          settings.name
        }

        confirmation={
          deleteConfirmation
        }

        deleting={deleting}

        onConfirmationChange={
          setDeleteConfirmation
        }

        onDelete={
          handleDelete
        }

      />

    </VStack>

  );

};


export default SettingsPage;