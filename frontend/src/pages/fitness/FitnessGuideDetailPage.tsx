import {
  Box,
  Button,
  Spinner,
  useToast
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../../utils/api";

import FitnessGuideHero
from "../../components/fitness/FitnessGuideHero";

import FitnessBenefitsCard
from "../../components/fitness/FitnessBenefitsCard";

import FitnessMusclesCard
from "../../components/fitness/FitnessMusclesCard";

import FitnessStepsCard
from "../../components/fitness/FitnessStepsCard";

import FitnessTipsCard
from "../../components/fitness/FitnessTipsCard";

import {
  IconButton,
  HStack,
  Text
} from "@chakra-ui/react";

import {
  ArrowBackIcon
} from "@chakra-ui/icons";

import {
  useNavigate
} from "react-router-dom";

const FitnessGuideDetailPage = () => {

  const { id } =
    useParams();

  const [guide,
    setGuide] =
    useState<any>();

    const navigate =
  useNavigate();

    const toast =
  useToast();

  useEffect(() => {

    loadGuide();

  }, []);

  const loadGuide =
    async () => {

      const res =
        await api.get(
          `/fitness/guides/${id}`
        );

      setGuide(
        res.data
      );
    };
if (!guide) {
  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        size="xl"
        color="brand.500"
        thickness="4px"
      />
    </Box>
  );
}

  return (

    <Box
      p={5}
      bg="#f8fafc"
      minH="100vh"
    >

        <HStack
  mb={5}
  spacing={3}
>

  <IconButton
    aria-label="Back"
    icon={<ArrowBackIcon />}
    borderRadius="full"
    onClick={() =>
      navigate(-1)
    }
  />

  <Text
    fontWeight="800"
    fontSize="lg"
  >
    Workout Guide
  </Text>

</HStack>

      <FitnessGuideHero
        guide={guide}
      />

      <Box h={5} />

      <FitnessBenefitsCard
        benefits={
          guide.benefits
        }
      />

      <Box h={5} />

      <FitnessMusclesCard
        muscles={
          guide.target_muscles
        }
      />

      <Box h={5} />

      <FitnessStepsCard
        steps={
          guide.steps
        }
      />

      <Box h={5} />

      <FitnessTipsCard
        tips={guide.tips}
      />

      <Button
  position="fixed"
  bottom="90px"
  left="20px"
  right="20px"
  h="60px"
  borderRadius="full"
  bg="brand.500"
  color="white"
  fontWeight="800"
  boxShadow="
    0 15px 40px
    rgba(59,130,246,0.35)
  "
  _hover={{
    bg: "brand.600"
  }}
  onClick={() => {

    toast({
      title:
        "Workout Started 💪",

      description:
        "Follow the workout steps above.",

      status:
        "success",

      duration:
        3000,

      isClosable:
        true
    });

  }}
>
  🚀 Start Workout
</Button>

    </Box>

  );
};

export default FitnessGuideDetailPage;