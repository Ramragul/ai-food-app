import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Box
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import {PREPARATION_STYLES} from "../../constants/preparationStyles";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  food: any;

  onSave: (
    selection: any
  ) => void;
}

const FoodServingDrawer = ({
  isOpen,
  onClose,
  food,
  onSave
}: Props) => {

    useEffect(() => {

  if (
    food?.servings?.length
  ) {
    setServingId(
      String(
        food.servings[0].id
      )
    );
  }

}, [food]);

useEffect(() => {

  setQuantity(1);

  setFoodSource(
    "REGULAR"
  );

}, [food]);



const [quantity, setQuantity] =
  useState(1);

const [foodSource, setFoodSource] =
  useState("REGULAR");

const [servingId, setServingId] =
  useState("");

  console.log(foodSource);

  if (!food) return null;


  const selectedServing =
  food.servings?.find(
    (s:any) =>
      String(s.id) ===
      servingId
  );

  const grams =
  selectedServing?.grams || 0;

  const totalGrams =
  grams * quantity;

  const styleMultiplier =
  foodSource === "LIGHT"
    ? 0.9
    : foodSource === "RICH"
    ? 1.2
    : 1;

const calories =
(
  totalGrams *
  food.caloriesPer100g *
  styleMultiplier
) / 100;

const protein =
(
  totalGrams *
  food.proteinPer100g
) / 100;

const carbs =
(
  totalGrams *
  food.carbsPer100g
) / 100;

const fats =
(
  totalGrams *
  food.fatsPer100g *
  styleMultiplier
) / 100;

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />

      <DrawerContent
        borderTopRadius="28px"
      >
        <DrawerHeader>
          {food.name}
        </DrawerHeader>

        <DrawerBody>
          <VStack
            align="stretch"
            spacing={5}
          >

            <Box>
              <Text
                mb={2}
                fontWeight="600"
              >
                Serving
              </Text>

              <RadioGroup
                value={servingId}
                onChange={
                  setServingId
                }
              >
                <VStack
                  align="stretch"
                >
                  {food.servings?.map(
                    (s: any) => (
                      <Radio
                        key={s.id}
                        value={
                          String(
                            s.id
                          )
                        }
                      >
                        
                        {s.serving_name}
{" "}
(
{s.grams}g
)
                      </Radio>
                    )
                  )}
                </VStack>
              </RadioGroup>
            </Box>

            <Box>
  <Text
    mb={2}
    fontWeight="600"
  >
    Preparation Style
  </Text>

  <RadioGroup
    value={foodSource}
    onChange={
      setFoodSource
    }
  >
    <VStack
      align="stretch"
    >
      {PREPARATION_STYLES.map(
        (style) => (
          <Radio
            key={style.id}
            value={style.id}
          >
            {style.label}
          </Radio>
        )
      )}
    </VStack>
  </RadioGroup>
</Box>

            <Box>
              <Text
                mb={2}
                fontWeight="600"
              >
                Quantity
              </Text>

              <HStack>
                <Button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                >
                  -
                </Button>

                <Text>
                  {quantity}
                </Text>

                <Button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                >
                  +
                </Button>
              </HStack>
            </Box>


<Box
  bg="brand.50"
  p={4}
  borderRadius="xl"
>
  <Text
    fontWeight="700"
    mb={2}
  >
    Nutrition Preview
  </Text>

  {/* <Text>
    🔥 {calories.toFixed(0)} kcal
  </Text>

  <Text>
    🥩 {protein.toFixed(1)}g
  </Text>

  <Text>
    🍚 {carbs.toFixed(1)}g
  </Text>

  <Text>
    🥑 {fats.toFixed(1)}g
  </Text> */}
  <Text
  fontSize="sm"
  color="gray.500"
  mb={3}
>
  {totalGrams} g selected
</Text>

<HStack spacing={3}>
  <Box
    flex={1}
    bg="white"
    p={3}
    borderRadius="lg"
  >
    <Text fontSize="xs">
      Calories
    </Text>

    <Text
      fontWeight="700"
    >
      {calories.toFixed(0)}
    </Text>
  </Box>

  <Box
    flex={1}
    bg="white"
    p={3}
    borderRadius="lg"
  >
    <Text fontSize="xs">
      Protein
    </Text>

    <Text
      fontWeight="700"
    >
      {protein.toFixed(1)}g
    </Text>
  </Box>
</HStack>

<HStack
  spacing={3}
  mt={3}
>
  <Box
    flex={1}
    bg="white"
    p={3}
    borderRadius="lg"
  >
    <Text fontSize="xs">
      Carbs
    </Text>

    <Text
      fontWeight="700"
    >
      {carbs.toFixed(1)}g
    </Text>
  </Box>

  <Box
    flex={1}
    bg="white"
    p={3}
    borderRadius="lg"
  >
    <Text fontSize="xs">
      Fat
    </Text>

    <Text
      fontWeight="700"
    >
      {fats.toFixed(1)}g
    </Text>
  </Box>
</HStack>
</Box>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            w="100%"
            bg="black"
            color="white"
            onClick={() => {

              const serving =
                food.servings.find(
                  (s: any) =>
                    String(
                      s.id
                    ) ===
                    servingId
                );

// onSave({
//   foodId:
//     food.id,

//   name:
//     food.name,

//   serving,

//   quantity,

//   preparationStyle:
//     foodSource
// });

onSave({
  foodId: food.id,
  name: food.name,

  serving,

  quantity,

  preparationStyle:
    foodSource,

  grams:
    totalGrams,

  calories:
    Number(
      calories.toFixed(0)
    ),

  protein:
    Number(
      protein.toFixed(1)
    ),

  carbs:
    Number(
      carbs.toFixed(1)
    ),

  fats:
    Number(
      fats.toFixed(1)
    )
});

              onClose();
            }}
          >
            Add Food
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FoodServingDrawer;