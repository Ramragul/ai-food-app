// import Home from "./pages/Home";
// import RecipeDetail from "./pages/RecipeDetail";

// function App() {
//   return <Home />;
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import RecipeDetail from "./pages/RecipeDetail";
// import ChefOrders from "./pages/ChefOrders";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/recipe" element={<RecipeDetail />} />
//         <Route path="/chef/orders" element={<ChefOrders />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;