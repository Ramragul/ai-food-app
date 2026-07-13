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
import FitnessProfileCard from "../../components/WorkspaceUI/ClientDetails/FitnessProfileCard";
import TodayNutritionCard from "../../components/WorkspaceUI/ClientDetails/TodayNutritionCard";
import CoachNotesCard from "../../components/WorkspaceUI/ClientDetails/CoachNotesCard";

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

      return;

    }

    void loadClient();

  }, [memberId]);

  const loadClient = async () => {

    try {

      setLoading(true);

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

          {error}

        </Text>

      </Center>

    );

  }

  return (

    <VStack

      spacing={6}

      align="stretch"

    >

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

      <PageHeader

        title="Client Details"

        subtitle="View client profile and health information."

      />

      {/* Profile Header */}

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
              details.client.name
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

              {details.client.name}

            </Text>

            <Text

              color="gray.500"

            >

              {details.client.nickname}

            </Text>

            <HStack>

              <Badge

                colorScheme="blue"

              >

                {details.client.gender}

              </Badge>

              <Badge

                colorScheme="purple"

              >

                {details.client.age_range}

              </Badge>

            </HStack>

          </VStack>

        </HStack>

      </Box>


      <SimpleGrid

  columns={{
    base: 2,
    lg: 4
  }}

  spacing={5}

>

  <QuickStatsCard

    title="Calories"

    value="--"

    subtitle="Today"

  />

  <QuickStatsCard

    title="Protein"

    value="--"

    subtitle="Today"

  />

  <QuickStatsCard

    title="Meals"

    value="0"

    subtitle="Today"

  />

  <QuickStatsCard

    title="Consent"

    value={
      details.consent.granted
        ? "Granted"
        : "Denied"
    }

  />

</SimpleGrid>

      {/* Consent */}

      <ConsentCard

        consent={details.consent}

      />

      {/* Personal Information */}

      <PersonalInfoCard

        client={details.client}

      />

      {/* Fitness Profile */}

      {

        details.fitness_profile ? (

          <Box

            bg="white"

            p={6}

            borderRadius="20px"

            shadow="sm"

          >

            <Text

              fontWeight="700"

              fontSize="lg"

            >

              Fitness Profile

            </Text>

          </Box>

        ) : (
<FitnessProfileCard

  profile={details.fitness_profile}

/>

        )

      }

      {/* Today's Nutrition */}

      {

        details.today ? (

          <Box

            bg="white"

            p={6}

            borderRadius="20px"

            shadow="sm"

          >

            <Text

              fontWeight="700"

              fontSize="lg"

            >

              Today's Nutrition

            </Text>

          </Box>

        ) : (
<TodayNutritionCard

  nutrition={details.today}

/>

        )

      }

      {/* Coach Notes */}

      {

        details.coach_notes.length > 0 ? (

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

            {

              details.coach_notes.map(

                (note: any) => (

                  <Box

                    key={note.id}

                    mb={3}

                  >

                    <Text>

                      {note.note}

                    </Text>

                  </Box>

                )

              )

            }

          </Box>

        ) : (

<CoachNotesCard

  notes={details.coach_notes}

/>

        )

      }

      {/* Permissions */}

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

        <VStack

          align="stretch"

          spacing={3}

        >

          <HStack

            justify="space-between"

          >

            <Text>

              View Profile

            </Text>

            <Badge

              colorScheme={
                details.permissions.can_view_profile
                  ? "green"
                  : "red"
              }

            >

              {

                details.permissions.can_view_profile
                  ? "Allowed"
                  : "Denied"

              }

            </Badge>

          </HStack>

          <HStack

            justify="space-between"

          >

            <Text>

              View Nutrition

            </Text>

            <Badge

              colorScheme={
                details.permissions.can_view_nutrition
                  ? "green"
                  : "red"
              }

            >

              {

                details.permissions.can_view_nutrition
                  ? "Allowed"
                  : "Denied"

              }

            </Badge>

          </HStack>

          <HStack

            justify="space-between"

          >

            <Text>

              Write Notes

            </Text>

            <Badge

              colorScheme={
                details.permissions.can_write_notes
                  ? "green"
                  : "red"
              }

            >

              {

                details.permissions.can_write_notes
                  ? "Allowed"
                  : "Denied"

              }

            </Badge>

          </HStack>

          <HStack

            justify="space-between"

          >

            <Text>

              Create Goal

            </Text>

            <Badge

              colorScheme={
                details.permissions.can_create_goal
                  ? "green"
                  : "red"
              }

            >

              {

                details.permissions.can_create_goal
                  ? "Allowed"
                  : "Denied"

              }

            </Badge>

          </HStack>

        </VStack>

      </Box>

    </VStack>

  );

};

export default ClientDetailsPage;