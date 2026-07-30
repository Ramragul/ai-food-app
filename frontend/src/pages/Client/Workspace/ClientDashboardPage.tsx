import {
  ArrowBackIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import {
  Badge,
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiBriefcase,
  FiSettings,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getConsents } from "../../../services/client/consent.service";
import type { OrganizationConsent } from "../../../types/consent.types";
import WorkspaceFeatureCard from "../../../components/ClientUI/Workspace/WorkspaceFeatureCard";

const ClientDashboardPage = () => {

  const navigate = useNavigate();

  const toast = useToast();

  const [loading, setLoading] = useState(true);

  const [organizations, setOrganizations] = useState<OrganizationConsent[]>([]);

  useEffect(() => {
    loadWorkspace();
  }, []);

  const loadWorkspace = async () => {

    try {

      const response = await getConsents();

      setOrganizations(response);

    } catch {

      toast({
        title: "Unable to load workspace.",
        status: "error",
        isClosable: true,
      });

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={20}
      >
        <Spinner size="xl" />
      </Box>
    );

  }

  const pendingConsents =
    organizations.filter(org => !org.granted).length;

  return (

    <Box
      bg="gray.50"
      minH="100vh"
      p={6}
    >

      <HStack mb={6}>

        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          variant="ghost"
          onClick={() => navigate(-1)}
        />

        <Box>

          <Heading size="lg">
            My Workspace
          </Heading>

          <Text color="gray.500">
            Connected organizations
          </Text>

        </Box>

      </HStack>

      <Box
        bg="white"
        p={5}
        rounded="xl"
        shadow="sm"
        mb={6}
      >

        <Heading
          size="md"
          mb={4}
        >
          Your Organizations
        </Heading>

        <VStack
          spacing={4}
          align="stretch"
        >

          {organizations.map((org) => (

            <Box
              key={org.organization_id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >

              <HStack
                justify="space-between"
                align="start"
              >

                <HStack
                  spacing={4}
                  align="start"
                >

                  <Icon
                    as={FiBriefcase}
                    boxSize={5}
                    color="blue.500"
                  />

                  <Box>

                    <Text fontWeight="bold">
                      {org.organization_name}
                    </Text>

                    <Text
                      color="gray.500"
                      fontSize="sm"
                    >
                      {org.organization_type}
                    </Text>

                  </Box>

                </HStack>

                <Badge
                  colorScheme={
                    org.granted
                      ? "green"
                      : "orange"
                  }
                >
                  {
                    org.granted
                      ? "Granted"
                      : "Consent Required"
                  }
                </Badge>

              </HStack>

            </Box>

          ))}

        </VStack>

      </Box>

      <Box
        bg="white"
        rounded="xl"
        shadow="sm"
        p={5}
      >

        <HStack
          justify="space-between"
          mb={4}
        >

          <Heading size="md">
            Quick Actions
          </Heading>

          {pendingConsents > 0 && (

            <Badge colorScheme="orange">
              {pendingConsents} Pending
            </Badge>

          )}

        </HStack>

        <Divider mb={4} />

        <VStack
          spacing={4}
          align="stretch"
        >

          <WorkspaceFeatureCard
            title="Consent"
            description="Manage organization permissions."
            icon={FiShield}
            onClick={() =>
              navigate("/client/workspace/consent")
            }
          />

          <WorkspaceFeatureCard
            title="Members"
            description="View organization members."
            icon={FiUsers}
            onClick={() =>
              navigate("/client/workspace/members")
            }
          />

          <WorkspaceFeatureCard
            title="Activity"
            description="Recent workspace activities."
            icon={FiActivity}
            onClick={() =>
              navigate("/client/workspace/activity")
            }
          />

          <WorkspaceFeatureCard
            title="Settings"
            description="Workspace preferences."
            icon={FiSettings}
            onClick={() =>
              navigate("/client/workspace/settings")
            }
          />

        </VStack>

      </Box>

    </Box>

  );

};

export default ClientDashboardPage;