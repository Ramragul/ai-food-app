import {
  Box,
  HStack,
  Text
} from "@chakra-ui/react";

import WorkspaceSwitcher from "./WorkspaceSwitcher";

// interface Props {
//   user: any;
//   goalInfo?: any;
//   target?: number;
// }

interface Props {
    user: any;
    goalInfo?: any;
    target?: number;
    streak?: number;
}

const DashboardHeader = ({
  user,
  goalInfo,
  target
}: Props) => {

  const greeting =
    new Date().getHours() < 12
      ? "Morning"
      : new Date().getHours() < 17
      ? "Afternoon"
      : "Evening";

  return (

    <Box
      mb={5}
      position="relative"
      overflow="hidden"
      bg="
      linear-gradient(
      135deg,
      #2563eb 0%,
      #3b82f6 35%,
      #60a5fa 100%
      )"
      borderRadius="32px"
      px={6}
      py={5}
      color="white"
      boxShadow="
      0 20px 50px
      rgba(37,99,235,0.35)
      "
    >

      <Box
        position="absolute"
        top="-40px"
        right="-40px"
        w="140px"
        h="140px"
        borderRadius="full"
        bg="
        rgba(
        255,
        255,
        255,
        0.15
        )"
      />

      <Text
  fontSize="lg"
  fontWeight="600"
  opacity={0.95}
>
  Good {greeting} 👋
</Text>

<Text
  mt={1}
  fontSize="4xl"
  fontWeight="900"
  lineHeight="1"
>
  {user?.nickname || user?.name}
</Text>

 {/* <WorkspaceSwitcher /> */}

<Text
  mt={3}
  fontSize="sm"
  opacity={0.9}
>
  🎯 {
    goalInfo?.goalType
      ?.replaceAll("_", " ")
      ?.replace(
        /\b\w/g,
        (c:string) =>
          c.toUpperCase()
      )
  }
  {" • "}
  {target} kcal
</Text>
<Text
  mt={2}
  fontSize="xs"
  opacity={0.75}
>
  Stay consistent. Results follow.
</Text>





    </Box>
  );
};

export default DashboardHeader;