// Version 1

// import {
//   VStack,
//   HStack,
//   Text,
//   Box,
//   Badge,
//   Divider
// } from "@chakra-ui/react";

// export interface ActivityItem {

//   action: string;

//   description: string;

//   severity: string;

//   created_at: string;

// }

// interface Props {

//   activities: ActivityItem[];

// }

// const formatDate = (date: string) => {

//   return new Date(date).toLocaleString(
//     "en-IN",
//     {
//       dateStyle: "medium",
//       timeStyle: "short"
//     }
//   );

// };

// const ActivityTimeline = ({
//   activities
// }: Props) => {

    

//   if (activities.length === 0) {

//     return (

//       <Box
//         bg="white"
//         borderRadius="20px"
//         p={6}
//       >

//         <Text
//           color="gray.500"
//         >

//           No recent activity.

//         </Text>

//       </Box>

//     );

//   }

//   return (

//     <Box
//       bg="white"
//       borderRadius="20px"
//       p={6}
//       shadow="sm"
//     >

//       <VStack
//         spacing={4}
//         align="stretch"
//       >

//         {activities.map((activity, index) => (

//           <Box
//             key={index}
//           >

//             <HStack
//               justify="space-between"
//               align="start"
//             >

//               <VStack
//                 align="start"
//                 spacing={1}
//               >

//                 <Text
//                   fontWeight="600"
//                 >

//                   {activity.description}

//                 </Text>

//                 <Badge
//                   colorScheme="blue"
//                 >

//                   {activity.action.replaceAll("_", " ")}

//                 </Badge>

//               </VStack>

//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//               >

//                 {formatDate(activity.created_at)}

//               </Text>

//             </HStack>

//             {index !== activities.length - 1 && (

//               <Divider mt={4} />

//             )}

//           </Box>

//         ))}

//       </VStack>

//     </Box>

//   );

// };

// export default ActivityTimeline;


// Version 2
import {
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  Divider,
  Button
} from "@chakra-ui/react";

export interface ActivityItem {

  action: string;

  description: string;

  severity: string;

  created_at: string;

}

interface Props {

  activities: ActivityItem[];

}

const formatDate = (date: string) => {

  return new Date(date).toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  );

};

const activityConfig: Record<
  string,
  {
    label: string;
    colorScheme:
      | "green"
      | "blue"
      | "purple"
      | "teal"
      | "orange"
      | "gray";
  }
> = {

  CLIENT_ASSIGNED: {
    label: "Client Assigned",
    colorScheme: "green"
  },

  CLIENT_INVITED: {
    label: "Client Invited",
    colorScheme: "blue"
  },

  EMPLOYEE_INVITED: {
    label: "Employee Invited",
    colorScheme: "purple"
  },

  INVITATION_ACCEPTED: {
    label: "Invitation Accepted",
    colorScheme: "teal"
  },

  WORKSPACE_CREATED: {
    label: "Workspace Created",
    colorScheme: "orange"
  }

};

const ActivityTimeline = ({
  activities
}: Props) => {

    

  if (activities.length === 0) {

    return (

      <Box
        bg="white"
        borderRadius="20px"
        p={6}
      >

        <Text
          color="gray.500"
        >

          No recent activity.

        </Text>

      </Box>

    );

  }

  return (

    <Box
      bg="white"
      borderRadius="20px"
      p={6}
      shadow="sm"
    >

      <VStack
        spacing={4}
        align="stretch"
      >

{activities.map((activity, index) => {

  const config =
    activityConfig[activity.action] ?? {

      label: activity.action,

      colorScheme: "gray"

    };

  return (

    <Box
      key={`${activity.action}-${activity.created_at}`}
    >

            <HStack
              justify="space-between"
              align="start"
            >

              <VStack
                align="start"
                spacing={1}
              >

                <Text
                  fontWeight="600"
                >

                  {activity.description}

                </Text>

<Badge
  colorScheme={config.colorScheme}
  borderRadius="full"
  px={3}
  py={1}
>
  {config.label}
</Badge>

              </VStack>

              <Text
                fontSize="sm"
                color="gray.500"
              >

                {formatDate(activity.created_at)}

              </Text>

            </HStack>

            {index !== activities.length - 1 && (

              <Divider mt={4} />

            )}

          </Box>
  );

 } )}

 <Button

    variant="ghost"

    colorScheme="blue"

    size="sm"

    alignSelf="flex-start"

>

    View All Activity

</Button>



      </VStack>

    </Box>

  );

};

export default ActivityTimeline;