import {
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";

import {
  PREPARATION_STYLES,
} from "../../constants/preparationStyles";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PreparationSelector = ({
  value,
  onChange,
}: Props) => {
  return (
    <Box>

      <Text
        mb={3}
        fontWeight="700"
        fontSize="md"
      >
        Preparation Style
      </Text>

      <HStack
        spacing={3}
        overflowX="auto"
        pb={2}
        css={{
          scrollbarWidth: "none",
        }}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {PREPARATION_STYLES.map(
          (style) => {
            const active =
              value === style.id;

            return (
              <Box
                key={style.id}
                cursor="pointer"
                px={6}
                py={3}
                // minW="120px"
                textAlign="center"
                borderRadius="full"
                transition="all .2s"
                bg={
                  active
                    ? "brand.500"
                    : "gray.100"
                }
                color={
                  active
                    ? "white"
                    : "gray.700"
                }
                borderWidth="1px"
                borderColor={
                  active
                    ? "brand.500"
                    : "gray.200"
                }
                boxShadow={
                  active
                    ? "md"
                    : "none"
                }
                transform={
                  active
                    ? "translateY(-2px)"
                    : "translateY(0)"
                }
                _hover={{
                  transform:
                    "translateY(-2px)",
                }}
                onClick={() =>
                  onChange(style.id)
                }
              >
                <Text
                  fontWeight="700"
                >
                  {style.label}
                </Text>
              </Box>
            );
          }
        )}
      </HStack>

    </Box>
  );
};

export default PreparationSelector;