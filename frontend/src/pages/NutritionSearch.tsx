// Version 1

// import {
//   Box,
//   VStack,
//   useToast
// } from "@chakra-ui/react";

// import { useState } from "react";

// import api from "../utils/api";

// import NutritionHero
// from "../components/nutrition/NutritionHero";

// import NutritionSearchInput
// from "../components/nutrition/NutritionSearchInput";

// import PopularSearches
// from "../components/nutrition/PopularSearches";

// import NutritionResultCard
// from "../components/nutrition/NutritionResultCard";

// import LoadingCard
// from "../components/nutrition/LoadingCard";

// const NutritionSearch = () => {

//   const toast =
//     useToast();

//   const [loading,
//     setLoading] =
//     useState(false);

//   const [result,
//     setResult] =
//     useState<any>(null);

//     const [query, setQuery] = useState("");

//   const searchFood =
//     async (
//       query: string
//     ) => {

//       if (!query.trim()) {
//         return;
//       }

//       try {

//         setLoading(true);

   
// const res = await api.post(
//   "/nutrition/lookup",
//   {
//     query: query
//   }
// );

//         setResult(
//           res.data
//         );

//       } catch (err) {

//         console.error(err);

//         toast({

//           title:
//             "Unable to fetch nutrition",

//           description:
//             "Please try again.",

//           status:
//             "error",

//           duration:
//             2500,

//           isClosable:
//             true

//         });

//       } finally {

//         setLoading(false);

//       }

//     };

//   return (

// <Box
// minH="100vh"
// bg="linear-gradient(
// 180deg,
// #ffffff,
// #f5fbff
// )"
// >

// <Box
// maxW="430px"
// mx="auto"
// px={5}
// pt={8}
// pb="120px"
// >

// <VStack
// spacing={6}
// align="stretch"
// >

// <NutritionHero/>

// {/* <NutritionSearchInput
// onSearch={
//   searchFood
// }
// /> */}

// <NutritionSearchInput
//     query={query}
//     setQuery={setQuery}
//     onSearch={searchFood}
// />

// {/* <PopularSearches
// onSelect={
//   searchFood
// }
// /> */}
// <PopularSearches
// onSelect={(value) => {

//   setQuery(value);

//   searchFood(value);

// }}
// />

// {
// loading && (

// <LoadingCard/>

// )
// }

// {
// !loading &&
// result && (

// <NutritionResultCard
// result={result}
// />

// )
// }

// </VStack>

// </Box>

// </Box>

//   );

// };

// export default NutritionSearch;



// Version 2

import {
  Box,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../utils/api";

import { useAuth } from "../context/AuthContext";

import NutritionTopBar
  from "../components/nutrition/NutritionTopbar";

import NutritionHero
  from "../components/nutrition/NutritionHero";

import NutritionSearchInput
  from "../components/nutrition/NutritionSearchInput";

import PopularSearches
  from "../components/nutrition/PopularSearches";

import NutritionResultCard
  from "../components/nutrition/NutritionResultCard";

import LoadingCard
  from "../components/nutrition/LoadingCard";


const NutritionSearch = () => {

  const toast = useToast();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [query, setQuery] =
    useState("");


  const searchFood =
    async (query: string) => {

      if (!query.trim()) {
        return;
      }

      try {

        setLoading(true);

        const res = await api.post(
          "/nutrition/lookup",
          {
            query: query,
          }
        );

        setResult(res.data);

      } catch (err) {

        console.error(err);

        toast({
          title: "Unable to fetch nutrition",
          description: "Please try again.",
          status: "error",
          duration: 2500,
          isClosable: true,
        });

      } finally {

        setLoading(false);

      }

    };


  return (

    <Box
      minH="100vh"
      bg="linear-gradient(
        180deg,
        #ffffff 0%,
        #f5fbff 100%
      )"
    >

      <Box
        maxW="500px"
        mx="auto"
        px={5}
        pt={5}
        pb="120px"
      >

        <VStack
          spacing={6}
          align="stretch"
        >

          {/* Anonymous navigation */}
          <NutritionTopBar />

          {user && (
  <Box>
    <Button
      variant="ghost"
      size="sm"
      color="gray.600"
      fontWeight="600"
      px={1}
      onClick={() => navigate("/home")}
    >
      ← Back
    </Button>
  </Box>
)}
          {/* Hero */}
          <NutritionHero />


          {/* Search */}
          <NutritionSearchInput
            query={query}
            setQuery={setQuery}
            onSearch={searchFood}
          />


          {/* Popular searches */}
          <PopularSearches
            onSelect={(value) => {

              setQuery(value);

              searchFood(value);

            }}
          />


          {/* Loading */}
          {loading && (
            <LoadingCard />
          )}


          {/* Result */}
          {!loading && result && (

            <NutritionResultCard
              result={result}
              isAuthenticated={!!user}
            />

          )}

        </VStack>

      </Box>

    </Box>

  );
};


export default NutritionSearch;