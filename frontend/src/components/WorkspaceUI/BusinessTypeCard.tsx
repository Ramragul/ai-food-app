import {
    Box,
    Icon,
    Text,
    VStack
} from "@chakra-ui/react";

interface Props {

    icon: any;

    emoji: string;

    title: string;

    value: string;

    selected: boolean;

    onClick: (
        value: string
    ) => void;

}

const BusinessTypeCard = ({

    icon,

    emoji,

    title,

    value,

    selected,

    onClick

}: Props) => {

    return (

        <Box

            cursor="pointer"

            borderRadius="3xl"

            p={6}

            border="2px solid"

            borderColor={
                selected
                    ? "blue.400"
                    : "gray.200"
            }

            bg={
                selected
                    ? "blue.50"
                    : "white"
            }

            transition=".25s"

            _hover={{

                borderColor: "blue.300",

                transform: "translateY(-3px)",

                shadow: "lg"

            }}

            onClick={() =>
                onClick(value)
            }

        >

            <VStack
                spacing={4}
            >

                <Text
                    fontSize="42px"
                >

                    {emoji}

                </Text>

                <Icon
                    as={icon}
                    boxSize={6}
                    color="blue.500"
                />

                <Text

                    fontWeight="700"

                    textAlign="center"

                >

                    {title}

                </Text>

            </VStack>

        </Box>

    );

};

export default BusinessTypeCard;