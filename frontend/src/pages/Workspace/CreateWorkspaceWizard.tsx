import {
    Box,
    Container,
    Progress,
    useColorModeValue
} from "@chakra-ui/react";

import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import WorkspaceWelcomeStep from "../../components/WorkspaceUI/WorkspaceWelcomeStep";

import WorkspaceDetailsStep from "../../components/WorkspaceUI/WorkspaceDetailsStep";
import WorkspaceSuccessStep from "../../components/WorkspaceUI/WorkspaceSuccessStep";

const CreateWorkspaceWizard = () => {

    const navigate =
        useNavigate();

    const [
        step,
        setStep
    ] = useState(1);

    const [
        workspace,
        setWorkspace
    ] = useState<any>(null);

    const bg =
        useColorModeValue(
            "gray.50",
            "gray.900"
        );

    const cardBg =
        useColorModeValue(
            "white",
            "gray.800"
        );

    const progress =
        step === 1
            ? 33
            : step === 2
            ? 66
            : 100;

    return (

        <Box

            bg={bg}

            minH="100vh"

            py={{
                base: 6,
                md: 10
            }}

            px={{
                base: 4,
                md: 6
            }}

        >

            <Container

                maxW="5xl"

            >

                <Box

                    bg={cardBg}

                    borderRadius="3xl"

                    boxShadow="xl"

                    overflow="hidden"

                >

                    <Progress

                        value={progress}

                        colorScheme="blue"

                        size="sm"

                    />

                    <Box

                        p={{
                            base: 6,
                            md: 10
                        }}

                    >

                        {

                            step === 1 && (

                                <WorkspaceWelcomeStep

                                    onContinue={() =>
                                        setStep(2)
                                    }

                                    onCancel={() =>
                                        navigate("/home")
                                    }

                                />

                            )

                        }

                        {

                            step === 2 && (

                                <WorkspaceDetailsStep

                                    onBack={() =>
                                        setStep(1)
                                    }

                                    onSuccess={(data) => {

                                        setWorkspace(
                                            data
                                        );

                                        setStep(3);

                                    }}

                                />

                            )

                        }

                        {

                            step === 3 &&

                            workspace && (

                                <WorkspaceSuccessStep

                                    workspace={
                                        workspace
                                    }

                                />

                            )

                        }

                    </Box>

                </Box>

            </Container>

        </Box>

    );

};

export default CreateWorkspaceWizard;