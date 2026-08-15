import {
  Box,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Text,
  VStack
} from "@chakra-ui/react";


import type { LucideIcon } from "lucide-react";

interface MetricCardProps {

  title: string;

  value?: number | string;

  icon: LucideIcon;

//   footer?: ReactNode;
  footer?: string;

  loading?: boolean;

  variant?:
    | "primary"
    | "success"
    | "warning"
    | "danger";

  onClick?: () => void;

}

const VARIANTS = {

  primary: {

    background: "brand.50",

    color: "brand.600"

  },

  success: {

    background: "green.50",

    color: "green.600"

  },

  warning: {

    background: "orange.50",

    color: "orange.600"

  },

  danger: {

    background: "red.50",

    color: "red.600"

  }

} as const;

const MetricCard = ({

  title,

  value,

  icon,

  footer,

  loading = false,

  variant = "primary",

  onClick

}: MetricCardProps) => {

  const colors = VARIANTS[variant];

  return (

    <Box

      bg="white"

      borderRadius="24px"

      border="1px solid"

      borderColor="gray.100"

      p={6}

      boxShadow="sm"

      transition="all .25s"

      cursor={onClick ? "pointer" : "default"}

      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg"
      }}

      onClick={onClick}

    >

      <Flex
        justify="space-between"
        align="flex-start"
      >

        <VStack
          align="flex-start"
          spacing={2}
        >

          <Text
            fontSize="sm"
            fontWeight="600"
            color="gray.500"
          >
            {title}
          </Text>

          {

            loading

            ?

            <Skeleton
              h="42px"
              w="70px"
              borderRadius="md"
            />

            :

            <Text
              fontSize="4xl"
              fontWeight="800"
              lineHeight="1"
            >
              {value}
            </Text>

          }

        </VStack>

        <Flex

          w="58px"

          h="58px"

          bg={colors.background}

          borderRadius="18px"

          justify="center"

          align="center"

        >

          <Icon

            as={icon}

            boxSize={6}

            color={colors.color}

          />

        </Flex>

      </Flex>

      {

        footer && (

          <HStack
            mt={5}
            spacing={2}
          >

            {

              loading

              ?

              <Skeleton
                h="14px"
                w="120px"
              />

              :

              footer

            }

          </HStack>

        )

      }

    </Box>

  );

};

export default MetricCard;