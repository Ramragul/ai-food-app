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
  Box
} from "@chakra-ui/react";

import { useState, useEffect } from "react";



import ServingSelector from "../FoodServingDrawer/ServingSelector";
import QuantitySelector from "../FoodServingDrawer/QuantitySelector";
import PreparationSelector from "../FoodServingDrawer/PerparationSelector";
import NutritionPreview from "../FoodServingDrawer/NutritionPreview";
import { convertToGrams } from "../../services/measurement.service";
import ExactServing from "../FoodServingDrawer/ExactServing";
import { VOLUME_UNITS, WEIGHT_UNITS } from "../../constants/measurementUnits";

import {
    DrawerCloseButton,
} from "@chakra-ui/react";

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

  if (!food) return;

  if (food.servings?.length) {
    setServingId(String(food.servings[0].id));
  } else {
    setServingId("");
  }

  setQuantity(1);
  setFoodSource("REGULAR");
  setCustomAmount("");
  setSelectionMode("PRESET");

  setCustomUnit(
    food.foodType === "VOLUME_BASED"
      ? "ml"
      : "g"
  );

}, [food]);


const [quantity, setQuantity] =
  useState(1);

const [foodSource, setFoodSource] =
  useState("REGULAR");

// const [servingId, setServingId] =
//   useState("");

  const [servingId, setServingId] =
useState<string | null>(null);

const [customAmount,setCustomAmount]=
useState("");

const [customUnit,setCustomUnit]=
useState("g");



const [selectionMode, setSelectionMode] = useState<"PRESET" | "CUSTOM">("PRESET");



  console.log(foodSource);

  if (!food) return null;

// const availableUnits=

// food.foodType==="VOLUME_BASED"

// ?

// [
//   { code: "ml", label: "mL" },
//   { code: "l", label: "L" },
//   { code: "cup", label: "Cup" },
//   { code: "glass", label: "Glass" },
//   { code: "tbsp", label: "Tbsp" },
//   { code: "tsp", label: "Tsp" }
// ]

// :

// // ["g","kg","oz","lb"];
// [
//   { code: "g", label: "g" },
//   { code: "kg", label: "kg" },
//   { code: "oz", label: "oz" },
//   { code: "lb", label: "lb" }
// ]

const availableUnits =
    food.foodType === "VOLUME_BASED"
        ? VOLUME_UNITS
        : WEIGHT_UNITS;



const equivalentGrams = convertToGrams(
    Number(customAmount || 0),
    customUnit,
    food.density || 1
);
  const selectedServing =
  food.servings?.find(
    (s:any) =>
      String(s.id) ===
      servingId
  );


  // const grams =
  // selectedServing?.grams || 0;



const usingCustom =
    selectionMode === "CUSTOM" &&
    customAmount.trim() !== "";

const totalGrams = usingCustom
    ? equivalentGrams
    : (selectedServing?.grams ?? 0) * quantity;

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

const fiber =
(
  totalGrams *
  food.fiberPer100g *
  styleMultiplier
) / 100;


// const isCustomActive =
// selectionMode==="CUSTOM";





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
        {/* <DrawerHeader>
          {food.name}
          <DrawerCloseButton/>
        </DrawerHeader> */}
        <DrawerHeader>

    <Text
        fontSize="sm"
        color="gray.500"
    >
        Choose Serving
    </Text>

    <Text
        fontSize="2xl"
        fontWeight="700"
    >
        {food.name}
    </Text>

    <DrawerCloseButton />

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

{/* <ServingSelector
    servings={food.servings}
    selectedServingId={servingId}
    onChange={setServingId}
/> */}

<ServingSelector
    servings={food.servings}
    selectedServingId={
        selectionMode === "PRESET"
            ? servingId ?? ""
            : ""
    }
    onChange={(id) => {
        setServingId(id);
        setSelectionMode("PRESET");
    }}
/>

{/* {

servingId==="CUSTOM"&&(

<CustomServing

amount={customAmount}

unit={customUnit}

units={availableUnits}

equivalentGrams={equivalentGrams}

onAmountChange={setCustomAmount}

onUnitChange={setCustomUnit}

/>

)
} */}





{/* <ExactServing
    amount={customAmount}
    unit={customUnit}
    units={availableUnits}
    equivalentGrams={equivalentGrams}
    onAmountChange={setCustomAmount}
    onUnitChange={setCustomUnit}
/> */}

<Box opacity={selectionMode === "CUSTOM" ? 1 : 0.5}>
<ExactServing
    
    amount={customAmount}
    unit={customUnit}
    units={availableUnits}
    equivalentGrams={equivalentGrams}
    onAmountChange={setCustomAmount}
    onUnitChange={setCustomUnit}
    onActivateCustom={() =>
        setSelectionMode("CUSTOM")
    }
/>
</Box>

            </Box>

            <Box>

<PreparationSelector
    value={foodSource}
    onChange={setFoodSource}
/>
</Box>

            {/* <Box>
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
            </Box> */}


            <QuantitySelector

quantity={quantity}

onChange={setQuantity}

/>


<NutritionPreview
    grams={totalGrams}
    calories={calories}
    protein={protein}
    carbs={carbs}
    fats={fats}
/>
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
    ),

      fiber:
    Number(
      fiber.toFixed(1)
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