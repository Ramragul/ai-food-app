import {
  Box,
  SimpleGrid
} from "@chakra-ui/react";

import {
  useNavigate
} from "react-router-dom";

import FitnessHero
from "../../components/fitness/FitnessHero";

import FitnessCategoryCard
from "../../components/fitness/FitnessCategoryCard";

const categories = [

  {
    title: "Chest",
    image:
      "/fitness/chest.jpg"
  },

  {
    title: "Cardio",
    image:
      "/fitness/cardio.jpg"
  },

  {
    title: "Abs",
    image:
      "/fitness/abs.jpg"
  },

  {
    title: "Legs",
    image:
      "/fitness/legs.jpg"
  }

];

const FitnessPage = () => {

  const navigate =
    useNavigate();

  return (

    <Box p={5}>

      <FitnessHero guide={""} />

      <SimpleGrid
        columns={2}
        spacing={4}
      >

        {categories.map(
          (item) => (

            <FitnessCategoryCard
              key={item.title}
              title={
                item.title
              }
              image={
                item.image
              }
              onClick={() =>
                navigate(
                  `/fitness/${item.title}`
                )
              }
            />

          )
        )}

      </SimpleGrid>

    </Box>
  );
};

export default FitnessPage;