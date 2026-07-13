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

// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./context/AuthContext";
// import { AppModeProvider } from "./context/AppModeContext";


// function App() {
//   return (
//     <AuthProvider>
//       <AppModeProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//       </AppModeProvider>
//     </AuthProvider>
//   );
// }

// export default App;


// Version 3 : Onboarding  tutorial feature

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AppModeProvider } from "./context/AppModeContext";
import { useState } from "react";
import Onboarding from "./components/Onboarding";
import { WorkspaceProvider } from "./context/WorkspaceContext";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    !localStorage.getItem("seenOnboarding")
  );

  return (
    <AuthProvider>
      <WorkspaceProvider>
      <AppModeProvider>
        <BrowserRouter>

          {/* 🔥 Your actual app */}
          <AppRoutes />

          {/* 🔥 Onboarding overlay */}
          {showOnboarding && (
            <Onboarding onComplete={() => setShowOnboarding(false)} />
          )}

        </BrowserRouter>
      </AppModeProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;