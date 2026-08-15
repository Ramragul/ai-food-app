

// Version 1

// import {
//   VStack,
//   HStack,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Button,
//   SimpleGrid,
//   Text,
//   Center,
//   Spinner
// } from "@chakra-ui/react";

// import {
//   Search,
//   Plus
// } from "lucide-react";

// import {
//   useEffect,
//   useMemo,
//   useState
// } from "react";

// import PageHeader from "../../components/WorkspaceUI/PageHeader";
// import EmployeeCard from "../../components/WorkspaceUI/EmployeeCard";

// import {
//   getEmployees,
//   type Employee
// } from "../../services/workspace/employees.service";

// import {
//   useDisclosure
// } from "@chakra-ui/react";

// import InviteEmployeeDrawer from "../../components/WorkspaceUI/InviteEmployeeDrawer";

// const EmployeesPage = () => {

//   const [search, setSearch] =
//     useState("");

//   const [employees, setEmployees] =
//     useState<Employee[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//     const {isOpen,onOpen,onClose} = useDisclosure();

//   useEffect(() => {

//     void loadEmployees();

//   }, []);

//   const loadEmployees = async () => {

//     try {

//       setLoading(true);

//       const data =
//         await getEmployees();

//       setEmployees(data);

//     } catch {

//       setError(
//         "Unable to load employees."
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   const filteredEmployees =
//     useMemo(() => {

//       const keyword =
//         search.toLowerCase();

//       return employees.filter((employee) =>

//         employee.name
//           .toLowerCase()
//           .includes(keyword) ||

//         employee.email
//           .toLowerCase()
//           .includes(keyword) ||

//         employee.mobile.includes(keyword)

//       );

//     }, [employees, search]);

//   if (loading) {

//     return (

//       <Center
//         h="300px"
//       >

//         <Spinner
//           size="xl"
//           color="brand.500"
//         />

//       </Center>

//     );

//   }

//   if (error) {

//     return (

      

//       <VStack
//         spacing={6}
//         align="stretch"
//       >

//         <PageHeader

//           title="Employees"

//           subtitle="Manage your organization employees."

//         />

//         <Text
//           color="red.500"
//         >

//           {error}

//         </Text>

//       </VStack>

//     );

//   }

//   return (
//     <>
//     <VStack
//       spacing={6}
//       align="stretch"
//     >

//       <HStack

//         justify="space-between"

//         align="start"

//         flexWrap="wrap"

//       >

//         <PageHeader

//           title="Employees"

//           subtitle="Manage your organization employees."

//         />

// <Button

//   leftIcon={<Plus size={18} />}

//   colorScheme="blue"

//   borderRadius="12px"

//   onClick={onOpen}

// >

//   Employee

// </Button>

//       </HStack>

//       <InputGroup>

//         <InputLeftElement>

//           <Search
//             size={18}
//           />

//         </InputLeftElement>

//         <Input

//           placeholder="Search employees..."

//           value={search}

//           onChange={(e) =>
//             setSearch(
//               e.target.value
//             )
//           }

//         />

//       </InputGroup>

//       {filteredEmployees.length === 0 ? (

//         <Center
//           py={12}
//         >

//           <Text
//             color="gray.500"
//           >

//             No employees found.

//           </Text>

//         </Center>

//       ) : (

//         <SimpleGrid

//           columns={{
//             base: 1,
//             xl: 2
//           }}

//           spacing={5}

//         >

//           {filteredEmployees.map((employee) => (

//             <EmployeeCard

//               key={employee.member_id}

//               employee={employee}

//             />

//           ))}

//         </SimpleGrid>

//       )}

//     </VStack>
//     <InviteEmployeeDrawer

//   isOpen={isOpen}

//   onClose={onClose}

//   onSuccess={loadEmployees}

// />
    
//     </>
    

//   );

// };

// export default EmployeesPage;


// Version 2

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
  Spinner
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
import EmployeeCard from "../../components/WorkspaceUI/EmployeeCard";

import EmployeeReviewDrawer
  from "../../components/WorkspaceUI/EmployeeReviewDrawer";

import {
  getEmployees,
  type Employee
} from "../../services/workspace/employees.service";

import {
  useDisclosure
} from "@chakra-ui/react";

import InviteEmployeeDrawer from "../../components/WorkspaceUI/InviteEmployeeDrawer";

const EmployeesPage = () => {

  const [search, setSearch] =
    useState("");

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    // const {isOpen,onOpen,onClose} = useDisclosure();

    const {
  isOpen: isInviteOpen,
  onOpen: onInviteOpen,
  onClose: onInviteClose
} = useDisclosure();

const {
  isOpen: isReviewOpen,
  onOpen: onReviewOpen,
  onClose: onReviewClose
} = useDisclosure();

const [
  selectedEmployee,
  setSelectedEmployee
] = useState<Employee | null>(null);

  useEffect(() => {

    void loadEmployees();

  }, []);

  const loadEmployees = async () => {

    try {

      setLoading(true);

      const data =
        await getEmployees();

      setEmployees(data);

    } catch {

      setError(
        "Unable to load employees."
      );

    } finally {

      setLoading(false);

    }

  };

  const filteredEmployees =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return employees.filter((employee) =>

        employee.name
          .toLowerCase()
          .includes(keyword) ||

        employee.email
          .toLowerCase()
          .includes(keyword) ||

        employee.mobile.includes(keyword)

      );

    }, [employees, search]);

  if (loading) {

    return (

      <Center
        h="300px"
      >

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

          title="Employees"

          subtitle="Manage your organization employees."

        />

        <Text
          color="red.500"
        >

          {error}

        </Text>

      </VStack>

    );

  }

  const handleViewEmployee = (
  employee: Employee
) => {

  setSelectedEmployee(employee);

  onReviewOpen();

};

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

          title="Employees"

          subtitle="Manage your organization employees."

        />
{/* 
<Button

  leftIcon={<Plus size={18} />}

  colorScheme="blue"

  borderRadius="12px"

  onClick={onOpen}

>

  Employee

</Button> */}

<Button

  leftIcon={<Plus size={18} />}

  colorScheme="blue"

  borderRadius="12px"

  onClick={onInviteOpen}

>

  Invite Employee

</Button>

      </HStack>

      <InputGroup>

        <InputLeftElement>

          <Search
            size={18}
          />

        </InputLeftElement>

        <Input

          placeholder="Search employees..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

        />

      </InputGroup>

      {filteredEmployees.length === 0 ? (

        <Center
          py={12}
        >

          <Text
            color="gray.500"
          >

            No employees found.

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

          {filteredEmployees.map((employee) => (

            // <EmployeeCard

            //   key={employee.member_id}

            //   employee={employee}

            
            // />

            <EmployeeCard
              key={employee.member_id}
              employee={employee}
              onView={handleViewEmployee}
            />

          ))}

        </SimpleGrid>

      )}

    </VStack>
    {/* <InviteEmployeeDrawer

  isOpen={isOpen}

  onClose={onClose}

  onSuccess={loadEmployees}

/> */}

<InviteEmployeeDrawer

  isOpen={isInviteOpen}

  onClose={onInviteClose}

  onSuccess={loadEmployees}

/>

<EmployeeReviewDrawer

  employee={selectedEmployee}

  isOpen={isReviewOpen}

  onClose={() => {

    onReviewClose();

    setSelectedEmployee(null);

  }}

  onSuccess={loadEmployees}

/>
    
    </>
    

  );

};

export default EmployeesPage;