// constants/measurementUnits.ts

// export const WEIGHT_UNITS = [
//   { code: "g", label: "g" },
//   { code: "kg", label: "kg" },
//   { code: "oz", label: "oz" },
//   { code: "lb", label: "lb" },
// ];

// export const VOLUME_UNITS = [
//   { code: "ml", label: "mL" },
//   { code: "l", label: "L" },
//   { code: "cup", label: "Cup" },
//   { code: "glass", label: "Glass" },
//   { code: "tbsp", label: "Tbsp" },
//   { code: "tsp", label: "Tsp" },
// ];



export const WEIGHT_UNITS = [
  { code: "g", label: "g", factor: 1 },
  { code: "kg", label: "kg", factor: 1000 },
  { code: "oz", label: "oz", factor: 28.3495 },
  { code: "lb", label: "lb", factor: 453.592 },
];

export const VOLUME_UNITS = [
  { code: "ml", label: "mL", factor: 1 },
  { code: "l", label: "L", factor: 1000 },
  { code: "cup", label: "Cup", factor: 240 },
  { code: "glass", label: "Glass", factor: 250 },
  { code: "tbsp", label: "Tbsp", factor: 15 },
  { code: "tsp", label: "Tsp", factor: 5 },
];