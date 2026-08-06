import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    SimpleGrid,
    Text,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useToast
} from "@chakra-ui/react";

import {
    FiActivity,
    FiHeart,
    FiUser,
    FiSun,
    FiHome
} from "react-icons/fi";

import {
    useMemo,
    useState
} from "react";

import BusinessTypeCard from "./BusinessTypeCard";

import {
    createOrganization
} from "../../services/workspace/organization.service";

interface Props {

    onBack: () => void;

    onSuccess: (
        workspace: any
    ) => void;

}

const WorkspaceDetailsStep = ({
    onBack,
    onSuccess
}: Props) => {

    const toast =
        useToast();

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

        name,

        setName

    ] = useState("");

    const [

        organizationType,

        setOrganizationType

    ] = useState("");

    const [

        mobile,

        setMobile

    ] = useState("");

    const [

        email,

        setEmail

    ] = useState("");

    const [

        website,

        setWebsite

    ] = useState("");

    const errors =
        useMemo(() => ({

            name:
                !name.trim(),

            organizationType:
                !organizationType

        }), [

            name,

            organizationType

        ]);

    const hasErrors =
        errors.name ||
        errors.organizationType;

    const handleCreate =
        async () => {

            if (
                hasErrors
            ) {

                toast({

                    title:
                        "Please complete the required fields.",

                    status:
                        "warning",

                    isClosable:
                        true

                });

                return;

            }

            try {

                setLoading(true);

                const workspace =
                    await createOrganization({

                        name,

                        organization_type:
                            organizationType,

                        mobile:
                            mobile || null,

                        email:
                            email || null,

                        website:
                            website || null

                    });

                onSuccess(
                    workspace
                );

            }

            catch (

                err: any

            ) {

                toast({

                    title:
                        err?.response?.data?.error ||
                        "Unable to create workspace.",

                    status:
                        "error",

                    isClosable:
                        true

                });

            }

            finally {

                setLoading(false);

            }

        };

    return (

        <VStack

            spacing={8}

            align="stretch"

        >

            <VStack>

                <Heading
                    size="lg"
                >

                    Workspace Details

                </Heading>

                <Text
                    color="gray.600"
                >

                    Let's create your first workspace.

                </Text>

            </VStack>

            <FormControl

                isRequired

                isInvalid={
                    errors.name
                }

            >

                <FormLabel>

                    Workspace Name

                </FormLabel>

                <Input

                    size="lg"

                    placeholder="Bairava Fitness Hub"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }

                />

                <FormErrorMessage>

                    Workspace name is required.

                </FormErrorMessage>

            </FormControl>

            <Box>

                <FormLabel>

                    Business Type

                </FormLabel>

                <SimpleGrid

                    columns={{
                        base: 1,
                        sm: 2,
                        lg: 3
                    }}

                    spacing={5}

                >

                    <BusinessTypeCard

                        emoji="🏋️"

                        icon={FiActivity}

                        title="Gym"

                        value="GYM"

                        selected={
                            organizationType === "GYM"
                        }

                        onClick={
                            setOrganizationType
                        }

                    />

                    <BusinessTypeCard

                        emoji="🥗"

                        icon={FiHeart}

                        title="Nutrition Clinic"

                        value="NUTRITION_CLINIC"

                        selected={
                            organizationType ===
                            "NUTRITION_CLINIC"
                        }

                        onClick={
                            setOrganizationType
                        }

                    />

                    <BusinessTypeCard

                        emoji="💪"

                        icon={FiUser}

                        title="Personal Trainer"

                        value="PERSONAL_TRAINER"

                        selected={
                            organizationType ===
                            "PERSONAL_TRAINER"
                        }

                        onClick={
                            setOrganizationType
                        }

                    />

                    <BusinessTypeCard

                        emoji="🧘"

                        icon={FiSun}

                        title="Yoga Studio"

                        value="YOGA_STUDIO"

                        selected={
                            organizationType ===
                            "YOGA_STUDIO"
                        }

                        onClick={
                            setOrganizationType
                        }

                    />

                    <BusinessTypeCard

                        emoji="🏃"

                        icon={FiHome}

                        title="Fitness Center"

                        value="FITNESS_CENTER"

                        selected={
                            organizationType ===
                            "FITNESS_CENTER"
                        }

                        onClick={
                            setOrganizationType
                        }

                    />

                </SimpleGrid>

            </Box>

            <Accordion
                allowToggle
            >

                <AccordionItem
                    border="none"
                >

                    <AccordionButton
                        borderRadius="xl"
                        bg="gray.50"
                    >

                        <Box
                            flex="1"
                            textAlign="left"
                            fontWeight="600"
                        >

                            Optional Business Information

                        </Box>

                        <AccordionIcon />

                    </AccordionButton>

                    <AccordionPanel
                        pt={6}
                    >

                        <VStack
                            spacing={5}
                        >

                            <FormControl>

                                <FormLabel>

                                    Mobile

                                </FormLabel>

                                <Input

                                    value={mobile}

                                    onChange={(e) =>
                                        setMobile(
                                            e.target.value
                                        )
                                    }

                                />

                            </FormControl>

                            <FormControl>

                                <FormLabel>

                                    Email

                                </FormLabel>

                                <Input

                                    type="email"

                                    value={email}

                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }

                                />

                            </FormControl>

                            <FormControl>

                                <FormLabel>

                                    Website

                                </FormLabel>

                                <Input

                                    placeholder="https://"

                                    value={website}

                                    onChange={(e) =>
                                        setWebsite(
                                            e.target.value
                                        )
                                    }

                                />

                            </FormControl>

                        </VStack>

                    </AccordionPanel>

                </AccordionItem>

            </Accordion>

            <Box>

                <Text

                    fontSize="sm"

                    color="gray.500"

                    textAlign="center"

                >

                    You can update your logo,
                    address, business profile,
                    timezone and other settings later.

                </Text>

            </Box>

            <SimpleGrid

                columns={{
                    base: 1,
                    sm: 2
                }}

                spacing={4}

            >

                <Button

                    size="lg"

                    variant="outline"

                    onClick={onBack}

                >

                    Back

                </Button>

                <Button

                    size="lg"

                    colorScheme="blue"

                    isLoading={loading}

                    loadingText="Creating..."

                    onClick={handleCreate}

                >

                    Create Workspace

                </Button>

            </SimpleGrid>

        </VStack>

    );

};

export default WorkspaceDetailsStep;