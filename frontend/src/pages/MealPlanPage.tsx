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
  const [data, setData] =
    useState<any>();

  const [loading, setLoading] =
    useState(true);

  const [
    selectedMeal,
    setSelectedMeal,
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
      <Center h="80vh">
        <Text>
          Unable to load meal plan
        </Text>
      </Center>
    );
  }

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
          meals={
            data.breakfast
          }
        />
      )}

      {/* LUNCH */}

      {(selectedMeal ===
        "all" ||
        selectedMeal ===
          "lunch") && (
        <MealSection
          title="🍛 Lunch"
          meals={data.lunch}
        />
      )}

      {/* SNACK */}

      {(selectedMeal ===
        "all" ||
        selectedMeal ===
          "snack") && (
        <MealSection
          title="🥜 Snack"
          meals={data.snack}
        />
      )}

      {/* DINNER */}

      {(selectedMeal ===
        "all" ||
        selectedMeal ===
          "dinner") && (
        <MealSection
          title="🌙 Dinner"
          meals={data.dinner}
        />
      )}
    </Box>
  );
};

export default MealPlanPage;