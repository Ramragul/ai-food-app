import {
  Box,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Props {

  data: {

    calories: number;

    protein: number;

    carbs: number;

    fat: number;

    fiber: number;

    unit?: string;

  };

}


interface Insight {

  icon: string;

  title: string;

  description: string;

  type: "positive" | "warning" | "neutral";

}


const getInsight = (
  data: Props["data"]
): Insight => {

  const calories =
    Number(data.calories || 0);

  const protein =
    Number(data.protein || 0);

  const fat =
    Number(data.fat || 0);

  const fiber =
    Number(data.fiber || 0);


  /*
  ---------------------------------------------
  HIGH PROTEIN
  ---------------------------------------------
  */

  if (protein >= 20) {

    return {

      icon: "💪",

      title: "Protein Rich",

      description:
        `A protein-rich choice with ${protein}g of protein per ${data.unit || "100g"}.`,

      type: "positive"

    };

  }


  /*
  ---------------------------------------------
  HIGH FIBER
  ---------------------------------------------
  */

  if (fiber >= 5) {

    return {

      icon: "🌿",

      title: "Fiber Rich",

      description:
        `A good source of dietary fiber with ${fiber}g per ${data.unit || "100g"}.`,

      type: "positive"

    };

  }


  /*
  ---------------------------------------------
  LOW FAT
  ---------------------------------------------
  */

  if (
    fat <= 5 &&
    calories <= 180
  ) {

    return {

      icon: "✨",

      title: "Light Choice",

      description:
        `Relatively low in fat and calories, making it a lighter option.`,

      type: "positive"

    };

  }


  /*
  ---------------------------------------------
  HIGH FAT
  ---------------------------------------------
  */

  if (fat >= 15) {

    return {

      icon: "⚠️",

      title: "Higher in Fat",

      description:
        `Contains ${fat}g of fat per ${data.unit || "100g"}. Enjoy it mindfully as part of a balanced diet.`,

      type: "warning"

    };

  }


  /*
  ---------------------------------------------
  HIGH CALORIES
  ---------------------------------------------
  */

  if (calories >= 250) {

    return {

      icon: "🔥",

      title: "Calorie Dense",

      description:
        `Provides ${calories} kcal per ${data.unit || "100g"}, so portions can make a difference.`,

      type: "warning"

    };

  }


  /*
  ---------------------------------------------
  LOW CALORIES
  ---------------------------------------------
  */

  if (calories <= 100) {

    return {

      icon: "🌱",

      title: "Lower in Calories",

      description:
        `A relatively low-calorie option at ${calories} kcal per ${data.unit || "100g"}.`,

      type: "positive"

    };

  }


  /*
  ---------------------------------------------
  BALANCED
  ---------------------------------------------
  */

  return {

    icon: "🥗",

    title: "Balanced Profile",

    description:
      "A moderate nutrition profile. Portion size still matters.",

    type: "neutral"

  };

};


const NutritionInsight = ({
  data
}: Props) => {

  const insight =
    getInsight(data);


  const styles = {

    positive: {

      bg: "#EFF9FF",

      border: "#CBEAFB",

      accent: "#1687C7",

    },

    warning: {

      bg: "#FFF8ED",

      border: "#F8DFB5",

      accent: "#C47A18",

    },

    neutral: {

      bg: "#F5F9FC",

      border: "#DCE8F0",

      accent: "#607D92",

    }

  };


  const style =
    styles[insight.type];


  return (

    <Box

      bg={style.bg}

      border="1px solid"

      borderColor={style.border}

      borderRadius="2xl"

      px={4}

      py={4}

    >

      <HStack

        align="flex-start"

        spacing={3}

      >

        <Box

          w="38px"

          h="38px"

          flexShrink={0}

          borderRadius="12px"

          bg="white"

          display="flex"

          alignItems="center"

          justifyContent="center"

          fontSize="18px"

          boxShadow="
            0 4px 12px
            rgba(0,0,0,.05)
          "

        >

          {insight.icon}

        </Box>


        <VStack

          align="start"

          spacing={1}

        >

          <Text

            fontSize="sm"

            fontWeight="800"

            color={style.accent}

          >

            {insight.title}

          </Text>


          <Text

            fontSize="xs"

            lineHeight="1.6"

            color="gray.600"

          >

            {insight.description}

          </Text>

        </VStack>

      </HStack>

    </Box>

  );

};


export default NutritionInsight;