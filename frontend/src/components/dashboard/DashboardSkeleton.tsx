import {
  Box,
  Skeleton,
  SkeletonCircle,
  HStack,
  Text
} from "@chakra-ui/react";

// import neka from "../../assets/logo/neka.svg";

const DashboardSkeleton = () => {

  return (

    <Box
      p={5}
      bg="#f8fafc"
      minH="100vh"
    >

        <Box
  textAlign="center"
  mb={5}
>
  {/* <Image
    src={neka}
    h="50px"
    mx="auto"
    mb={2}
  /> */}

  <Text
    color="gray.500"
    fontSize="sm"
  >
    Preparing your dashboard...
  </Text>
</Box>

      {/* Header */}

      <Skeleton
        h="120px"
        borderRadius="3xl"
        mb={5}
      />
      

      {/* Add Meal CTA */}

      <Skeleton
        h="80px"
        borderRadius="2xl"
        mb={5}
        startColor="gray.100"
        endColor="blue.50"
      />

      {/* Today */}

      <Skeleton
        h="35px"
        w="120px"
        mb={4}
        startColor="gray.100"
        endColor="blue.50"
      />

      {/* Tabs */}

      <HStack mb={5}>
        <Skeleton
          h="38px"
          w="70px"
          borderRadius="full"
          startColor="gray.100"
          endColor="blue.50"
        />
        <Skeleton
          h="38px"
          w="70px"
          borderRadius="full"
          startColor="gray.100"
          endColor="blue.50"
        />
        <Skeleton
          h="38px"
          w="80px"
          borderRadius="full"
          startColor="gray.100"
          endColor="blue.50"
        />
      </HStack>

      {/* Progress Card */}

      <Skeleton
        h="220px"
        borderRadius="3xl"
        mb={5}
        startColor="gray.100"
        endColor="blue.50"
      />

      {/* Goal Card */}

      <Skeleton
        h="150px"
        borderRadius="3xl"
        mb={5}
        startColor="gray.100"
        endColor="blue.50"
      />

      {/* Macros */}

      <Box
        bg="white"
        borderRadius="3xl"
        p={5}
      >

        <HStack
          justify="space-around"
        >

          <SkeletonCircle
            size="80px"
             startColor="gray.100"
             endColor="blue.50"
          />

          <SkeletonCircle
            size="80px"
             startColor="gray.100"
            endColor="blue.50"
          />

          <SkeletonCircle
            size="80px"
             startColor="gray.100"
            endColor="blue.50"
          />

        </HStack>

      </Box>

    </Box>

  );
};

export default DashboardSkeleton;