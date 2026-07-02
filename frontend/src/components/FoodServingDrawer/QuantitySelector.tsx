import {
  Box,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";

import {
  FiMinus,
  FiPlus,
} from "react-icons/fi";

interface Props {

  quantity:number;

  onChange:(value:number)=>void;

}

const QuantitySelector=({

quantity,

onChange

}:Props)=>{

const decrease=()=>{

if(quantity===1)return;

onChange(quantity-1);

};

const increase=()=>{

onChange(quantity+1);

};

return(

<Box>

<Text
mb={3}
fontWeight="700"
fontSize="md"
>

Quantity

</Text>

<HStack

justify="space-between"

bg="gray.50"

borderRadius="2xl"

p={2}

border="1px solid"

borderColor="gray.200"

>

<IconButton

aria-label="Decrease"

icon={<FiMinus/>}

isRound

size="lg"

bg="white"

_hover={{

bg:"gray.100"

}}

onClick={decrease}

/>

<Text

fontSize="2xl"

fontWeight="800"

minW="60px"

textAlign="center"

>

{quantity}

</Text>

<IconButton

aria-label="Increase"

icon={<FiPlus/>}

isRound

size="lg"

bg="brand.500"

color="white"

_hover={{

bg:"brand.600"

}}

onClick={increase}

/>

</HStack>

</Box>

);

};

export default QuantitySelector;