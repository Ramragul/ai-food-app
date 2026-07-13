import {
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Center,
  Spinner,
  Text
} from "@chakra-ui/react";

import {
  Search,
  Plus
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import PageHeader from "../../components/WorkspaceUI/PageHeader";
import InvitationsList from "../../components/WorkspaceUI/InvitationsList";

import {
  getInvitations,
  type Invitation
} from "../../services/workspace/invitations.service";

const InvitationsPage = () => {

  const [search, setSearch] =
    useState("");

  const [invitations, setInvitations] =
    useState<Invitation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    void loadInvitations();

  }, []);

  const loadInvitations = async () => {

    try {

      setLoading(true);

      const data =
        await getInvitations();

      setInvitations(data);

    } catch {

      setError(
        "Unable to load invitations."
      );

    } finally {

      setLoading(false);

    }

  };

  const filteredInvitations =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return invitations.filter(invitation =>

        invitation.invited_name
          .toLowerCase()
          .includes(keyword)

        ||

        invitation.invited_mobile
          .includes(keyword)

        ||

        invitation.invited_email
          .toLowerCase()
          .includes(keyword)

      );

    }, [search, invitations]);

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

  if (error) {

    return (

      <VStack
        spacing={6}
        align="stretch"
      >

        <PageHeader

          title="Invitations"

          subtitle="Manage workspace invitations."

        />

        <Text color="red.500">

          {error}

        </Text>

      </VStack>

    );

  }

  return (

    <VStack

      spacing={6}

      align="stretch"

    >

      <HStack

        justify="space-between"

        align="start"

        flexWrap="wrap"

      >

        <PageHeader

          title="Invitations"

          subtitle="Manage workspace invitations."

        />

        <Button

          leftIcon={<Plus size={18} />}

          colorScheme="blue"

          borderRadius="12px"

        >

          Invite Member

        </Button>

      </HStack>

      <InputGroup>

        <InputLeftElement>

          <Search size={18} />

        </InputLeftElement>

        <Input

          placeholder="Search invitations..."

          value={search}

          onChange={(e) =>

            setSearch(
              e.target.value
            )

          }

        />

      </InputGroup>

      {

        filteredInvitations.length === 0 ? (

          <Center py={12}>

            <Text color="gray.500">

              No invitations found.

            </Text>

          </Center>

        ) : (

          <InvitationsList

            invitations={
              filteredInvitations
            }

          />

        )

      }

    </VStack>

  );

};

export default InvitationsPage;