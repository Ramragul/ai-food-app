import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Props {

  amount:number;

  unit:string;

  equivalentGrams:number;

  units:string[];

  onAmountChange:(value:number)=>void;

  onUnitChange:(value:string)=>void;

}

const CustomServing=({

amount,

unit,

equivalentGrams,

units,

onAmountChange,

onUnitChange

}:Props)=>{

return(

<Box

mt={5}

bg="gray.50"

p={5}

borderRadius="2xl"

>

<Text

fontWeight="700"

mb={5}

>

⚖️ Custom Amount

</Text>

<VStack

spacing={5}

>

<FormControl>

<FormLabel>

Amount

</FormLabel>

<Input

size="lg"

type="number"

value={amount}

onChange={(e)=>

onAmountChange(

Number(e.target.value)

)

}

/>

</FormControl>

<FormControl>

<FormLabel>

Unit

</FormLabel>

<Select

size="lg"

value={unit}

onChange={(e)=>

onUnitChange(

e.target.value

)

}

>

{

units.map((u)=>(

<option

key={u}

value={u}

>

{u}

</option>

))

}

</Select>

</FormControl>

<Box

w="100%"

bg="white"

p={4}

borderRadius="xl"

>

<Text

fontSize="sm"

color="gray.500"

>

Equivalent Weight

</Text>

<Text

fontSize="xl"

fontWeight="800"

>

{equivalentGrams.toFixed(1)} g

</Text>

</Box>

</VStack>

</Box>

);

};

export default CustomServing;