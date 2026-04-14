import { Routes, Route } from "react-router-dom";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<RecipeDetail />} />
      <Route path="/chef/orders" element={<ChefOrders />} />
      <Route path="/results" element={<MealResultsPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/track-meal1" element={<TrackMealPage />} />
      <Route path="/add-meal" element={<AddMeal />} />
      <Route path="/track-meal" element={<Dashboard />} />
      <Route path="/goal-setup" element={<GoalSetup />} />
    </Routes>
  );
};

export default AppRoutes;