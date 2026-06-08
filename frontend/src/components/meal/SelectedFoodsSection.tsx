import {
  Box,
  Text,
  Wrap,
  WrapItem,
  IconButton
} from "@chakra-ui/react";

import {
  CloseIcon
} from "@chakra-ui/icons";

interface Props {
  foods: string[];
  onRemove: (
    food: string
  ) => void;
}

const SelectedFoodsSection = ({
  foods,
  onRemove
}: Props) => {
  if (
    foods.length === 0
  ) {
    return null;
  }

  return (
    <Box mt={8}>
      <Text
        fontSize="lg"
        fontWeight="700"
        mb={3}
      >
        Selected Foods
      </Text>

      <Wrap spacing={3}>
        {foods.map(
          (food) => (
            <WrapItem
              key={food.id}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                px={4}
                py={3}
                bg="white"
                borderRadius="full"
                border="1px solid"
                borderColor="brand.100"
                boxShadow="sm"
              >
                <Text
                  fontWeight="500"
                >
                  {food.name}
                </Text>

                <IconButton
                  aria-label="remove"
                  size="xs"
                  icon={
                    <CloseIcon />
                  }
                  borderRadius="full"
                  onClick={() =>
                    onRemove(
                      food.id
                    )
                  }
                />
              </Box>
            </WrapItem>
          )
        )}
      </Wrap>
    </Box>
  );
};

export default SelectedFoodsSection;