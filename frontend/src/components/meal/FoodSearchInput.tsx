



// Version 3 : 2 Enhancement

// import {
//   Box,
//   Input,
//   Text,
//   VStack,
//   Spinner,
//   HStack
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



// interface Props {

//   onSelectFood:
//   (
//     food: FoodItem
//   ) => void;

//   onGenerateFood:
//   (
//     foodName:string
//   ) => Promise<void>;
// }



// const FoodSearchInput = ({
//   onSelectFood,
//   onGenerateFood,
// }: Props) => {
//   const [query, setQuery] =
//     useState("");

//   const [results, setResults] =
//     useState<FoodItem[]>([]);

//   const [loading, setLoading] =
//     useState(false);

//   // const [searched, setSearched] =
//   // useState(false);
  

//   const [generating,
//   setGenerating] =
//   useState(false);

//   const searchFoods =
//     useCallback(
//       debounce(
//         async (
//           searchText: string
//         ) => {
//         if (
//           !searchText.trim()
//         ) {

//           setResults([]);

//           // setSearched(
//           //   false
//           // );

//           return;
//         }

//           try {
//             setLoading(true);

//             const res =
//               await api.get(
//                 `/nutrition/search-food?q=${searchText}`
//               );

// //             setResults(
// //               res.data || []
// //             );
// //             // setSearched(true);
// //             setSearched(
// //   (res.data || []).length === 0
// // );

// const foods =
//   res.data || [];

// setResults(foods);

// // if (
// //   foods.length === 0 &&
// //   searchText.trim()
// // ) {

// //   setGenerating(
// //     true
// //   );

// //   try {

// //     await onGenerateFood(
// //       searchText
// //     );

// //   } finally {

// //     setGenerating(
// //       false
// //     );

// //   }
// // }

// if (
//   foods.length === 0 &&
//   searchText.trim().length >= 5
// ) {

//   generateFoodDebounced(
//     searchText
//   );

// }
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


//   const generateFoodDebounced =
//   useCallback(
//     debounce(
//       async (foodName: string) => {

//         setGenerating(true);

//         try {

//           await onGenerateFood(
//             foodName
//           );

//         } finally {

//           setGenerating(false);

//         }

//       },
//       2000
//     ),
//     [onGenerateFood]
//   );

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

//       {loading && !generating && (

// <Box
//   mt={3}
//   bg="white"
//   borderRadius="2xl"
//   p={4}
//   boxShadow="md"
// >

//   <HStack>

//     <Spinner
//       color="blue.500"
//     />

//     <Box>

//       <Text
//         fontWeight="700"
//       >
//         Searching foods...
//       </Text>

//       <Text
//         fontSize="sm"
//         color="gray.500"
//       >
//         Looking through NEKA's food database
//       </Text>

//     </Box>

//   </HStack>

// </Box>

// )}

// {/* {
//  loading ? (
//    <Spinner
//      color="blue.500"
//    />
//  ) : (
//    <Text
//      color="gray.400"
//    >
//      🍽️
//    </Text>
//  )
// } */}

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
//                     // setSearched(false);
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
// {generating && (

// <Box
//   mt={3}
//   overflow="hidden"
//   bg="linear-gradient(
//     135deg,
//     #dbeafe,
//     #eff6ff
//   )"
//   borderRadius="3xl"
//   p={5}
//   boxShadow="
//     0 10px 30px
//     rgba(59,130,246,0.12)
//   "
// >

//   <VStack spacing={4}>

//     <Spinner
//       size="xl"
//       color="blue.500"
//       thickness="4px"
//     />

//     <Text
//       fontWeight="800"
//       fontSize="lg"
//     >
//       🧠 NEKA AI Learning
//     </Text>

//     <Text
//       textAlign="center"
//       color="gray.600"
//       fontSize="sm"
//     >
//       Searching nutrition data,
//       estimating macros and
//       creating a new food profile.
//     </Text>

//   </VStack>

// </Box>

// )}
//     </Box>
//   );
// };

// export default FoodSearchInput;



// Version 4 : Enhanement to version 3 , back to Manual AI search trigger

// import {
//   Box,
//   Input,
//   Text,
//   VStack,
//   Spinner,
//   HStack
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



// interface Props {

//   onSelectFood:
//   (
//     food: FoodItem
//   ) => void;

//   onGenerateFood:
//   (
//     foodName:string
//   ) => Promise<void>;
// }



// const FoodSearchInput = ({
//   onSelectFood,
//   onGenerateFood,
// }: Props) => {
//   const [query, setQuery] =
//     useState("");

//   const [results, setResults] =
//     useState<FoodItem[]>([]);

//   const [loading, setLoading] =
//     useState(false);



//   const [searchedText,
//   setSearchedText] =
//   useState("");
  

//   const [generating,
//   setGenerating] =
//   useState(false);

//   const searchFoods =
//     useCallback(
//       debounce(
//         async (
//           searchText: string
//         ) => {
//         if (
//           !searchText.trim()
//         ) {

//           setResults([]);

//           // setSearched(
//           //   false
//           // );

//           return;
//         }

//           try {
//             setLoading(true);

//             const res =
//               await api.get(
//                 `/nutrition/search-food?q=${searchText}`
//               );

// //             setResults(
// //               res.data || []
// //             );
// //             // setSearched(true);
// //             setSearched(
// //   (res.data || []).length === 0
// // );

// const foods =
//   res.data || [];

// setResults(foods);

// setSearchedText(
//   searchText
// );




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

//       {loading && !generating && (

// <Box
//   mt={3}
//   bg="white"
//   borderRadius="2xl"
//   p={4}
//   boxShadow="md"
// >

//   <HStack>

//     <Spinner
//       color="blue.500"
//     />

//     <Box>

//       <Text
//         fontWeight="700"
//       >
//         Searching foods...
//       </Text>

//       <Text
//         fontSize="sm"
//         color="gray.500"
//       >
//         Looking through NEKA's food database
//       </Text>

//     </Box>

//   </HStack>

// </Box>

// )}

// {/* {
//  loading ? (
//    <Spinner
//      color="blue.500"
//    />
//  ) : (
//    <Text
//      color="gray.400"
//    >
//      🍽️
//    </Text>
//  )
// } */}

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
//                     // setSearched(false);
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

//       {
//   !loading &&
//   !generating &&
//   searchedText.trim() &&
//   results.length === 0 && (

//     <Box
//       mt={3}
//       bg="linear-gradient(
//         135deg,
//         #dbeafe,
//         #eff6ff
//       )"
//       borderRadius="3xl"
//       p={5}
//       boxShadow="
//         0 10px 30px
//         rgba(59,130,246,0.12)
//       "
//       cursor="pointer"
//       onClick={async () => {

//         setGenerating(
//           true
//         );

//         try {

//           await onGenerateFood(
//             searchedText
//           );

//         } finally {

//           setGenerating(
//             false
//           );

//         }

//       }}
//     >

//       <VStack spacing={3}>

//         <Text
//           fontSize="2xl"
//         >
//           🧠
//         </Text>

//         <Text
//           fontWeight="800"
//           fontSize="lg"
//           textAlign="center"
//         >
//           Not seeing your food?
//         </Text>

//         <Text
//           textAlign="center"
//           color="gray.600"
//           fontSize="sm"
//         >
//           Let NEKA identify it and
//           estimate nutrition using AI.
//         </Text>

//         <Box
//           bg="blue.500"
//           color="white"
//           px={5}
//           py={2}
//           borderRadius="full"
//           fontWeight="700"
//         >
//           Generate Nutrition
//         </Box>

//       </VStack>

//     </Box>
//   )
// }

// {generating && (

// <Box
//   mt={3}
//   overflow="hidden"
//   bg="linear-gradient(
//     135deg,
//     #dbeafe,
//     #eff6ff
//   )"
//   borderRadius="3xl"
//   p={5}
//   boxShadow="
//     0 10px 30px
//     rgba(59,130,246,0.12)
//   "
// >

//   <VStack spacing={4}>

//     <Spinner
//       size="xl"
//       color="blue.500"
//       thickness="4px"
//     />

//     <Text
//       fontWeight="800"
//       fontSize="lg"
//     >
//       🧠 NEKA AI Learning
//     </Text>

//     <Text
//       textAlign="center"
//       color="gray.600"
//       fontSize="sm"
//     >
//       Searching nutrition data,
//       estimating macros and
//       creating a new food profile.
//     </Text>

//   </VStack>

// </Box>

// )}
//     </Box>
//   );
// };

// export default FoodSearchInput;

// Version 5 Enhancment to version 4 to support both scan and manual entry food search

import {
  Box,
  Input,
  Text,
  VStack,
  Spinner,
  HStack
} from "@chakra-ui/react";

import {
  useState,
  useCallback,
  useEffect
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

  /*
   * Optional.
   *
   * AddMeal uses this for:
   *
   * "Not seeing your food?"
   * → Generate Nutrition
   *
   * ScanMeal does NOT need it.
   */
  onGenerateFood?: (
    foodName: string
  ) => Promise<void>;

}


const FoodSearchInput = ({
  onSelectFood,
  onGenerateFood,
}: Props) => {

  const [
    query,
    setQuery
  ] = useState("");


  const [
    results,
    setResults
  ] = useState<FoodItem[]>([]);


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    searchedText,
    setSearchedText
  ] = useState("");


  const [
    generating,
    setGenerating
  ] = useState(false);


  /*
   * ----------------------------------------
   * SEARCH
   * ----------------------------------------
   */

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

            setSearchedText("");

            return;
          }


          try {

            setLoading(true);


            const res =
              await api.get(
                `/nutrition/search-food?q=${encodeURIComponent(
                  searchText
                )}`
              );


            const foods =
              res.data || [];


            setResults(
              foods
            );


            setSearchedText(
              searchText
            );


          } catch (err) {

            console.error(
              "Food search failed:",
              err
            );

            setResults([]);

          } finally {

            setLoading(false);

          }

        },
        300
      ),

      []

    );


  /*
   * ----------------------------------------
   * CLEANUP DEBOUNCE
   * ----------------------------------------
   */

  useEffect(() => {

    return () => {

      searchFoods.cancel();

    };

  }, [searchFoods]);


  /*
   * ----------------------------------------
   * GENERATE FOOD
   * ----------------------------------------
   */

  const handleGenerateFood =
    async () => {

      /*
       * Safety check.
       *
       * ScanMeal doesn't provide this
       * callback, so nothing happens.
       */

      if (
        !onGenerateFood
      ) {
        return;
      }


      const foodName =
        searchedText.trim();


      if (!foodName) {
        return;
      }


      setGenerating(
        true
      );


      try {

        await onGenerateFood(
          foodName
        );

      } catch (err) {

        console.error(
          "Food generation failed:",
          err
        );

      } finally {

        setGenerating(
          false
        );

      }

    };


  /*
   * ----------------------------------------
   * SELECT FOOD
   * ----------------------------------------
   */

  const handleSelectFood =
    (food: FoodItem) => {

      onSelectFood(
        food
      );


      setQuery(
        ""
      );


      setResults(
        []
      );


      setSearchedText(
        ""
      );

    };


  return (

    <Box
      position="relative"
    >

      {/* ------------------------------------
          SEARCH INPUT
      ------------------------------------- */}

      <Input

        size="lg"

        bg="gray.50"

        borderRadius="xl"

        placeholder="Search food..."

        value={
          query
        }

        onChange={(e) => {

          const value =
            e.target.value;


          setQuery(
            value
          );


          searchFoods(
            value
          );

        }}

      />


      {/* ------------------------------------
          SEARCH LOADING
      ------------------------------------- */}

      {loading &&
        !generating && (

          <Box
            mt={3}
            bg="white"
            borderRadius="2xl"
            p={4}
            boxShadow="md"
          >

            <HStack>

              <Spinner
                color="blue.500"
              />

              <Box>

                <Text
                  fontWeight="700"
                >
                  Searching foods...
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  Looking through NEKA's
                  food database
                </Text>

              </Box>

            </HStack>

          </Box>

        )}


      {/* ------------------------------------
          SEARCH RESULTS
      ------------------------------------- */}

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

                  key={
                    `${food.source}-${food.id}`
                  }

                  px={4}

                  py={3}

                  cursor="pointer"

                  transition="all .2s"

                  _hover={{
                    bg: "brand.50",
                  }}

                  onClick={() =>
                    handleSelectFood(
                      food
                    )
                  }

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


      {/* ------------------------------------
          NO RESULT + AI GENERATION
      ------------------------------------- */}

      {
        /*
         * IMPORTANT:
         *
         * This entire block only appears
         * when AddMeal supplies
         * onGenerateFood.
         *
         * Therefore ScanMeal can reuse
         * FoodSearchInput without showing
         * the AI food-generation card.
         */

        onGenerateFood &&
        !loading &&
        !generating &&
        searchedText.trim() &&
        results.length === 0 && (

          <Box

            mt={3}

            bg="linear-gradient(
              135deg,
              #dbeafe,
              #eff6ff
            )"

            borderRadius="3xl"

            p={5}

            boxShadow="
              0 10px 30px
              rgba(59,130,246,0.12)
            "

            cursor="pointer"

            onClick={
              handleGenerateFood
            }

          >

            <VStack
              spacing={3}
            >

              <Text
                fontSize="2xl"
              >
                🧠
              </Text>


              <Text
                fontWeight="800"
                fontSize="lg"
                textAlign="center"
              >
                Not seeing your food?
              </Text>


              <Text
                textAlign="center"
                color="gray.600"
                fontSize="sm"
              >
                Let NEKA identify it and
                estimate nutrition using AI.
              </Text>


              <Box

                bg="blue.500"

                color="white"

                px={5}

                py={2}

                borderRadius="full"

                fontWeight="700"

              >
                Generate Nutrition

              </Box>

            </VStack>

          </Box>

        )
      }


      {/* ------------------------------------
          AI GENERATING
      ------------------------------------- */}

      {
        onGenerateFood &&
        generating && (

          <Box

            mt={3}

            overflow="hidden"

            bg="linear-gradient(
              135deg,
              #dbeafe,
              #eff6ff
            )"

            borderRadius="3xl"

            p={5}

            boxShadow="
              0 10px 30px
              rgba(59,130,246,0.12)
            "

          >

            <VStack
              spacing={4}
            >

              <Spinner

                size="xl"

                color="blue.500"

                thickness="4px"

              />


              <Text
                fontWeight="800"
                fontSize="lg"
              >
                🧠 NEKA AI Learning
              </Text>


              <Text

                textAlign="center"

                color="gray.600"

                fontSize="sm"

              >

                Searching nutrition data,
                estimating macros and
                creating a new food profile.

              </Text>

            </VStack>

          </Box>

        )
      }

    </Box>

  );

};


export default FoodSearchInput;