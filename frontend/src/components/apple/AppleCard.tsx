import { Box, type BoxProps } from "@chakra-ui/react";
import { NekaTheme } from "../../theme/tokens";

interface Props extends BoxProps {
  children: React.ReactNode;
}

const AppleCard = ({ children, ...props }: Props) => {
  return (
    <Box
      bg={NekaTheme.colors.card}
      borderRadius={{
        base: NekaTheme.radius.lg,
        md: NekaTheme.radius.xl,
      }}
      border="1px solid"
      borderColor={NekaTheme.colors.border}
      boxShadow={NekaTheme.shadow.card}
      p={{
        base: 5,
        md: 6,
      }}
      transition="all .25s ease"
      _hover={{
        transform: {
          base: "none",
          lg: "translateY(-2px)",
        },
        boxShadow: NekaTheme.shadow.hover,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AppleCard;