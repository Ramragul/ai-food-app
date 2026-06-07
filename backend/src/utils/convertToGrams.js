// utils/convertToGrams.js

export const convertToGrams = (
  quantity,
  unit,
  typicalServingWeight = 100
) => {
  if (!quantity) {
    return typicalServingWeight;
  }

  if (!unit) {
    return quantity * typicalServingWeight;
  }

  const normalizedUnit =
    unit.toLowerCase();

  switch (normalizedUnit) {

    case "g":
    case "gram":
    case "grams":
      return quantity;

    case "kg":
      return quantity * 1000;

    case "ml":
      return quantity;

    case "piece":
    case "pieces":
      return (
        quantity *
        typicalServingWeight
      );

    case "cup":
      return quantity * 240;

    case "bowl":
      return quantity * 300;

    case "tbsp":
      return quantity * 15;

    case "tsp":
      return quantity * 5;

    case "oz":
      return quantity * 28.35;

    default:
      return (
        quantity *
        typicalServingWeight
      );
  }
};