import {
  SimpleGrid,
  Box,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props{

data:any;

}

const MacroCard=({

label,
value,
emoji

}:any)=>(

<Box
// bg="gray.50"
bg="rgba(14,165,233,.06)"
borderRadius="2xl"
py={5}
textAlign="center"
>

<VStack
spacing={1}
>

<Text
fontSize="2xl"
>

{emoji}

</Text>

<Text
fontSize="2xl"
fontWeight="800"
>

{value}g

</Text>

<Text
fontSize="sm"
color="gray.500"
>

{label}

</Text>

</VStack>

</Box>

);

const MacroGrid=({

data

}:Props)=>{

return(

<SimpleGrid
columns={2}
spacing={4}
>

<MacroCard
emoji="🥩"
label="Protein"
value={data.protein}
/>

<MacroCard
emoji="🍚"
label="Carbs"
value={data.carbs}
/>

<MacroCard
emoji="🥑"
label="Fat"
value={data.fat}
/>

<MacroCard
emoji="🌾"
label="Fiber"
value={data.fiber}
/>

</SimpleGrid>

);

};

export default MacroGrid;