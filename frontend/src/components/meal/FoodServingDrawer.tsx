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

  if (!food) return null;

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

onSave({
  foodId:
    food.id,

  name:
    food.name,

  serving,

  quantity,

  preparationStyle:
    foodSource
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