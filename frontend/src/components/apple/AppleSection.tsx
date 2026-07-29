import {
  Box,
  HStack,
  Text
} from "@chakra-ui/react";

interface Props {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

const AppleSection = ({
  title,
  subtitle,
  rightContent,
}: Props) => {

  return (
    <HStack
      justify="space-between"
      mb={4}
      align="flex-end"
    >
      <Box>

        <Text
          fontSize={{
            base: "xl",
            md: "2xl"
          }}
          fontWeight="800"
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            color="gray.500"
            fontSize="sm"
            mt={1}
          >
            {subtitle}
          </Text>
        )}

      </Box>

      {rightContent}

    </HStack>
  );
};

export default AppleSection;