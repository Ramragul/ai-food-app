import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Badge,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";

import {
    useRef,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import {
    acceptInvitation,
    declineInvitation
} from "../../services/client/invitation.service";

import type {
    WorkspaceInvitation
} from "../../types/invitation.types";

interface Props {

    invitation: WorkspaceInvitation | null;

    isOpen: boolean;

    onClose: () => void;

    onSuccess: () => void;

}

const InvitationReviewDrawer = ({
    invitation,
    isOpen,
    onClose,
    onSuccess
}: Props) => {

    const toast = useToast();

    const navigate = useNavigate();

    const cancelRef =
        useRef<HTMLButtonElement>(null);

    const [loading, setLoading] =
        useState(false);

    const [
        showDeclineDialog,
        setShowDeclineDialog
    ] = useState(false);

    if (!invitation) return null;

    const expiry =
        new Date(
            invitation.expires_at
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    const handleAccept = async () => {

        try {

            setLoading(true);

            await acceptInvitation(
                invitation.invitation_token
            );

            toast({

                title: "Invitation accepted",

                status: "success"

            });

            onSuccess();

            onClose();

            navigate(
                "/client/workspace/consent",
                {
                    state: {
                        organizationId:
                            invitation.organization_id
                    }
                }
            );

        }

        catch (err: any) {

            toast({

                title:
                    err?.response?.data?.message ??
                    "Unable to accept invitation",

                status: "error"

            });

        }

        finally {

            setLoading(false);

        }

    };

    const handleDecline = async () => {

        try {

            setLoading(true);

            await declineInvitation(
                invitation.invitation_token
            );

            toast({

                title: "Invitation declined",

                status: "success"

            });

            setShowDeclineDialog(false);

            onSuccess();

            onClose();

        }

        catch (err: any) {

            toast({

                title:
                    err?.response?.data?.message ??
                    "Unable to decline invitation",

                status: "error"

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
            >

                <DrawerOverlay />

                <DrawerContent
                    borderTopRadius="3xl"
                >

                    <DrawerCloseButton />

                    <DrawerHeader>

                        Workspace Invitation

                    </DrawerHeader>

                    <DrawerBody>

                        <VStack
                            align="start"
                            spacing={5}
                        >

                            <Text
                                fontSize="xl"
                                fontWeight="bold"
                            >

                                🏢 {invitation.organization_name}

                            </Text>

                            <HStack>

                                <Badge
                                    colorScheme="blue"
                                >

                                    {invitation.organization_type}

                                </Badge>

                                <Badge
                                    colorScheme="green"
                                >

                                    {invitation.role}

                                </Badge>

                            </HStack>

                            <Text>

                                <b>Invitation Type:</b>{" "}

                                {invitation.invitation_type}

                            </Text>

                            <Text>

                                <b>Expires:</b>{" "}

                                {expiry}

                            </Text>

                            <Text
                                color="gray.600"
                            >

                                By accepting this invitation,
                                you'll become part of this
                                workspace and can securely
                                share your nutrition,
                                measurements and progress
                                with your coach.

                            </Text>

                        </VStack>

                    </DrawerBody>

                    <DrawerFooter>

                        <HStack
                            w="full"
                        >

                            <Button

                                flex={1}

                                variant="outline"

                                colorScheme="red"

                                onClick={() =>
                                    setShowDeclineDialog(true)
                                }

                            >

                                Decline

                            </Button>

                            <Button

                                flex={1}

                                colorScheme="blue"

                                onClick={handleAccept}

                                isLoading={loading}

                                loadingText="Accepting..."

                            >

                                Accept

                            </Button>

                        </HStack>

                    </DrawerFooter>

                </DrawerContent>

            </Drawer>

            <AlertDialog

                isOpen={showDeclineDialog}

                leastDestructiveRef={cancelRef}

                onClose={() =>
                    setShowDeclineDialog(false)
                }

                isCentered

            >

                <AlertDialogOverlay>

                    <AlertDialogContent
                        borderRadius="2xl"
                    >

                        <AlertDialogHeader>

                            Decline Invitation

                        </AlertDialogHeader>

                        <AlertDialogBody>

                            <Text>

                                Are you sure you want to decline this invitation?

                            </Text>

                            <Text
                                mt={3}
                                fontSize="sm"
                                color="gray.500"
                            >

                                You won't become a member of this workspace.
                                If you're invited again later,
                                you'll be able to accept the new invitation.

                            </Text>

                        </AlertDialogBody>

                        <AlertDialogFooter>

                            <Button

                                ref={cancelRef}

                                onClick={() =>
                                    setShowDeclineDialog(false)
                                }

                            >

                                Cancel

                            </Button>

                            <Button

                                ml={3}

                                colorScheme="red"

                                onClick={handleDecline}

                                isLoading={loading}

                                loadingText="Declining..."

                            >

                                Decline Invitation

                            </Button>

                        </AlertDialogFooter>

                    </AlertDialogContent>

                </AlertDialogOverlay>

            </AlertDialog>

        </>

    );

};

export default InvitationReviewDrawer;