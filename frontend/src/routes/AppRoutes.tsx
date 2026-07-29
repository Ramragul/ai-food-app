// Version 1 : Working Version

// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import ProtectedRoute from "../components/ProtectedRoute";

// // Pages
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
// import ProfilePage from "../pages/ProfilePage";


// import ContactUsPage from "../pages/ContactUsPage";
// import TermsConditionsPage from "../pages/TermsConditionsPage";
// import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
// import DeleteAccount from "../pages/DeleteAccount";
// import BMICalculator from "../pages/BMICalculator";
// import MealPlanDetailPage from "../pages/MealPlanDetailPage";
// import MealPlanPage from "../pages/MealPlanPage";
// import FitnessPage from "../pages/fitness/FitnessPage";
// import FitnessCategoryPage from "../pages/fitness/FitnessCategoryPage";
// import FitnessGuideDetailPage from "../pages/fitness/FitnessGuideDetailPage";
// import LegalPage from "../pages/LegalPage";
// import NutritonSearch from "../pages/NutritionSearch";






// const AppRoutes: React.FC = () => {
//   const { user } = useAuth();

//   return (
//     <Routes>

//       {/* 🔓 PUBLIC */}
//       <Route
//         path="/"
//         element={user ? <Navigate to="/home" /> : <AuthPage />}
//       />
//       <Route path="/login" element={<Navigate to="/" />} />

       

   

//       {/* 🔐 PROTECTED + LAYOUT (ONE WRAPPER 💎) */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <AppLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/meals" element={<Home />} />
//         <Route path="/recipe" element={<RecipeDetail />} />
//         <Route path="/chef/orders" element={<ChefOrders />} />
//         <Route path="/results" element={<MealResultsPage />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/order-success" element={<OrderSuccess />} />
//         <Route path="/track-meal1" element={<TrackMealPage />} />
//         <Route path="/add-meal" element={<AddMeal />} />
//         <Route path="/home" element={<Dashboard />} />
//         <Route path="/goal-setup" element={<GoalSetup />} />

//         <Route path="/meal-plan" element={<MealPlanPage />} />
//         <Route path="/meal-plan/:id" element={<MealPlanDetailPage />} />

//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/bmi-calculator" element={<BMICalculator />} />

//            <Route path="/contactus" element={<ContactUsPage />} />
//         <Route path="/tc" element={<TermsConditionsPage/>} />
//         <Route path="/privacy" element={<PrivacyPolicyPage />} />
//         <Route path="/legal" element={<LegalPage />} />
//         <Route path="/delete-account" element={<DeleteAccount/>} />


//         <Route path="/fitness" element={<FitnessPage />} />
//         <Route path="/fitness/:category" element={ <FitnessCategoryPage />}/>
//         <Route path="/fitness/guide/:id" element={<FitnessGuideDetailPage />}/>

//         <Route path="/nutrition" element={<NutritonSearch />} />

       
      
//       </Route>

//       {/* 🔥 FALLBACK */}
//       <Route path="*" element={<Navigate to="/" />} />

//     </Routes>
//   );
// };

// export default AppRoutes;


// Version 2 : Updated Version 1

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


import ContactUsPage from "../pages/ContactUsPage";
import TermsConditionsPage from "../pages/TermsConditionsPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import DeleteAccount from "../pages/DeleteAccount";
import BMICalculator from "../pages/BMICalculator";
import MealPlanDetailPage from "../pages/MealPlanDetailPage";
import MealPlanPage from "../pages/MealPlanPage";
import FitnessPage from "../pages/fitness/FitnessPage";
import FitnessCategoryPage from "../pages/fitness/FitnessCategoryPage";
import FitnessGuideDetailPage from "../pages/fitness/FitnessGuideDetailPage";
import LegalPage from "../pages/LegalPage";
import NutritonSearch from "../pages/NutritionSearch";

import WorkspaceLayout from "../Components/Layout/WorkspaceLayout";
import DashboardPage from "../pages/Workspace/DashboardPage";
import EmployeesPage from "../pages/Workspace/EmployeePage";
import ClientsPage from "../pages/Workspace/ClientsPage";
import AssignmentsPage from "../pages/Workspace/AssignmentsPage";
import InvitationsPage from "../pages/Workspace/InvitationsPage";
import ClientDetailsPage from "../pages/Workspace/ClientDetailsPage";
import MyClientPage from "../pages/staff/MyClientPage";
import StaffDashboardPage from "../pages/Staff/StaffDashboardPage";
import StaffLayout from "../components/StaffUI/StaffLayout";
import StaffClientsPage from "../pages/Staff/StaffClientsPage";
import ClientInvitationsPage from "../pages/Client/ClientInvitationsPage";






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
{/* 
        <Route
    path="/workspace"
    element={<DashboardPage />}
  /> */}

       

   

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

        <Route path="/meal-plan" element={<MealPlanPage />} />
        <Route path="/meal-plan/:id" element={<MealPlanDetailPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />

           <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/tc" element={<TermsConditionsPage/>} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/delete-account" element={<DeleteAccount/>} />


        <Route path="/fitness" element={<FitnessPage />} />
        <Route path="/fitness/:category" element={ <FitnessCategoryPage />}/>
        <Route path="/fitness/guide/:id" element={<FitnessGuideDetailPage />}/>

        <Route path="/nutrition" element={<NutritonSearch />} />

 <Route
    path="/invitations"
    element={<ClientInvitationsPage />}
/>

       
      
      </Route>


      <Route
  element={
    <ProtectedRoute>
      <WorkspaceLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="/workspace"
    element={<DashboardPage />}
  />

   <Route
    path="/workspace/employees"
    element={<EmployeesPage />}
  />
  

  <Route
    path="/workspace/clients"
    element={<ClientsPage />}
  />

  <Route
    path="/workspace/clients/:memberId"
    element={<ClientDetailsPage />}
  />

  <Route
    path="/workspace/assignments"
    element={<AssignmentsPage />}
  />

  <Route
    path="/workspace/invitations"
    element={<InvitationsPage />}
  />
{/* 
    <Route
    path="/staff"
    element={<StaffDashboardPage />}
  /> */}

  {/* <Route
    path="/staff/clients/:memberId"
    element={<MyClientPage />}
/> */}


{/*
  <Route
    path="/workspace/coach"
    element={<CoachDashboardPage />}
  /> */}
</Route>



<Route
    path="/staff"
    element={<StaffLayout />}
>

    <Route
        index
        element={<StaffDashboardPage />}
    />

    <Route
        path="clients"
        element={<StaffClientsPage />}
    />

    <Route
        path="clients/:memberId"
        element={<MyClientPage />}
    />

    {/* <Route
        path="goals"
        element={<GoalsPage />}
    />

    <Route
        path="notes"
        element={<NotesPage />}
    />

    <Route
        path="reports"
        element={<ReportsPage />}
    /> */}

    <Route
        path="profile"
        element={<ProfilePage />}
    />

</Route>

      {/* 🔥 FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};

export default AppRoutes;