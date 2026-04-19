// Version 1 

// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;


// Version 2 

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AppModeProvider } from "./context/AppModeContext";

function App() {
  return (
    <AuthProvider>
      <AppModeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      </AppModeProvider>
    </AuthProvider>
  );
}

export default App;