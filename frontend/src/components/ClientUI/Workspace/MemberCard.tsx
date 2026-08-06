import {
    Avatar,
    Badge,
    Box,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";

import type {
    WorkspaceMember,
} from "../../../types/client.types";

import {
    getRoleColor,
} from "../../../utils/workspace";

import {
    formatDate,
} from "../../../utils/date";

interface Props {

    member: WorkspaceMember;

}

const MemberCard = ({
    member,
}: Props) => {

    return (

        <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            border="1px solid"
            borderColor="gray.100"
            boxShadow="0 10px 30px rgba(0,0,0,.05)"
            transition=".25s"
            _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 18px 45px rgba(0,0,0,.08)"
            }}
        >

            <HStack
                spacing={4}
                align="center"
            >

                <Avatar
                    size="lg"
                    name={member.name}
                />

                <VStack
                    flex={1}
                    align="start"
                    spacing={1}
                >

                    <HStack>

                        <Text
                            fontWeight="700"
                            fontSize="lg"
                            color="gray.800"
                        >
                            {member.name}
                        </Text>

                        {member.is_current_user && (

                            <Badge
                                colorScheme="blue"
                                borderRadius="full"
                            >
                                You
                            </Badge>

                        )}

                    </HStack>

                    {member.nickname && (

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            "{member.nickname}"
                        </Text>

                    )}

                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        {member.email}
                    </Text>

                    {member.joined_at && (

                        <Text
                            fontSize="xs"
                            color="gray.400"
                        >
                            Joined {formatDate(member.joined_at)}
                        </Text>

                    )}

                </VStack>

                <Badge
                    colorScheme={getRoleColor(member.role)}
                    px={3}
                    py={1}
                    borderRadius="full"
                    textTransform="capitalize"
                >
                    {member.role.toLowerCase()}
                </Badge>

            </HStack>

        </Box>

    );

};

export default MemberCard;