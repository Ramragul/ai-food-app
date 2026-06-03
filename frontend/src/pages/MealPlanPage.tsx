// Version 1 : Pleasant UI

// import {
//   Box,
//   Heading,
//   Spinner,
//   VStack,
//   Stat,
//   StatLabel,
//   StatNumber,
//   SimpleGrid
// } from "@chakra-ui/react";

// import {
//   useEffect,
//   useState
// } from "react";

// import api from "../utils/api";

// import MealSection from
// "../components/mealPlan/MealSection";

// const MealPlanPage = () => {

//   const [data,setData] =
//     useState<any>();

//   const [loading,setLoading] =
//     useState(true);

//   useEffect(() => {

//     const load = async () => {

//       try {

//         const res =
//           await api.get(
//             "/meal-plan"
//           );

//         setData(res.data.data);

//       } finally {

//         setLoading(false);

//       }
//     };

//     load();

//   }, []);

//   if (loading)
//     return <Spinner />;

//   return (
//     <Box
//       p={6}
//       bg="gray.50"
//       minH="100vh"
//     >
//       <Heading mb={6}>
//         Today's Meal Plan
//       </Heading>

//       <SimpleGrid
//         columns={[2,4]}
//         spacing={4}
//         mb={8}
//       >
//         <Stat bg="white" p={4}>
//           <StatLabel>
//             Calories
//           </StatLabel>

//           <StatNumber>
//             {data.targets.calories}
//           </StatNumber>
//         </Stat>

//         <Stat bg="white" p={4}>
//           <StatLabel>
//             Protein
//           </StatLabel>

//           <StatNumber>
//             {data.targets.protein}g
//           </StatNumber>
//         </Stat>

//         <Stat bg="white" p={4}>
//           <StatLabel>
//             Carbs
//           </StatLabel>

//           <StatNumber>
//             {data.targets.carbs}g
//           </StatNumber>
//         </Stat>

//         <Stat bg="white" p={4}>
//           <StatLabel>
//             Fats
//           </StatLabel>

//           <StatNumber>
//             {data.targets.fats}g
//           </StatNumber>
//         </Stat>
//       </SimpleGrid>

//       <MealSection
//         title="🍳 Breakfast"
//         meals={data.breakfast}
//       />

//       <MealSection
//         title="🍛 Lunch"
//         meals={data.lunch}
//       />

//       <MealSection
//         title="🥜 Snack"
//         meals={data.snack}
//       />

//       <MealSection
//         title="🌙 Dinner"
//         meals={data.dinner}
//       />
//     </Box>
//   );
// };

// export default MealPlanPage;



// Version 2 : Enhanced UI

import {
  Box,
  Heading,
  Spinner,
  SimpleGrid,
  Text,
  HStack,
  Button,
  Center,
} from "@chakra-ui/react";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../utils/api";

import MealSection from "../components/mealPlan/MealSection";

const TargetCard = ({
  icon,
  value,
  label,
}: any) => (
  <Box
    bg="white"
    borderRadius="2xl"
    p={5}
    textAlign="center"
    boxShadow="md"
    transition="0.3s"
    _hover={{
      transform: "translateY(-3px)",
      boxShadow: "lg",
    }}
  >
    <Text fontSize="2xl">
      {icon}
    </Text>

    <Text
      fontSize="2xl"
      fontWeight="bold"
      color="brand.700"
    >
      {value}
    </Text>

    <Text
      fontSize="sm"
      color="gray.500"
    >
      {label}
    </Text>
  </Box>
);

const MealPlanPage = () => {
  const navigate = useNavigate();
  const [data, setData] =
    useState<any>();

  const [loading, setLoading] =
    useState(true);

  const [
    selectedMeal,
    setSelectedMeal,
  ] = useState("all");

  const [
  selectedFoodType,
  setSelectedFoodType,
] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const res =
          await api.get(
            "/meal-plan"
          );

        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner
          size="xl"
          color="brand.500"
          thickness="4px"
        />
      </Center>
    );
  }


if (!data) {

  return (
    <Center
      minH="85vh"
      px={6}
    >
      <Box
        maxW="500px"
        w="100%"
        textAlign="center"
        bg="white"
        p={8}
        borderRadius="3xl"
        boxShadow="xl"
      >

        <Text
          fontSize="7xl"
          mb={2}
        >
          🍱
        </Text>

        <Heading
          size="lg"
          mb={3}
          color="gray.800"
        >
          No Meal Plan Available
        </Heading>

        <Text
          color="gray.600"
          lineHeight="tall"
          mb={6}
        >
          Set your fitness goal to unlock
          personalized meal recommendations
          tailored to your calories,
          protein, carbs, lifestyle and
          food preferences.
        </Text>

        <Box
          bg="blue.50"
          p={4}
          borderRadius="2xl"
          mb={6}
        >
          <Text
            fontSize="sm"
            color="gray.700"
          >
            💪 Muscle Gain
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
          >
            🔥 Fat Loss
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
          >
            🏋️ Bulk Up
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
          >
            ❤️ Healthy Lifestyle
          </Text>
        </Box>

        <Button
          colorScheme="blue"
          size="lg"
          h="60px"
          borderRadius="full"
          w="full"
          fontWeight="bold"
          onClick={() =>
            navigate(
              "/goal-setup"
            )
          }
        >
          🎯 Set My Goal
        </Button>

        <Text
          mt={4}
          fontSize="xs"
          color="gray.500"
        >
          Takes less than 30 seconds
        </Text>

      </Box>
    </Center>
  );
}


const filterMeals = (
  meals: any[]
) => {

  if (
    selectedFoodType === "all"
  ) {
    return meals;
  }

  return meals.filter(
    (meal) =>
      meal.foodType ===
      selectedFoodType
  );
};

  return (
    <Box
      p={[4, 6]}
      bg="gray.50"
      minH="100vh"
    >
      {/* HERO BANNER */}

      <Box
        bg="linear-gradient(135deg,#63bdf4,#216fa4)"
        color="white"
        borderRadius="3xl"
        p={[5, 8]}
        mb={8}
        boxShadow="xl"
      >
        <Heading
          size="lg"
          mb={2}
        >
          🍽️ Today's Meal Plan
        </Heading>

        <Text
          fontSize="lg"
          opacity={0.95}
        >
          Personalized meals
          designed for your
          fitness journey
        </Text>

        <Box mt={4}>
          <Text
            fontWeight="bold"
            fontSize="md"
          >
            Goal:
            {" "}
            {data.goalType
              ?.replace(
                "_",
                " "
              )
              ?.toUpperCase()}
          </Text>

          {/* <Text
  mt={1}
  opacity={0.9}
>
  Showing:
  {" "}
  {
    selectedFoodType === "all"
      ? "All Food Types"
      : selectedFoodType === "veg"
      ? "Veg"
      : selectedFoodType === "eggitarian"
      ? "Eggitarian"
      : "Non-Veg"
  }
</Text> */}
        </Box>
      </Box>

      {/* MACRO CARDS */}

      <SimpleGrid
        columns={[2, 2, 4]}
        spacing={4}
        mb={8}
      >
        <TargetCard
          icon="🔥"
          value={
            data.targets.calories
          }
          label="Calories"
        />

        <TargetCard
          icon="💪"
          value={`${data.targets.protein}g`}
          label="Protein"
        />

        <TargetCard
          icon="🍚"
          value={`${data.targets.carbs}g`}
          label="Carbs"
        />

        <TargetCard
          icon="🥑"
          value={`${data.targets.fats}g`}
          label="Fats"
        />
      </SimpleGrid>

      {/* FILTER PILLS */}

      <Box mb={8}>
        <Text
          fontWeight="bold"
          mb={3}
          color="gray.700"
        >
          Browse Meals
        </Text>

        <Box mb={8}>
  <Text
    fontWeight="bold"
    mb={3}
    color="gray.700"
  >
    Food Type
  </Text>

  <HStack
    overflowX="auto"
    spacing={3}
    pb={2}
  >
    {[
      {
        label: "All",
        value: "all",
      },

      {
        label: "🟢 Veg",
        value: "veg",
      },

      {
        label: "🟡 Eggitarian",
        value: "eggitarian",
      },

      {
        label: "🔴 Non-Veg",
        value: "nonveg",
      },
    ].map((item) => (
      <Button
        key={item.value}
        borderRadius="full"
        size="sm"
        px={6}
        colorScheme={
          selectedFoodType ===
          item.value
            ? "green"
            : "gray"
        }
        variant={
          selectedFoodType ===
          item.value
            ? "solid"
            : "outline"
        }
        onClick={() =>
          setSelectedFoodType(
            item.value
          )
        }
      >
        {item.label}
      </Button>
    ))}
  </HStack>
</Box>

        <HStack
          overflowX="auto"
          spacing={3}
          pb={2}
        >
          {[
            {
              label: "All",
              value: "all",
            },
            {
              label:
                "Breakfast",
              value:
                "breakfast",
            },
            {
              label: "Lunch",
              value: "lunch",
            },
            {
              label: "Snack",
              value: "snack",
            },
            {
              label: "Dinner",
              value: "dinner",
            },
          ].map((item) => (
            <Button
              key={item.value}
              borderRadius="full"
              size="sm"
              px={6}
              colorScheme={
                selectedMeal ===
                item.value
                  ? "blue"
                  : "gray"
              }
              variant={
                selectedMeal ===
                item.value
                  ? "solid"
                  : "outline"
              }
              onClick={() =>
                setSelectedMeal(
                  item.value
                )
              }
            >
              {item.label}
            </Button>
          ))}
        </HStack>
      </Box>

      {/* BREAKFAST */}

      {(selectedMeal ===
        "all" ||
        selectedMeal ===
          "breakfast") && (
        <MealSection
          title="🍳 Breakfast"
meals={filterMeals(
  data.breakfast
)}
        />
      )}

      {/* LUNCH */}

      {(selectedMeal ===
        "all" ||
        selectedMeal ===
          "lunch") && (
        <MealSection
          title="🍛 Lunch"
          meals={filterMeals(
  data.lunch
)}
        />
      )}

      {/* SNACK */}

      {(selectedMeal ===
        "all" ||
        selectedMeal ===
          "snack") && (
        <MealSection
          title="🥜 Snack"
          meals={filterMeals(
  data.snack
)}
        />
      )}

      {/* DINNER */}

      {(selectedMeal ===
        "all" ||
        selectedMeal ===
          "dinner") && (
        <MealSection
          title="🌙 Dinner"
          meals={filterMeals(
  data.dinner
)}
        />
      )}
    </Box>
  );
};

export default MealPlanPage;