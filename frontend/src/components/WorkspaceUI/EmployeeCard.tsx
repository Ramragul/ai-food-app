import {

  Badge,
  Box,

  HStack,

  Text,
  VStack
} from "@chakra-ui/react";


import type {
  Employee
} from "../../services/workspace/employees.service";

interface Props {

  employee: Employee;

  onView?: (employee: Employee) => void;

}

const EmployeeCard = ({
  employee,
  onView
}: Props) => {

  return (



        <Box

  bg="white"

  borderRadius="20px"

  p={5}

  shadow="sm"

  cursor="pointer"

  transition="all .2s"

  _hover={{

    shadow: "lg",

    transform: "translateY(-3px)"

  }}

  onClick={() =>

    onView?.(employee)

  }

>

      <HStack

        justify="space-between"

        align="center"

      >

        <HStack

          spacing={4}

          align="center"

        >

          {/* <Avatar

            name={employee.name}

            size="md"

            bg="brand.500"

          /> */}

          <VStack

            align="start"

            spacing={1}

          >

            <Text

              fontWeight="700"

              fontSize="lg"

            >

              {employee.name}

            </Text>

            <Text

              color="gray.500"

              fontSize="sm"

            >

              {employee.email}

            </Text>

            <Text

              color="gray.500"

              fontSize="sm"

            >

              {employee.mobile}

            </Text>

          </VStack>

        </HStack>

        <HStack

          align="center"

          spacing={2}

        >

          <Badge

            colorScheme={
              employee.role === "OWNER"
                ? "purple"
                : "blue"
            }

            borderRadius="full"

            px={3}

            py={1}

          >

            {employee.role}

          </Badge>

          <Badge

            colorScheme={
              employee.status === "ACTIVE"
                ? "green"
                : "red"
            }

            borderRadius="full"

            px={3}

            py={1}

          >

            {employee.status}

          </Badge>



        </HStack>

      </HStack>

    </Box>

  );

};

export default EmployeeCard;