import {
  Box,
  Heading,
  Text
} from "@chakra-ui/react";

interface Props {

  name: string;

}

const WelcomeBanner = ({
  name
}: Props) => {

  const hour =
    new Date().getHours();

  let greeting =
    "Good Evening";

  if (hour < 12) {

    greeting =
      "Good Morning";

  } else if (hour < 17) {

    greeting =
      "Good Afternoon";

  }

  return (

    <Box
      bg="brand.500"
      color="white"
      borderRadius="24px"
      p={8}
    >

      <Heading size="lg">

        {greeting} 👋

      </Heading>

      <Text
        mt={2}
        fontSize="lg"
      >

        Welcome back,
        {" "}
        <strong>{name}</strong>

      </Text>

    </Box>

  );

};

export default WelcomeBanner;