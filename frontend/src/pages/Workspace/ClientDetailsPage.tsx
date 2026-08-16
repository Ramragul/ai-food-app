// import {
//   VStack,
//   HStack,
//   Box,
//   Avatar,
//   Text,
//   Spinner,
//   Center,
//   Button,
//   Badge,
//   SimpleGrid
// } from "@chakra-ui/react";

// import {
//   ArrowLeft
// } from "lucide-react";

// import {
//   useEffect,
//   useState
// } from "react";

// import {
//   useNavigate,
//   useParams
// } from "react-router-dom";

// import PageHeader from "../../components/WorkspaceUI/PageHeader";
// import ConsentCard from "../../components/WorkspaceUI/ConsentCard";
// import PersonalInfoCard from "../../components/WorkspaceUI/PersonalInfoCard";
// import EmptyStateCard from "../../components/WorkspaceUI/EmptyStateCard";

// import {
//   getClientDetails,
//   type ClientDetails
// } from "../../services/workspace/clients.service";

// import QuickStatsCard
// from "../../components/WorkspaceUI/ClientDetails/QuickStatsCard";
// import FitnessProfileCard from "../../components/WorkspaceUI/ClientDetails/FitnessProfileCard";
// import TodayNutritionCard from "../../components/WorkspaceUI/ClientDetails/TodayNutritionCard";
// import CoachNotesCard from "../../components/WorkspaceUI/ClientDetails/CoachNotesCard";

// const ClientDetailsPage = () => {

//   const navigate =
//     useNavigate();

//   const {
//     memberId
//   } = useParams();

//   const [
//     details,
//     setDetails
//   ] =
//     useState<ClientDetails | null>(null);

//   const [
//     loading,
//     setLoading
//   ] =
//     useState(true);

//   const [
//     error,
//     setError
//   ] =
//     useState("");

//   useEffect(() => {

//     if (!memberId) {

//       return;

//     }

//     void loadClient();

//   }, [memberId]);

//   const loadClient = async () => {

//     try {

//       setLoading(true);

//       const response =
//         await getClientDetails(
//           Number(memberId)
//         );

//       setDetails(response);

//     }

//     catch {

//       setError(
//         "Unable to load client details."
//       );

//     }

//     finally {

//       setLoading(false);

//     }

//   };

//   if (loading) {

//     return (

//       <Center h="300px">

//         <Spinner

//           size="xl"

//           color="brand.500"

//         />

//       </Center>

//     );

//   }

//   if (error || !details) {

//     return (

//       <Center py={20}>

//         <Text color="red.500">

//           {error}

//         </Text>

//       </Center>

//     );

//   }

//   return (

//     <VStack

//       spacing={6}

//       align="stretch"

//     >

//       <Button

//         leftIcon={
//           <ArrowLeft size={18} />
//         }

//         alignSelf="flex-start"

//         variant="ghost"

//         onClick={() =>
//           navigate(-1)
//         }

//       >

//         Back to Clients

//       </Button>

//       <PageHeader

//         title="Client Details"

//         subtitle="View client profile and health information."

//       />

//       {/* Profile Header */}

//       <Box

//         bg="white"

//         borderRadius="20px"

//         p={6}

//         shadow="sm"

//       >

//         <HStack

//           spacing={5}

//           align="center"

//         >

//           <Avatar

//             size="xl"

//             name={
//               details.client.name
//             }

//           />

//           <VStack

//             align="start"

//             spacing={2}

//           >

//             <Text

//               fontSize="2xl"

//               fontWeight="700"

//             >

//               {details.client.name}

//             </Text>

//             <Text

//               color="gray.500"

//             >

//               {details.client.nickname}

//             </Text>

//             <HStack>

//               <Badge

//                 colorScheme="blue"

//               >

//                 {details.client.gender}

//               </Badge>

//               <Badge

//                 colorScheme="purple"

//               >

//                 {details.client.age_range}

//               </Badge>

//             </HStack>

//           </VStack>

//         </HStack>

//       </Box>


// <SimpleGrid

//   columns={{
//     base: 2,
//     lg: 4
//   }}

//   spacing={5}

// >

//   <QuickStatsCard

//     title="Calories"

//     value={
//       details.today?.consumed?.calories ?? 0
//     }

//     subtitle={`Target ${
//       details.today?.target?.calories ?? 0
//     } kcal`}

//   />

//   <QuickStatsCard

//     title="Protein"

//     value={`${(
//       details.today?.consumed?.protein ?? 0
//     ).toFixed(1)} g`}

//     subtitle={`Target ${
//       details.today?.target?.protein ?? 0
//     } g`}

//   />

//   <QuickStatsCard

//     title="Goal"

//     value={
//       details.fitness_profile
//         ?.goal_type
//         ?.replaceAll("_", " ")
//         // .replace(/\b\w/g, c => c.toUpperCase()) ??
//         .replace(/\b\w/g, (c: string) => c.toUpperCase()) ??
//       "--"
//     }

//     subtitle="Current Goal"

//   />

//   <QuickStatsCard

//     title="Consent"

//     value={
//       details.consent.granted
//         ? "Granted"
//         : "Pending"
//     }

//     subtitle={details.consent.status}

//   />

// </SimpleGrid>



//       {/* Consent */}

//       <ConsentCard

//         consent={details.consent}

//       />

//       {/* Personal Information */}

//       <PersonalInfoCard

//         client={details.client}

//       />

//       {/* Fitness Profile */}

//       {

// details.fitness_profile ? (
//   <FitnessProfileCard
//     profile={details.fitness_profile}
//   />
// ) : (
//   <EmptyStateCard
//     title="Fitness Profile"
//     message="No active fitness profile."
//   />
// )

//       }

//       {/* Today's Nutrition */}

//       {
// details.today ? (

//     <TodayNutritionCard

//       nutrition={details.today}

//     />

//   ) : (

//     <EmptyStateCard

//       title="Today's Nutrition"

//       message="No nutrition data available for today."

//     />

//   )

//       }

//       {/* Coach Notes */}

//       {

//         details.coach_notes.length > 0 ? (

//           <Box

//             bg="white"

//             p={6}

//             borderRadius="20px"

//             shadow="sm"

//           >

//             <Text

//               fontWeight="700"

//               fontSize="lg"

//               mb={4}

//             >

//               Coach Notes

//             </Text>

//             {

//               details.coach_notes.map(

//                 (note: any) => (

//                   <Box

//                     key={note.id}

//                     mb={3}

//                   >

//                     <Text>

//                       {note.note}

//                     </Text>

//                   </Box>

//                 )

//               )

//             }

//           </Box>

//         ) : (

// <CoachNotesCard

//   notes={details.coach_notes}

// />

//         )

//       }

//       {/* Permissions */}

//       <Box

//         bg="white"

//         borderRadius="20px"

//         p={6}

//         shadow="sm"

//       >

//         <Text

//           fontSize="lg"

//           fontWeight="700"

//           mb={5}

//         >

//           Permissions

//         </Text>

//         <VStack

//           align="stretch"

//           spacing={3}

//         >

//           <HStack

//             justify="space-between"

//           >

//             <Text>

//               View Profile

//             </Text>

//             <Badge

//               colorScheme={
//                 details.permissions.can_view_profile
//                   ? "green"
//                   : "red"
//               }

//             >

//               {

//                 details.permissions.can_view_profile
//                   ? "Allowed"
//                   : "Denied"

//               }

//             </Badge>

//           </HStack>

//           <HStack

//             justify="space-between"

//           >

//             <Text>

//               View Nutrition

//             </Text>

//             <Badge

//               colorScheme={
//                 details.permissions.can_view_nutrition
//                   ? "green"
//                   : "red"
//               }

//             >

//               {

//                 details.permissions.can_view_nutrition
//                   ? "Allowed"
//                   : "Denied"

//               }

//             </Badge>

//           </HStack>

//           <HStack

//             justify="space-between"

//           >

//             <Text>

//               Write Notes

//             </Text>

//             <Badge

//               colorScheme={
//                 details.permissions.can_write_notes
//                   ? "green"
//                   : "red"
//               }

//             >

//               {

//                 details.permissions.can_write_notes
//                   ? "Allowed"
//                   : "Denied"

//               }

//             </Badge>

//           </HStack>

//           <HStack

//             justify="space-between"

//           >

//             <Text>

//               Create Goal

//             </Text>

//             <Badge

//               colorScheme={
//                 details.permissions.can_create_goal
//                   ? "green"
//                   : "red"
//               }

//             >

//               {

//                 details.permissions.can_create_goal
//                   ? "Allowed"
//                   : "Denied"

//               }

//             </Badge>

//           </HStack>

//         </VStack>

//       </Box>

//     </VStack>

//   );

// };

// export default ClientDetailsPage;



// Version 2 

import {
  VStack,
  HStack,
  Box,
  Avatar,
  Text,
  Spinner,
  Center,
  Button,
  Badge,
  SimpleGrid
} from "@chakra-ui/react";

import {
  ArrowLeft
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import PageHeader from "../../components/WorkspaceUI/PageHeader";
import ConsentCard from "../../components/WorkspaceUI/ConsentCard";
import PersonalInfoCard from "../../components/WorkspaceUI/PersonalInfoCard";
import EmptyStateCard from "../../components/WorkspaceUI/EmptyStateCard";

import {
  getClientDetails,
  type ClientDetails
} from "../../services/workspace/clients.service";

import QuickStatsCard
  from "../../components/WorkspaceUI/ClientDetails/QuickStatsCard";

import FitnessProfileCard
  from "../../components/WorkspaceUI/ClientDetails/FitnessProfileCard";

import TodayNutritionCard
  from "../../components/WorkspaceUI/ClientDetails/TodayNutritionCard";

import CoachNotesCard
  from "../../components/WorkspaceUI/ClientDetails/CoachNotesCard";


const ClientDetailsPage = () => {

  const navigate =
    useNavigate();

  const {
    memberId
  } = useParams();


  const [
    details,
    setDetails
  ] =
    useState<ClientDetails | null>(null);


  const [
    loading,
    setLoading
  ] =
    useState(true);


  const [
    error,
    setError
  ] =
    useState("");


  useEffect(() => {

    if (!memberId) {

      setLoading(false);

      setError(
        "Client information is unavailable."
      );

      return;

    }

    void loadClient();

  }, [memberId]);


  const loadClient = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await getClientDetails(
          Number(memberId)
        );

      setDetails(response);

    }

    catch {

      setError(
        "Unable to load client details."
      );

    }

    finally {

      setLoading(false);

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


  if (error || !details) {

    return (

      <Center py={20}>

        <Text color="red.500">

          {error || "Client details are unavailable."}

        </Text>

      </Center>

    );

  }


  /*
  ------------------------------------------------
  SAFE DATA REFERENCES
  ------------------------------------------------
  */

  const client =
    details.client;

  const consent =
    details.consent;

  const fitnessProfile =
    details.fitness_profile;

  const today =
    details.today;

  const coachNotes =
    details.coach_notes ?? [];

  const permissions =
    details.permissions;


  return (

    <VStack

      spacing={6}

      align="stretch"

    >


      {/* ------------------------------------------
          BACK
      ------------------------------------------ */}

      <Button

        leftIcon={
          <ArrowLeft size={18} />
        }

        alignSelf="flex-start"

        variant="ghost"

        onClick={() =>
          navigate(-1)
        }

      >

        Back to Clients

      </Button>


      {/* ------------------------------------------
          HEADER
      ------------------------------------------ */}

      <PageHeader

        title="Client Details"

        subtitle="View client profile and health information."

      />


      {/* ------------------------------------------
          PROFILE HEADER
      ------------------------------------------ */}

      <Box

        bg="white"

        borderRadius="20px"

        p={6}

        shadow="sm"

      >

        <HStack

          spacing={5}

          align="center"

        >

          <Avatar

            size="xl"

            name={
              client?.name ?? ""
            }

          />


          <VStack

            align="start"

            spacing={2}

          >

            <Text

              fontSize="2xl"

              fontWeight="700"

            >

              {client?.name || "--"}

            </Text>


            {client?.nickname && (

              <Text

                color="gray.500"

              >

                {client.nickname}

              </Text>

            )}


            <HStack>

              {client?.gender && (

                <Badge

                  colorScheme="blue"

                >

                  {client.gender}

                </Badge>

              )}


              {client?.age_range && (

                <Badge

                  colorScheme="purple"

                >

                  {client.age_range}

                </Badge>

              )}

            </HStack>

          </VStack>

        </HStack>

      </Box>


      {/* ------------------------------------------
          QUICK STATS
      ------------------------------------------ */}

      <SimpleGrid

        columns={{
          base: 2,
          lg: 4
        }}

        spacing={5}

      >


        <QuickStatsCard

          title="Calories"

          value={
            today?.consumed?.calories ?? 0
          }

          subtitle={`Target ${
            today?.target?.calories ?? 0
          } kcal`}

        />


        <QuickStatsCard

          title="Protein"

          value={`${(
            today?.consumed?.protein ?? 0
          ).toFixed(1)} g`}

          subtitle={`Target ${
            today?.target?.protein ?? 0
          } g`}

        />


        <QuickStatsCard

          title="Goal"

          value={

            fitnessProfile?.goal_type

              ? fitnessProfile.goal_type
                  .replaceAll("_", " ")
                  .replace(
                    /\b\w/g,
                    (c: string) =>
                      c.toUpperCase()
                  )

              : "--"

          }

          subtitle="Current Goal"

        />


        <QuickStatsCard

          title="Consent"

          value={

            consent?.granted
              ? "Granted"
              : "Pending"

          }

          subtitle={
            consent?.status ?? "--"
          }

        />

      </SimpleGrid>


      {/* ------------------------------------------
          CONSENT
      ------------------------------------------ */}

      {consent ? (

        <ConsentCard

          consent={consent}

        />

      ) : (

        <EmptyStateCard

          title="Consent"

          message="Consent information is unavailable."

        />

      )}


      {/* ------------------------------------------
          PERSONAL INFORMATION
      ------------------------------------------ */}

      {client ? (

        <PersonalInfoCard

          client={client}

        />

      ) : (

        <EmptyStateCard

          title="Personal Information"

          message="Personal information is unavailable."

        />

      )}


      {/* ------------------------------------------
          FITNESS PROFILE
      ------------------------------------------ */}

      {fitnessProfile ? (

        <FitnessProfileCard

          profile={fitnessProfile}

        />

      ) : (

        <EmptyStateCard

          title="Fitness Profile"

          message="No active fitness profile."

        />

      )}


      {/* ------------------------------------------
          TODAY'S NUTRITION
      ------------------------------------------ */}

      {today ? (

        <TodayNutritionCard

          nutrition={today}

        />

      ) : (

        <EmptyStateCard

          title="Today's Nutrition"

          message="No nutrition data available for today."

        />

      )}


      {/* ------------------------------------------
          COACH NOTES
      ------------------------------------------ */}

      {coachNotes.length > 0 ? (

        <Box

          bg="white"

          p={6}

          borderRadius="20px"

          shadow="sm"

        >

          <Text

            fontWeight="700"

            fontSize="lg"

            mb={4}

          >

            Coach Notes

          </Text>


          {coachNotes.map((note) => (

            <Box

              key={note.id}

              mb={3}

            >

              <Text>

                {note.note}

              </Text>

            </Box>

          ))}

        </Box>

      ) : (

        <CoachNotesCard

          notes={coachNotes}

        />

      )}


      {/* ------------------------------------------
          PERMISSIONS
      ------------------------------------------ */}

      <Box

        bg="white"

        borderRadius="20px"

        p={6}

        shadow="sm"

      >

        <Text

          fontSize="lg"

          fontWeight="700"

          mb={5}

        >

          Permissions

        </Text>


        {!permissions ? (

          <Text

            color="gray.500"

            fontSize="sm"

          >

            Permission information is unavailable.

          </Text>

        ) : (

          <VStack

            align="stretch"

            spacing={3}

          >


            {/* View Profile */}

            <HStack

              justify="space-between"

            >

              <Text>

                View Profile

              </Text>


              <Badge

                colorScheme={

                  permissions.can_view_profile
                    ? "green"
                    : "red"

                }

              >

                {

                  permissions.can_view_profile
                    ? "Allowed"
                    : "Denied"

                }

              </Badge>

            </HStack>


            {/* View Nutrition */}

            <HStack

              justify="space-between"

            >

              <Text>

                View Nutrition

              </Text>


              <Badge

                colorScheme={

                  permissions.can_view_nutrition
                    ? "green"
                    : "red"

                }

              >

                {

                  permissions.can_view_nutrition
                    ? "Allowed"
                    : "Denied"

                }

              </Badge>

            </HStack>


            {/* Write Notes */}

            <HStack

              justify="space-between"

            >

              <Text>

                Write Notes

              </Text>


              <Badge

                colorScheme={

                  permissions.can_write_notes
                    ? "green"
                    : "red"

                }

              >

                {

                  permissions.can_write_notes
                    ? "Allowed"
                    : "Denied"

                }

              </Badge>

            </HStack>


            {/* Create Goal */}

            <HStack

              justify="space-between"

            >

              <Text>

                Create Goal

              </Text>


              <Badge

                colorScheme={

                  permissions.can_create_goal
                    ? "green"
                    : "red"

                }

              >

                {

                  permissions.can_create_goal
                    ? "Allowed"
                    : "Denied"

                }

              </Badge>

            </HStack>


          </VStack>

        )}

      </Box>


    </VStack>

  );

};


export default ClientDetailsPage;