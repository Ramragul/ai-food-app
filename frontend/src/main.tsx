// Version 1


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { ChakraProvider } from "@chakra-ui/react";
// import theme from "../src/theme/theme.ts";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ChakraProvider theme={theme}>
//       <App />
//     </ChakraProvider>
//   </React.StrictMode>
// );


// Version 2

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme/theme.ts";

import { StatusBar, Style } from "@capacitor/status-bar";

// 🔥 IMPORTANT FIX
StatusBar.setOverlaysWebView({ overlay: false });
StatusBar.setStyle({ style: Style.Dark });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);