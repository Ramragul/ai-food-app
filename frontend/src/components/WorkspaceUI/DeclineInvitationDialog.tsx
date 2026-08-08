import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Text,
    useToast
} from "@chakra-ui/react";

import {
    useRef,
    useState
} from "react";

import { declineInvitation } from "../../services/workspace/invitations.service";

interface Props {

    isOpen: boolean;

    invitationToken: string;

    onClose: () => void;

    onSuccess?: () => void;

}

const DeclineInvitationDialog = ({
    isOpen,
    invitationToken,
    onClose,
    onSuccess
}: Props) => {

    const cancelRef =
        useRef<HTMLButtonElement>(null);

    const toast =
        useToast();

    const [loading, setLoading] =
        useState(false);

    const handleDecline = async () => {

        try {

            setLoading(true);

            await declineInvitation(
                invitationToken
            );

            toast({

                status: "success",

                title: "Invitation declined."

            });

            onSuccess?.();

            onClose();

        }

        catch {

            toast({

                status: "error",

                title: "Unable to decline invitation."

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AlertDialog

            isOpen={isOpen}

            leastDestructiveRef={cancelRef}

            onClose={onClose}

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
                            color="gray.500"
                            fontSize="sm"
                        >

                            You won't become a member of this workspace.
                            You can always accept a future invitation if invited again.

                        </Text>

                    </AlertDialogBody>

                    <AlertDialogFooter>

                        <Button
                            ref={cancelRef}
                            onClick={onClose}
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

    );

};

export default DeclineInvitationDialog;