import {
  ArrowBackIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import {
  Badge,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
  useToast,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import {

  FiBriefcase,
  FiSettings,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import { FiMessageSquare } from "react-icons/fi";


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getConsents } from "../../../services/client/consent.service";
import type { OrganizationConsent } from "../../../types/consent.types";
import WorkspaceFeatureCard from "../../../components/ClientUI/Workspace/WorkspaceFeatureCard";
import LeaveWorkspaceDialog from "../../../components/ClientUI/Workspace/LeaveWorkspaceDialog";

const ClientDashboardPage = () => {

  const navigate = useNavigate();

  const toast = useToast();

  const {
  isOpen: settingsOpen,
  onOpen,
  onClose,
} = useDisclosure();

const {
  isOpen: leaveOpen,
  onOpen: openLeave,
  onClose: closeLeave,
} = useDisclosure();



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
    <>

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

          {/* <WorkspaceFeatureCard
            title="Activity"
            description="Recent workspace activities."
            icon={FiActivity}
            onClick={() =>
              navigate("/client/workspace/activity")
            }
          /> */}

          <WorkspaceFeatureCard
    title="Coach Updates"
    description="View advice and updates from your coaches."
    icon={FiMessageSquare}
    onClick={() =>
        navigate("/client/workspace/coach-updates")
    }
/>

          {/* <WorkspaceFeatureCard
            title="Settings"
            description="Workspace preferences."
            icon={FiSettings}
            onClick={() =>
              navigate("/client/workspace/settings")
            }
          /> */}

          <WorkspaceFeatureCard
  title="Settings"
  description="Workspace preferences."
  icon={FiSettings}
   onClick={onOpen}
  
/>

        </VStack>

      </Box>

    </Box>

    <Drawer
    isOpen={settingsOpen}
    placement="bottom"
    onClose={onClose}
>

    <DrawerOverlay />

    <DrawerContent
        borderTopRadius="32px"
    >

        <DrawerCloseButton />

        <DrawerHeader>

            Workspace Settings

        </DrawerHeader>

<DrawerBody pb={8}>

    <VStack
        spacing={6}
        align="stretch"
    >

        {/* Organization Card */}

        <Box

            bg="
            linear-gradient(
            135deg,
            #E0F7FF,
            #BAE6FD,
            #7DD3FC
            )
            "

            borderRadius="3xl"

            p={6}

            position="relative"

            overflow="hidden"

        >

            <Box

                position="absolute"

                top="-30px"

                right="-30px"

                w="120px"

                h="120px"

                bg="rgba(255,255,255,.30)"

                borderRadius="full"

                filter="blur(20px)"

            />

            <Text
                fontSize="42px"
            >
                🏋️
            </Text>

            <Heading
                mt={2}
                size="md"
                color="gray.800"
            >

                {organizations[0]?.organization_name}

            </Heading>

            <Text
                color="gray.700"
            >

                {organizations[0]?.organization_type}

            </Text>

            <Button

                mt={5}

                size="sm"

                bg="white"

                color="blue.600"

                borderRadius="full"

                _hover={{
                    bg:"gray.100"
                }}

                onClick={() => {

                    navigator.clipboard.writeText(
                        organizations[0]?.workspace_code ?? ""
                    );

                    toast({

                        title:
                            "Workspace code copied.",

                        status:
                            "success"

                    });

                }}

            >

                📋 {organizations[0]?.workspace_code}

            </Button>

        </Box>

        {/* Privacy */}

        <WorkspaceFeatureCard

            title="Privacy"

            description="Manage consent and health data permissions."

            icon={FiShield}

            onClick={() => {

                onClose();

                navigate(
                    "/client/workspace/consent"
                );

            }}

        />

        {/* Danger */}

        <Box

            borderRadius="3xl"

            bg="
            linear-gradient(
            135deg,
            #FFF1F2,
            #FFE4E6
            )
            "

            border="1px solid"

            borderColor="red.100"

            p={6}

            cursor="pointer"

            transition=".25s"

            _hover={{

                transform:"translateY(-2px)",

                shadow:"lg"

            }}

            onClick={openLeave}

        >

            <HStack
                justify="space-between"
            >

                <Box>

                    <Heading

                        size="sm"

                        color="red.600"

                    >

                        🚪 Leave Workspace

                    </Heading>

                    <Text

                        mt={2}

                        color="gray.600"

                        fontSize="sm"

                    >

                        Disconnect from this
                        organization.

                    </Text>

                </Box>

                <ChevronRightIcon
                    boxSize={6}
                    color="red.400"
                />

            </HStack>

        </Box>

    </VStack>

</DrawerBody>

        <DrawerFooter>

            <Button
                onClick={onClose}
            >

                Close

            </Button>

        </DrawerFooter>

    </DrawerContent>

</Drawer>

<LeaveWorkspaceDialog

    isOpen={leaveOpen}

    onClose={closeLeave}

    organizationName={
        organizations[0]?.organization_name ??
        ""
    }

    onSuccess={() => {

        closeLeave();

        onClose();

        navigate("/dashboard");

    }}

/>
</>

  );

};

export default ClientDashboardPage;