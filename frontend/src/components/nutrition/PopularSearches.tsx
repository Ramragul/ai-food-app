import {
  Box,
  Wrap,
  WrapItem,
  Tag,
  Text
} from "@chakra-ui/react";

interface Props{

onSelect:
(
query:string
)=>void;

}

const searches=[

"Chicken Breast",
"Egg",
"Paneer",
"Milk",
"Rice",
"Banana"

];

const PopularSearches=({

onSelect

}:Props)=>{

return(

<Box>

<Text
fontWeight="700"
mb={3}
>

Popular Searches

</Text>

<Wrap>

{

searches.map(item=>(

<WrapItem
key={item}
>

<Tag
size="lg"
cursor="pointer"
borderRadius="full"
bg="blue.50"
color="blue.700"
px={4}
py={2}
_hover={{
bg:"blue.100"
}}
onClick={()=>
onSelect(item)
}
>

{item}

</Tag>

</WrapItem>

))

}

</Wrap>

</Box>

);

};

export default PopularSearches;