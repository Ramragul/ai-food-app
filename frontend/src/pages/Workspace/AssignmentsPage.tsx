import {
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  SimpleGrid,
  Center,
  Spinner,
  Text,
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

import TransferClientDrawer
from "../../components/WorkspaceUI/TransferClientDrawer";

import PageHeader from "../../components/WorkspaceUI/PageHeader";
import AssignmentCard from "../../components/WorkspaceUI/AssignmentCard";

import {
  getAssignments,
  type CoachAssignment
} from "../../services/workspace/assignments.service";
import AssignClientDrawer from "../../components/WorkspaceUI/AssignClientDrawer";
import RemoveAssignmentDialog from "../../components/WorkspaceUI/RemoveAssignmentDialog";

const AssignmentsPage = () => {

  const [search, setSearch] =
    useState("");

  const [assignments, setAssignments] =
    useState<CoachAssignment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const {isOpen,onOpen,onClose} = useDisclosure();

    const navigate =
  useNavigate();

const [

  selectedAssignment,

  setSelectedAssignment

] = useState<any>(null);

const {

  isOpen: isTransferOpen,

  onOpen: onTransferOpen,

  onClose: onTransferClose

} = useDisclosure();

const [

selectedRemove,

setSelectedRemove

]=useState<any>(null);

const{

isOpen:isRemoveOpen,

onOpen:onRemoveOpen,

onClose:onRemoveClose

}=useDisclosure();

  useEffect(() => {

    void loadAssignments();

  }, []);

  const loadAssignments = async () => {

    try {

      setLoading(true);

      const data =
        await getAssignments();

      setAssignments(data);

    } catch {

      setError(
        "Unable to load assignments."
      );

    } finally {

      setLoading(false);

    }

  };

  const filteredAssignments =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return assignments.filter(

        assignment =>

          assignment.coach.name
            .toLowerCase()
            .includes(keyword)

      );

    }, [assignments, search]);

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

          title="Assignments"

          subtitle="Manage client assignments."

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

          title="Assignments"

          subtitle="Manage client assignments."

        />

        <Button

          leftIcon={<Plus size={18} />}

          colorScheme="blue"

          borderRadius="12px"
          onClick={onOpen}

        >

          Assign Client

        </Button>

      </HStack>

      <InputGroup>

        <InputLeftElement>

          <Search size={18} />

        </InputLeftElement>

        <Input

          placeholder="Search trainer..."

          value={search}

          onChange={(e) =>

            setSearch(
              e.target.value
            )

          }

        />

      </InputGroup>

      {

        filteredAssignments.length === 0 ? (

          <Center py={12}>

            <Text color="gray.500">

              No assignments found.

            </Text>

          </Center>

        ) : (

          <SimpleGrid

            columns={{

              base: 1,

              lg: 2

            }}

            spacing={5}

          >

            {

              filteredAssignments.map(

                assignment => (

<AssignmentCard

  key={
    assignment.coach.member_id
  }

  assignment={assignment}

  onViewClient={(memberId) =>

    navigate(

      `/workspace/clients/${memberId}`

    )

  }

  onTransferClient={(assignment) => {

    setSelectedAssignment(
      assignment
    );

    onTransferOpen();

  }}



  onRemoveAssignment={(assignment)=>{

setSelectedRemove(
assignment
);

onRemoveOpen();

}}

/>

                )

              )

            }

          </SimpleGrid>

        )

      }

    </VStack>
    <AssignClientDrawer

  isOpen={isOpen}

  onClose={onClose}

  onSuccess={loadAssignments}

/>

<TransferClientDrawer

  isOpen={
    isTransferOpen
  }

  onClose={
    onTransferClose
  }

  assignment={
    selectedAssignment
  }

  onSuccess={() => {

    onTransferClose();

    loadAssignments();

  }}

/>

<RemoveAssignmentDialog

isOpen={isRemoveOpen}

onClose={onRemoveClose}

assignment={selectedRemove}

onSuccess={()=>{

onRemoveClose();

loadAssignments();

}}

/>
</>

  );

};

export default AssignmentsPage;