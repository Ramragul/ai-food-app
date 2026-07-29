// src/components/dashboard/MacroSection.tsx

import {
  Box,
  Text,
  SimpleGrid
} from "@chakra-ui/react";

import MacroProgressCard
from "./MacroProgressCard";

interface Props {
  data: any;
}

const MacroSection = ({
  data
}: Props) => {

  return (
    <Box mt={5}>

      <Text
        fontSize="lg"
        fontWeight="700"
        mb={4}
      >
        🥗 Macro Progress
      </Text>

      <SimpleGrid
        // columns={2}
        columns={{
    base: 2,
    md: 2,
    lg: 4,
}}
        spacing={3}
      >

        <MacroProgressCard
          label="Protein"
          consumed={
            data.protein
          }
          target={
            data.targets
              ?.protein || 0
          }
          color="green"
        />

        <MacroProgressCard
          label="Carbs"
          consumed={
            data.carbs
          }
          target={
            data.targets
              ?.carbs || 0
          }
          color="blue"
        />

        <MacroProgressCard
          label="Fat"
          consumed={
            data.fats
          }
          target={
            data.targets
              ?.fats || 0
          }
          color="purple"
        />

        <MacroProgressCard
          label="Fiber"
          consumed={
            data.fiber || 0
          }
          target={30}
          color="orange"
        />

      </SimpleGrid>

    </Box>
  );
};

export default MacroSection;