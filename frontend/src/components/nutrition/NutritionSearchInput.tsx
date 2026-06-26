import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Spinner
} from "@chakra-ui/react";

import {
  Search2Icon,
  CloseIcon
} from "@chakra-ui/icons";

import {
  useState
} from "react";



interface Props {

  query: string;

  setQuery: React.Dispatch<
    React.SetStateAction<string>
  >;

  onSearch: (
    query: string
  ) => Promise<void>;

}

const NutritionSearchInput = ({
  query,
  setQuery,
  onSearch
}: Props) => {



const [loading,setLoading]=
useState(false);

const search = async () => {

  const value =
    query.trim();

  if (!value) return;

  try {

    setLoading(true);

    await onSearch(value);

  } finally {

    setLoading(false);

  }

};

return(

<Box>

<InputGroup
size="lg"
>

<InputLeftElement>

<Search2Icon
color="gray.400"
/>

</InputLeftElement>

<Input

placeholder="
Search any food or ingredient..."

value={query}

bg="white"

borderRadius="full"

border="1px solid"

borderColor="gray.200"

boxShadow="sm"

_focus={{

borderColor:"brand.500",

boxShadow:
"0 0 0 1px #38BDF8"

}}

onChange={(e)=>

setQuery(
e.target.value
)

}

onKeyDown={(e) => {

  if (e.key === "Enter") {

    e.preventDefault();

    search();

  }

}}

pr="90px"

/>

<InputRightElement
w="80px"
>

{

loading

?

<Spinner
size="sm"
color="brand.500"
/>

:

query &&

<>

<IconButton

aria-label="clear"

icon={
<CloseIcon/>
}

size="xs"

variant="ghost"

onClick={()=>

setQuery("")

}

/>

<IconButton

ml={2}

aria-label="search"

icon={
<Search2Icon/>
}

size="sm"

colorScheme="blue"

borderRadius="full"

onClick={search}

/>

</>

}

</InputRightElement>

</InputGroup>

</Box>

);

};

export default NutritionSearchInput;