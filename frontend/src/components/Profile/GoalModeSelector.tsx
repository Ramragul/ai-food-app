import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FiCheckCircle,
  FiSettings,
  FiCpu,
} from "react-icons/fi";

interface Props {
  value: "SMART" | "CUSTOM";

  onChange: (
    mode: "SMART" | "CUSTOM"
  ) => void;
}

const GoalModeSelector = ({
  value,
  onChange,
}: Props) => {

  const cards = [
    {
      id: "SMART",
      title: "Smart Goal",
      subtitle:
        "AI calculates your calories & macros",
      icon: FiCpu,
      badge: "Recommended",
    },
    {
      id: "CUSTOM",
      title: "Custom Goal",
      subtitle:
        "Enter your own calories & macros",
      icon: FiSettings,
      badge: "Coach Friendly",
    },
  ];

  return (
    <Box mb={6}>

      <Text
        mb={3}
        fontWeight="700"
        fontSize="md"
      >
        Goal Setup Method
      </Text>

      <VStack spacing={3}>

        {cards.map((card) => {

          const active =
            value === card.id;

          return (

            <Box
              key={card.id}
              w="100%"
              p={4}
              borderRadius="2xl"
              cursor="pointer"
              transition=".25s"
              borderWidth="2px"
              borderColor={
                active
                  ? "brand.500"
                  : "gray.200"
              }
              bg={
                active
                  ? "brand.50"
                  : "white"
              }
              boxShadow={
                active
                  ? "lg"
                  : "sm"
              }
              transform={
                active
                  ? "translateY(-2px)"
                  : "translateY(0)"
              }
              _hover={{
                transform:
                  "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() =>
                onChange(
                  card.id as
                    | "SMART"
                    | "CUSTOM"
                )
              }
            >

              <HStack
                align="flex-start"
                spacing={4}
              >

                <Icon
                  as={card.icon}
                  boxSize={6}
                  mt={1}
                  color={
                    active
                      ? "brand.500"
                      : "gray.500"
                  }
                />

                <VStack
                  align="start"
                  spacing={0}
                  flex={1}
                >

                  <HStack>

                    <Text
                      fontWeight="700"
                      fontSize="md"
                    >
                      {card.title}
                    </Text>

                    <Box
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      bg={
                        active
                          ? "brand.500"
                          : "gray.100"
                      }
                    >

                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        color={
                          active
                            ? "white"
                            : "gray.600"
                        }
                      >
                        {card.badge}
                      </Text>

                    </Box>

                  </HStack>

                  <Text
                    mt={1}
                    fontSize="sm"
                    color="gray.500"
                  >
                    {card.subtitle}
                  </Text>

                </VStack>

                {active && (

                  <Icon
                    as={FiCheckCircle}
                    color="green.400"
                    boxSize={6}
                  />

                )}

              </HStack>

            </Box>

          );

        })}

      </VStack>

    </Box>
  );
};

export default GoalModeSelector;