import {
  Box,
  HStack,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";



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

        {/* <Select
          value={unit}
          size="lg"
          w="110px"
          borderRadius="xl"
          onChange={(e) =>
            onUnitChange(
              e.target.value
            )
          }
        >
          {units.map((u) => (
            <option
              key={u}
              value={u}
            >
              {u}
            </option>
          ))}
        </Select> */}

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
</Select>

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