// Version 1


// import {
//   Box,
//   Input,
//   Text,
//   VStack,
//   Spinner,
// } from "@chakra-ui/react";

// import {
//   useState,
//   useCallback,
// } from "react";

// import debounce from "lodash/debounce";

// import api from "../../utils/api";

// interface FoodItem {
//   id: number;
//   name: string;
//   source: string;
// }



// interface Props {
//   onSelectFood: (
//     food: FoodItem
//   ) => void;
// }

// const FoodSearchInput = ({
//   onSelectFood,
// }: Props) => {
//   const [query, setQuery] =
//     useState("");

//   const [results, setResults] =
//     useState<FoodItem[]>([]);

//   const [loading, setLoading] =
//     useState(false);

//   const searchFoods =
//     useCallback(
//       debounce(
//         async (
//           searchText: string
//         ) => {
//           if (
//             !searchText.trim()
//           ) {
//             setResults([]);
//             return;
//           }

//           try {
//             setLoading(true);

//             const res =
//               await api.get(
//                 `/nutrition/search-food?q=${searchText}`
//               );

//             setResults(
//               res.data || []
//             );

//           } catch (err) {
//             console.error(err);
//           } finally {
//             setLoading(false);
//           }
//         },
//         300
//       ),
//       []
//     );

//   return (
//     <Box position="relative">
//       <Input
//         size="lg"
//         bg="gray.50"
//         borderRadius="xl"
//         placeholder="Search food..."
//         value={query}
//         onChange={(e) => {
//           const value =
//             e.target.value;

//           setQuery(value);

//           searchFoods(value);
//         }}
//       />

//       {loading && (
//         <Spinner
//           size="sm"
//           position="absolute"
//           right="12px"
//           top="14px"
//         />
//       )}

//       {results.length > 0 && (
//         <Box
//           mt={2}
//           bg="white"
//           borderRadius="xl"
//           border="1px solid"
//           borderColor="gray.200"
//           overflow="hidden"
//           boxShadow="lg"
//         >
//           <VStack
//             spacing={0}
//             align="stretch"
//           >
//             {results.map(
//               (food) => (
//                 <Box
//                   key={`${food.source}-${food.id}`}
//                   px={4}
//                   py={3}
//                   cursor="pointer"
//                   transition="all .2s"
//                   _hover={{
//                     bg: "brand.50",
//                   }}
//                   onClick={() => {
             
//                     onSelectFood(food);

//                     setQuery("");

//                     setResults([]);
//                   }}
//                 >
//                   <Text
//                     fontWeight="600"
//                   >
//                     {food.name}
//                   </Text>

//                   <Text
//                     fontSize="xs"
//                     color="gray.500"
//                   >
//                     {food.source}
//                   </Text>
//                 </Box>
//               )
//             )}
//           </VStack>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default FoodSearchInput;


// Version 2 : AI Food Generation UI changes

import {
  Box,
  Input,
  Text,
  VStack,
  Spinner,
  Button,
  HStack
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

interface Props {

  onSelectFood:
  (
    food: FoodItem
  ) => void;

  onGenerateFood:
  (
    foodName:string
  ) => void;
}



const FoodSearchInput = ({
  onSelectFood,
  onGenerateFood,
}: Props) => {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<FoodItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [searched, setSearched] =
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

          setSearched(
            false
          );

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
            // setSearched(true);
            setSearched(
  (res.data || []).length === 0
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
                    setSearched(false);
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

      {searched &&
 results.length === 0 &&
 !loading && (

  <Box
    mt={3}
    bg="white"
    borderRadius="xl"
    p={4}
    border="1px solid"
    borderColor="orange.100"
    boxShadow="sm"
  >

    <Text
      fontWeight="600"
      mb={3}
    >
      Food not found
    </Text>

    <Text
      fontSize="sm"
      color="gray.500"
      mb={4}
    >
      Help NEKA learn this food.
    </Text>

    <HStack>

      <Button
        size="sm"
        colorScheme="blue"
        flex={1}
        onClick={() => {

        onGenerateFood(query);

        }}
      >
        🤖 Generate
      </Button>

      <Button
        size="sm"
        variant="outline"
        flex={1}
        onClick={() => {

          console.log(
            "Manual Food:",
            query
          );

        }}
      >
        ✍️ Manual
      </Button>

    </HStack>

  </Box>
)}
    </Box>
  );
};

export default FoodSearchInput;