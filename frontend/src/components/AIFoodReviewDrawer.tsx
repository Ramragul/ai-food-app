import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  Box,
  Text,
  Input,
  HStack
} from "@chakra-ui/react";

import {
  useState,
  useEffect
} from "react";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  food: any;

  onSave?: (
    food:any
  ) => void;
}

const AIFoodReviewDrawer = ({
  isOpen,
  onClose,
  food,
  onSave
}: Props) => {

  const [editMode,
    setEditMode] =
    useState(false);

  const [form,
    setForm] =
    useState<any>(null);

  useEffect(() => {

    if (food) {

      setForm(food);

      setEditMode(
        false
      );

    }

  }, [food]);

  if (
    !form
  ) {
    return null;
  }

  return (
    <Drawer
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />

      <DrawerContent
        borderTopRadius="28px"
      >

        <DrawerHeader>

          <VStack
            spacing={2}
          >

            <Text
              fontSize="xl"
              fontWeight="800"
              textAlign="center"
            >
              🥤 {form.name}
            </Text>

            <Box
              px={3}
              py={1}
              bg="blue.50"
              borderRadius="full"
            >
              <Text
                fontSize="xs"
                color="blue.600"
              >
                🤖 AI Estimated Nutrition
              </Text>
            </Box>

          </VStack>

        </DrawerHeader>

        <DrawerBody>

          {!editMode && (

            <VStack
              spacing={4}
              align="stretch"
            >

              <Box
                bg="red.50"
                p={4}
                borderRadius="xl"
              >
                <Text
                  fontSize="xs"
                >
                  Calories
                </Text>

                <Text
                  fontSize="2xl"
                  fontWeight="800"
                >
                  🔥 {form.caloriesPer100g} kcal
                </Text>
              </Box>

              <HStack>

                <Box
                  flex={1}
                  bg="purple.50"
                  p={4}
                  borderRadius="xl"
                  textAlign="center"
                >
                  <Text
                    fontSize="xs"
                  >
                    Protein
                  </Text>

                  <Text
                    fontWeight="800"
                  >
                    🥩 {form.proteinPer100g}g
                  </Text>
                </Box>

                <Box
                  flex={1}
                  bg="orange.50"
                  p={4}
                  borderRadius="xl"
                  textAlign="center"
                >
                  <Text
                    fontSize="xs"
                  >
                    Carbs
                  </Text>

                  <Text
                    fontWeight="800"
                  >
                    🍚 {form.carbsPer100g}g
                  </Text>
                </Box>

              </HStack>

              <Box
                bg="green.50"
                p={4}
                borderRadius="xl"
              >
                <Text
                  fontSize="xs"
                >
                  Fat
                </Text>

                <Text
                  fontWeight="800"
                >
                  🥑 {form.fatsPer100g}g
                </Text>
              </Box>

              <Box
                bg="blue.50"
                p={4}
                borderRadius="xl"
              >
                <Text
                  fontSize="xs"
                >
                  Typical Serving
                </Text>

                <Text
                  fontWeight="800"
                >
                  ⚖️ {form.typicalServingWeight} g
                </Text>
              </Box>

              <Text
                fontSize="sm"
                color="gray.500"
              >
                These values are AI estimates.
                You can edit them before
                saving.
              </Text>

            </VStack>

          )}

          {editMode && (

            <VStack
              spacing={4}
              align="stretch"
            >

              <Box>
                <Text mb={1}>
                  Calories / 100g
                </Text>

                <Input
                  value={
                    form.caloriesPer100g
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      caloriesPer100g:
                        Number(
                          e.target.value
                        )
                    })
                  }
                />
              </Box>

              <Box>
                <Text mb={1}>
                  Protein / 100g
                </Text>

                <Input
                  value={
                    form.proteinPer100g
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      proteinPer100g:
                        Number(
                          e.target.value
                        )
                    })
                  }
                />
              </Box>

              <Box>
                <Text mb={1}>
                  Carbs / 100g
                </Text>

                <Input
                  value={
                    form.carbsPer100g
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      carbsPer100g:
                        Number(
                          e.target.value
                        )
                    })
                  }
                />
              </Box>

              <Box>
                <Text mb={1}>
                  Fat / 100g
                </Text>

                <Input
                  value={
                    form.fatsPer100g
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fatsPer100g:
                        Number(
                          e.target.value
                        )
                    })
                  }
                />
              </Box>

              <Box>
                <Text mb={1}>
                  Serving Weight
                </Text>

                <Input
                  value={
                    form.typicalServingWeight
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      typicalServingWeight:
                        Number(
                          e.target.value
                        )
                    })
                  }
                />
              </Box>

            </VStack>

          )}

        </DrawerBody>

        <DrawerFooter>

          <VStack
            w="100%"
            spacing={3}
          >

            <Button
              w="100%"
              variant="outline"
              onClick={() =>
                setEditMode(
                  !editMode
                )
              }
            >
              ✏️ Edit Values
            </Button>

                <Button
                w="100%"
                colorScheme="blue"
                onClick={() => {

                    if(
                    onSave
                    ){

                    onSave(
                        form
                    );

                    }

                    onClose();

                }}
                >
              🚀 Save To NEKA
            </Button>

          </VStack>

        </DrawerFooter>

      </DrawerContent>

    </Drawer>
  );
};

export default AIFoodReviewDrawer;