import {
  Box,
  VStack,
  useToast
} from "@chakra-ui/react";

import { useState } from "react";

import api from "../utils/api";

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

  const toast =
    useToast();

  const [loading,
    setLoading] =
    useState(false);

  const [result,
    setResult] =
    useState<any>(null);

    const [query, setQuery] = useState("");

  const searchFood =
    async (
      query: string
    ) => {

      if (!query.trim()) {
        return;
      }

      try {

        setLoading(true);

   
const res = await api.post(
  "/nutrition/lookup",
  {
    query: query
  }
);

        setResult(
          res.data
        );

      } catch (err) {

        console.error(err);

        toast({

          title:
            "Unable to fetch nutrition",

          description:
            "Please try again.",

          status:
            "error",

          duration:
            2500,

          isClosable:
            true

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
#ffffff,
#f5fbff
)"
>

<Box
maxW="430px"
mx="auto"
px={5}
pt={8}
pb="120px"
>

<VStack
spacing={6}
align="stretch"
>

<NutritionHero/>

{/* <NutritionSearchInput
onSearch={
  searchFood
}
/> */}

<NutritionSearchInput
    query={query}
    setQuery={setQuery}
    onSearch={searchFood}
/>

{/* <PopularSearches
onSelect={
  searchFood
}
/> */}
<PopularSearches
onSelect={(value) => {

  setQuery(value);

  searchFood(value);

}}
/>

{
loading && (

<LoadingCard/>

)
}

{
!loading &&
result && (

<NutritionResultCard
result={result}
/>

)
}

</VStack>

</Box>

</Box>

  );

};

export default NutritionSearch;