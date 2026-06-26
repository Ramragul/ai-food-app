import {
Box,
Spinner,
Text,
VStack
}
from "@chakra-ui/react";

const LoadingCard=()=>{

return(

<Box
bg="white"
borderRadius="3xl"
boxShadow="md"
p={8}
>

<VStack>

<Spinner
size="xl"
color="brand.500"
/>

<Text
fontWeight="700"
>

Searching NEKA Database

</Text>

<Text
fontSize="sm"
color="gray.500"
textAlign="center"
>

Finding nutrition details...

</Text>

</VStack>

</Box>

);

};

export default LoadingCard;