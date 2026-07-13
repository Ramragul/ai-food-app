import {
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  SimpleGrid,
  Text,
  Center,
  Spinner,
  useDisclosure
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

import {
  useNavigate
} from "react-router-dom";

import PageHeader from "../../components/WorkspaceUI/PageHeader";
import ClientCard from "../../components/WorkspaceUI/ClientCard";

import {
  getClients,
  type Client
} from "../../services/workspace/clients.service";
import InviteClientDrawer from "../../components/WorkspaceUI/InviteClientDrawer";

const ClientsPage = () => {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [clients, setClients] =
    useState<Client[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const {isOpen,onOpen,onClose} = useDisclosure();

  useEffect(() => {

    void loadClients();

  }, []);

  const loadClients = async () => {

    try {

      setLoading(true);

      const data =
        await getClients();

      setClients(data);

    } catch {

      setError(
        "Unable to load clients."
      );

    } finally {

      setLoading(false);

    }

  };

  const filteredClients =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return clients.filter((client) =>

        client.name
          .toLowerCase()
          .includes(keyword) ||

        client.email
          .toLowerCase()
          .includes(keyword) ||

        client.mobile.includes(keyword)

      );

    }, [clients, search]);

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

          title="Clients"

          subtitle="Manage your organization clients."

        />

        <Text color="red.500">

          {error}

        </Text>

      </VStack>

    );

  }

  return (
    <>

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

          title="Clients"

          subtitle="Manage your organization clients."

        />

        <Button

          leftIcon={<Plus size={18} />}

          colorScheme="blue"

          borderRadius="12px"
          onClick={onOpen}

        >

          Invite Client

        </Button>

      </HStack>

      <InputGroup>

        <InputLeftElement>

          <Search size={18} />

        </InputLeftElement>

        <Input

          placeholder="Search clients..."

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

        />

      </InputGroup>

      {filteredClients.length === 0 ? (

        <Center py={12}>

          <Text color="gray.500">

            No clients found.

          </Text>

        </Center>

      ) : (

        <SimpleGrid

          columns={{
            base: 1,
            xl: 2
          }}

          spacing={5}

        >

          {filteredClients.map((client) => (

            // <ClientCard

            //   key={client.member_id}

            //   client={client}

            // />

            <ClientCard

            key={client.member_id}

            client={client}

            onClick={(client) =>

              navigate(

                `/workspace/clients/${client.member_id}`

              )

            }

          />

          ))}

        </SimpleGrid>

      )}

    </VStack>
    <InviteClientDrawer

isOpen={isOpen}

onClose={onClose}

onSuccess={loadClients}

/>
</>

  );

};

export default ClientsPage;