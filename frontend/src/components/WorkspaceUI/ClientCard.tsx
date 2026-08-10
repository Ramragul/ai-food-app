// Version 1

// import {
//   Badge,
//   Box,
//   HStack,
//   Text,
//   VStack
// } from "@chakra-ui/react";

// import type {
//   Client
// } from "../../services/workspace/clients.service";

// interface Props {

//   client: Client;

//   onClick?: (client: Client) => void;

// }

// const ClientCard = ({
//   client,
//   onClick
// }: Props) => {

//   return (

//     <Box

//       bg="white"

//       borderRadius="20px"

//       p={5}

//       shadow="sm"

//       cursor="pointer"

//       transition="all .2s"

//       _hover={{

//         shadow: "lg",

//         transform: "translateY(-3px)"

//       }}

//       onClick={() => onClick?.(client)}

//     >

//       <VStack

//         align="start"

//         spacing={3}

//       >

//         <Text

//           fontSize="lg"

//           fontWeight="700"

//         >

//           {client.name}

//         </Text>

//         <Text

//           fontSize="sm"

//           color="gray.500"

//         >

//           {client.email}

//         </Text>

//         <Text

//           fontSize="sm"

//           color="gray.500"

//         >

//           {client.mobile}

//         </Text>

//         <Box>

//           <Text

//             fontSize="xs"

//             color="gray.500"

//             mb={1}

//           >

//             Assigned Coach

//           </Text>

//           <Text

//             fontWeight="600"

//           >

//             {client.assigned_coach
//               ? `${client.assigned_coach.name} (${client.assigned_coach.role})`
//               : "Not Assigned"}

//           </Text>

//         </Box>

//         <HStack>

//           <Badge

//             colorScheme={
//               client.consent_granted
//                 ? "green"
//                 : "orange"
//             }

//             borderRadius="full"

//             px={3}

//             py={1}

//           >

//             {client.consent_granted
//               ? "Consent Granted"
//               : "Consent Pending"}

//           </Badge>

//         </HStack>

//       </VStack>

//     </Box>

//   );

// };

// export default ClientCard;


// Version 2

import {
  Badge,
  Box,
  Button,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";

import type {
  Client
} from "../../services/workspace/clients.service";

interface Props {

  client: Client;

  onClick?: (
    client: Client
  ) => void;

  onManage?: (
    client: Client
  ) => void;

}

const ClientCard = ({
  client,
  onClick,
  onManage
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
        onClick?.(client)
      }

    >

      <VStack
        align="start"
        spacing={3}
      >

        <HStack
          w="full"
          justify="space-between"
          align="start"
        >

          <VStack
            align="start"
            spacing={1}
          >

            <Text
              fontSize="lg"
              fontWeight="700"
            >

              {client.name}

            </Text>

            {client.nickname && (

              <Text
                fontSize="sm"
                color="gray.500"
              >

                {client.nickname}

              </Text>

            )}

          </VStack>

          <Badge
            colorScheme={
              client.status === "ACTIVE"
                ? "green"
                : "red"
            }
            borderRadius="full"
            px={3}
            py={1}
          >

            {client.status}

          </Badge>

        </HStack>


        <Text
          fontSize="sm"
          color="gray.500"
        >

          {client.email}

        </Text>


        <Text
          fontSize="sm"
          color="gray.500"
        >

          {client.mobile}

        </Text>


        <Box>

          <Text
            fontSize="xs"
            color="gray.500"
            mb={1}
          >

            Assigned Coach

          </Text>

          <Text
            fontWeight="600"
          >

            {client.assigned_coach
              ? `${client.assigned_coach.name} (${client.assigned_coach.role})`
              : "Not Assigned"
            }

          </Text>

        </Box>


        <HStack
          w="full"
          justify="space-between"
          align="center"
        >

          <Badge
            colorScheme={
              client.consent_granted
                ? "green"
                : "orange"
            }
            borderRadius="full"
            px={3}
            py={1}
          >

            {client.consent_granted
              ? "Consent Granted"
              : "Consent Pending"
            }

          </Badge>


          {onManage && (

            <Button

              size="sm"

              variant="ghost"

              colorScheme="blue"

              borderRadius="10px"

              onClick={(event) => {

                event.stopPropagation();

                onManage(client);

              }}

            >

              Manage

            </Button>

          )}

        </HStack>

      </VStack>

    </Box>

  );

};

export default ClientCard;