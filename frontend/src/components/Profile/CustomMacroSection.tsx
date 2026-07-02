// import {
//     Box,
//     Input,
//     InputGroup,
//     InputRightElement,
//     SimpleGrid,
//     Text
// } from "@chakra-ui/react";

// interface Props {

//     calories:string;

//     protein:string;

//     carbs:string;

//     fats:string;

//     onChange:(
//         field:string,
//         value:string
//     )=>void;

// }

// const fields=[
// {
// label:"Daily Calories",
// name:"targetCalories",
// unit:"kcal",
// emoji:"🔥"
// },
// {
// label:"Protein",
// name:"proteinTarget",
// unit:"g",
// emoji:"🥩"
// },
// {
// label:"Carbs",
// name:"carbsTarget",
// unit:"g",
// emoji:"🍚"
// },
// {
// label:"Fat",
// name:"fatsTarget",
// unit:"g",
// emoji:"🥑"
// }
// ];

// const values=(props:any)=>({

// targetCalories:props.calories,

// proteinTarget:props.protein,

// carbsTarget:props.carbs,

// fatsTarget:props.fats

// });

// const CustomMacroSection=(props:Props)=>{

// const formValues=values(props);

// return(

// <Box mt={6}>

// <Text
// fontWeight="700"
// mb={4}
// fontSize="md"
// >

// Daily Nutrition Targets

// </Text>

// <SimpleGrid
// columns={2}
// spacing={4}
// >

// {fields.map(field=>(

// <Box
// key={field.name}
// p={4}
// borderRadius="2xl"
// bg="white"
// borderWidth="1px"
// borderColor="gray.200"
// boxShadow="sm"
// >

// <Text
// fontWeight="600"
// mb={3}
// >

// {field.emoji} {field.label}

// </Text>

// <InputGroup>

// <Input

// value={
// formValues[field.name]
// }

// type="number"

// onChange={(e)=>

// props.onChange(
// field.name,
// e.target.value
// )

// }

// borderRadius="xl"

// />

// <InputRightElement>

// <Text
// fontSize="sm"
// color="gray.500"
// >

// {field.unit}

// </Text>

// </InputRightElement>

// </InputGroup>

// </Box>

// ))}

// </SimpleGrid>

// </Box>

// );

// };

// export default CustomMacroSection;


// Version 2

import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Props {

  values: {

    target_calories: string;

    protein_target: string;

    carbs_target: string;

    fats_target: string;

  };

  onChange: (
    field: string,
    value: string
  ) => void;

}

const fields = [

  {
    key: "target_calories",
    title: "Daily Calories",
    icon: "🔥",
    unit: "kcal"
  },

  {
    key: "protein_target",
    title: "Protein",
    icon: "🥩",
    unit: "g"
  },

  {
    key: "carbs_target",
    title: "Carbs",
    icon: "🍚",
    unit: "g"
  },

  {
    key: "fats_target",
    title: "Fat",
    icon: "🥑",
    unit: "g"
  }

];

const CustomMacroSection = ({
  values,
  onChange
}: Props) => {

  return (

    <Box mt={7}>

      <Text
        fontWeight="700"
        fontSize="lg"
        mb={4}
      >
        Daily Nutrition Targets
      </Text>

      <SimpleGrid
        columns={2}
        spacing={4}
      >

        {fields.map(field => (

          <Box
            key={field.key}
            bg="white"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="gray.200"
            p={4}
            boxShadow="sm"
          >

            <VStack
              spacing={3}
              align="stretch"
            >

              <Text
                fontWeight="600"
                fontSize="sm"
              >
                {field.icon} {field.title}
              </Text>

              <InputGroup>

                <Input

                  value={
                    values[
                      field.key as keyof typeof values
                    ]
                  }

                  type="number"

                  size="lg"

                  borderRadius="xl"

                  onChange={(e)=>

                    onChange(
                      field.key,
                      e.target.value
                    )

                  }

                />

                <InputRightElement
                  h="100%"
                  pr={3}
                >

                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    {field.unit}
                  </Text>

                </InputRightElement>

              </InputGroup>

            </VStack>

          </Box>

        ))}

      </SimpleGrid>

    </Box>

  );

};

export default CustomMacroSection;