// Version 1 

// import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import RecipeDetail from "../pages/RecipeDetail";
// import ChefOrders from "../pages/ChefOrders";
// import MealResultsPage from "../pages/MealResultsPage";
// import OrderSuccess from "../pages/OrderSuccess";
// import Orders from "../pages/Orders";
// import TrackMealPage from "../pages/TrackMealPage";
// import AddMeal from "../pages/AddMeal";
// import Dashboard from "../pages/Dashboard";
// import GoalSetup from "../pages/GoalSetup";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/recipe" element={<RecipeDetail />} />
//       <Route path="/chef/orders" element={<ChefOrders />} />
//       <Route path="/results" element={<MealResultsPage />} />
//       <Route path="/orders" element={<Orders />} />
//       <Route path="/order-success" element={<OrderSuccess />} />
//       <Route path="/track-meal1" element={<TrackMealPage />} />
//       <Route path="/add-meal" element={<AddMeal />} />
//       <Route path="/track-meal" element={<Dashboard />} />
//       <Route path="/goal-setup" element={<GoalSetup />} />
//     </Routes>
//   );
// };

// export default AppRoutes;



// Version 2 

// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import ProtectedRoute from "../components/ProtectedRoute";

// // 🔓 Public pages
// // import Signup from "../pages/Signup";
// // import Login from "../pages/Login";

// // 🔐 Existing pages
// import Home from "../pages/Home";
// import RecipeDetail from "../pages/RecipeDetail";
// import ChefOrders from "../pages/ChefOrders";
// import MealResultsPage from "../pages/MealResultsPage";
// import OrderSuccess from "../pages/OrderSuccess";
// import Orders from "../pages/Orders";
// import TrackMealPage from "../pages/TrackMealPage";
// import AddMeal from "../pages/AddMeal";
// import Dashboard from "../pages/Dashboard";

// import GoalSetup from "../pages/GoalSetup";
// import AuthPage from "../pages/AuthPage";
// import AppLayout from "../components/AppLayout";


// const AppRoutes = () => {
//   const { user } = useAuth();

//   return (
//     <Routes>

//       {/* 🔥 ENTRY LOGIC */}
//       {/* <Route
//         path="/"
//         element={
//           user ? <Navigate to="/track-meal" /> : <Signup />
//         }
//       /> */}

//       {/* 🔓 AUTH */}
//       {/* <Route
//         path="/login"
//         element={
//           user ? <Navigate to="/track-meal" /> : <Login />
//         }
//       /> */}

//       {/* 🔐 PROTECTED APP */}
//       <Route
//         path="/home"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//               <Home />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/recipe"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//               <RecipeDetail />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/chef/orders"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//               <ChefOrders />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/results"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//              <MealResultsPage />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//              <Orders />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/order-success"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//               <OrderSuccess />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/track-meal1"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//               <TrackMealPage />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/add-meal"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//               <AddMeal />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/track-meal"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//              <Dashboard />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/goal-setup"
//         element={
//           <ProtectedRoute>
//             <AppLayout>
//               <GoalSetup />
//             </AppLayout>
//           </ProtectedRoute>
//         }
//       />

// {/* <Route path="/auth" element={<AuthPage />} /> */}

// <Route
//   path="/"
//   element={
//     user ? <Navigate to="/track-meal" /> : <AuthPage />
//   }
// />
// <Route path="/login" element={<Navigate to="/" />} />

//       {/* 🔥 FALLBACK */}
//       <Route path="*" element={<Navigate to="/" />} />

//     </Routes>
//   );
// };

// export default AppRoutes;


// Version 3 : Enhancement to Version 2

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Home from "../pages/Home";
import RecipeDetail from "../pages/RecipeDetail";
import ChefOrders from "../pages/ChefOrders";
import MealResultsPage from "../pages/MealResultsPage";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";
import TrackMealPage from "../pages/TrackMealPage";
import AddMeal from "../pages/AddMeal";
import Dashboard from "../pages/Dashboard";
import GoalSetup from "../pages/GoalSetup";
import AuthPage from "../pages/AuthPage";

import AppLayout from "../components/AppLayout";
import ProfilePage from "../pages/ProfilePage";


const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>

      {/* 🔓 PUBLIC */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <AuthPage />}
      />
      <Route path="/login" element={<Navigate to="/" />} />

      {/* 🔐 PROTECTED + LAYOUT (ONE WRAPPER 💎) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/meals" element={<Home />} />
        <Route path="/recipe" element={<RecipeDetail />} />
        <Route path="/chef/orders" element={<ChefOrders />} />
        <Route path="/results" element={<MealResultsPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/track-meal1" element={<TrackMealPage />} />
        <Route path="/add-meal" element={<AddMeal />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/goal-setup" element={<GoalSetup />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* 🔥 FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};

export default AppRoutes;