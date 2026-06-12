import {
  Box,
  Text,
  VStack,
  Spinner
} from "@chakra-ui/react";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../utils/api";

import FitnessGuideCard
from "../components/fitness/FitnessGuideCard";

const FitnessCategoryPage = () => {

  const { category } =
    useParams();

  const navigate =
    useNavigate();

  const [guides,
    setGuides] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadGuides();

  }, [category]);

  const loadGuides =
    async () => {

      try {

        const res =
          await api.get(
            `/fitness/guides?category=${category}`
          );

        setGuides(
          res.data || []
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (
      <Box p={8}>
        <Spinner />
      </Box>
    );
  }

  return (

    <Box p={5}>

      <Text
        fontSize="2xl"
        fontWeight="900"
        mb={5}
      >
        💪 {category}
      </Text>

      <VStack
        spacing={5}
        align="stretch"
      >

        {guides.map(
          (guide: any) => (

            <FitnessGuideCard
              key={guide.id}
              guide={guide}
              onClick={() =>
                navigate(
                  `/fitness/guide/${guide.id}`
                )
              }
            />

          )
        )}

      </VStack>

    </Box>
  );
};

export default FitnessCategoryPage;