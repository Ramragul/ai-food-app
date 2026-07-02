// Version 1

// export const convertToGrams = (
//   amount: number,
//   unit: string,
//   density = 1
// ): number => {

//   switch (unit) {

//     case "g":
//       return amount;

//     case "kg":
//       return amount * 1000;

//     case "oz":
//       return amount * 28.3495;

//     case "lb":
//       return amount * 453.592;

//     case "ml":
//       return amount * density;

//     case "l":
//       return amount * 1000 * density;

//     default:
//       return amount;
//   }

// };


// Version 2

import {
  WEIGHT_UNITS,
  VOLUME_UNITS,
} from "../constants/measurementUnits";

export const convertToGrams = (
  amount: number,
  unit: string,
  density = 1
): number => {

  const weightUnit =
    WEIGHT_UNITS.find(
      u => u.code === unit
    );

  if (weightUnit) {
    return amount * weightUnit.factor;
  }

  const volumeUnit =
    VOLUME_UNITS.find(
      u => u.code === unit
    );

  if (volumeUnit) {
    return (
      amount *
      volumeUnit.factor *
      density
    );
  }

  return amount;
};