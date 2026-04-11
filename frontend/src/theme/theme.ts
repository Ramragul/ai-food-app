import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
      brand: {
        50: "#eaf6ff",
        100: "#d6efff",
        200: "#b9e2fd", // 🔥 YOUR MAIN COLOR
        300: "#9dd6fa",
        400: "#80c9f7",
        500: "#63bdf4", // Chakra default uses this
        600: "#4da3d9",
        700: "#3789bf",
        800: "#216fa4",
        900: "#0b558a",
      },
    },
  });

export default theme;