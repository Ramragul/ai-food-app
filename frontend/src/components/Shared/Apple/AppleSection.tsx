import {
    VStack,
    Heading,
    Text,
    HStack
} from "@chakra-ui/react";

import AppleCard from "./AppleCard";

interface Props {

    title: string;

    subtitle?: string;

    children: React.ReactNode;

}

const AppleSection = ({
    title,
    subtitle,
    children
}: Props) => {

    return (

        <AppleCard>

            <VStack
                align="stretch"
                spacing={6}
            >

                <HStack
                    justify="space-between"
                    align="start"
                >

                    <VStack
                        align="start"
                        spacing={1}
                    >

                        <Heading
                            size="md"
                            color="gray.800"
                        >

                            {title}

                        </Heading>

                        {

                            subtitle && (

                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                >

                                    {subtitle}

                                </Text>

                            )

                        }

                    </VStack>

                </HStack>

                {children}

            </VStack>

        </AppleCard>

    );

};

export default AppleSection;