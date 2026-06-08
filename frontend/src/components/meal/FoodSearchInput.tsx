import {
  Box,
  Input,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";

import {
  useState,
  useCallback,
} from "react";

import debounce from "lodash/debounce";

import api from "../../utils/api";

interface FoodItem {
  id: number;
  name: string;
  source: string;
}



interface Props {
  onSelectFood: (
    food: FoodItem
  ) => void;
}

const FoodSearchInput = ({
  onSelectFood,
}: Props) => {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<FoodItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const searchFoods =
    useCallback(
      debounce(
        async (
          searchText: string
        ) => {
          if (
            !searchText.trim()
          ) {
            setResults([]);
            return;
          }

          try {
            setLoading(true);

            const res =
              await api.get(
                `/nutrition/search-food?q=${searchText}`
              );

            setResults(
              res.data || []
            );

          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        300
      ),
      []
    );

  return (
    <Box position="relative">
      <Input
        size="lg"
        bg="gray.50"
        borderRadius="xl"
        placeholder="Search food..."
        value={query}
        onChange={(e) => {
          const value =
            e.target.value;

          setQuery(value);

          searchFoods(value);
        }}
      />

      {loading && (
        <Spinner
          size="sm"
          position="absolute"
          right="12px"
          top="14px"
        />
      )}

      {results.length > 0 && (
        <Box
          mt={2}
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
          boxShadow="lg"
        >
          <VStack
            spacing={0}
            align="stretch"
          >
            {results.map(
              (food) => (
                <Box
                  key={`${food.source}-${food.id}`}
                  px={4}
                  py={3}
                  cursor="pointer"
                  transition="all .2s"
                  _hover={{
                    bg: "brand.50",
                  }}
                  onClick={() => {
             
                    onSelectFood(food);

                    setQuery("");

                    setResults([]);
                  }}
                >
                  <Text
                    fontWeight="600"
                  >
                    {food.name}
                  </Text>

                  <Text
                    fontSize="xs"
                    color="gray.500"
                  >
                    {food.source}
                  </Text>
                </Box>
              )
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default FoodSearchInput;