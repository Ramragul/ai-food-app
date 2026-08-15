


import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Icon,
  Box,
  Input,
  Text
} from "@chakra-ui/react";

import { FiCheck, FiChevronDown } from "react-icons/fi";



interface MeasurementUnit {
  code: string;
  label: string;
}

interface Props {
  amount: string;
  unit: string;
  units: MeasurementUnit[];
  equivalentGrams: number;
  onAmountChange: (v: string) => void;
  onUnitChange: (v: string) => void;
  onActivateCustom: () => void;
}

const ExactServing = ({
  amount,
  unit,
  units,
  equivalentGrams,
  onAmountChange,
  onUnitChange,
  onActivateCustom,
}: Props) => {
  return (
    <Box mt={4}>

      <Text
        fontSize="sm"
        color="gray.600"
        mb={2}
        fontWeight="600"
      >
        Need a different amount?
      </Text>

      <HStack spacing={3}>

        <Input
          value={amount}
          type="number"
          size="lg"
          borderRadius="xl"
          onFocus={onActivateCustom}
          onChange={(e) => {
                onAmountChange(e.target.value);
                onActivateCustom();
            }}
        />


{/* 
        <Select
    value={unit}
    onFocus={onActivateCustom}
    onChange={(e) => onUnitChange(e.target.value)}
>
    {units.map((u) => (
        <option
            key={u.code}
            value={u.code}
        >
            {u.label}
        </option>
    ))}
</Select> */}

<Menu>

  <MenuButton
    as={Button}
    size="lg"
    minW="110px"
    borderRadius="xl"
    rightIcon={<FiChevronDown />}
    variant="outline"
    bg="white"
    _hover={{
      bg: "gray.50"
    }}
    _expanded={{
      bg: "brand.50",
      borderColor: "brand.500"
    }}
    onClick={onActivateCustom}
  >
    {units.find(
      u => u.code === unit
    )?.label}
  </MenuButton>

  <MenuList
    borderRadius="xl"
    py={2}
  >

    {units.map((u) => (

      // <MenuItem
      //   key={u.code}
      //   fontWeight={
      //     unit === u.code
      //       ? "600"
      //       : "500"
      //   }
      //   color={
      //     unit === u.code
      //       ? "brand.500"
      //       : "inherit"
      //   }
      //   onClick={() => {

      //     onActivateCustom();

      //     onUnitChange(
      //       u.code
      //     );

      //   }}
      // >

      //   {u.label}

      // </MenuItem>

      <MenuItem
  key={u.code}
  bg={
    unit === u.code
      ? "brand.50"
      : "white"
  }
  _hover={{
    bg:
      unit === u.code
        ? "brand.100"
        : "gray.50"
  }}
  borderRadius="lg"
  mx={2}
  my={1}
  onClick={() => {
    onActivateCustom();
    onUnitChange(u.code);
  }}
>
  <HStack
    justify="space-between"
    w="100%"
  >
    <Text
      fontWeight={
        unit === u.code
          ? "700"
          : "500"
      }
      color={
        unit === u.code
          ? "brand.500"
          : "gray.700"
      }
    >
      {u.label}
    </Text>

    {unit === u.code && (
      <Icon
        as={FiCheck}
        color="brand.500"
      />
    )}
  </HStack>
</MenuItem>

    ))}

  </MenuList>

</Menu>



      </HStack>

      <Text
        mt={2}
        ml={1}
        fontSize="sm"
        color="gray.500"
      >
        ≈ {equivalentGrams.toFixed(1)} g
      </Text>

    </Box>
  );
};

export default ExactServing;