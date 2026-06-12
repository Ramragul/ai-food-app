import {
  Box,
  Spinner
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

const FitnessGuideDetailPage = () => {

  const { id } =
    useParams();

  const [guide,
    setGuide] =
    useState<any>();

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
    return <Spinner />;
  }

  return (

    <Box
      p={5}
      bg="#f8fafc"
      minH="100vh"
    >

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

    </Box>

  );
};

export default FitnessGuideDetailPage;