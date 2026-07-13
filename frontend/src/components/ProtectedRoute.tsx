// Version 1

// import { useAuth } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }: any) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" />;

//   return children;
// };

// export default ProtectedRoute;


// Version 2

import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
const { user, isLoading } = useAuth();

if (isLoading) {
    return null;
    // Later we'll show a branded splash screen here.
}

if (!user) {
    return <Navigate to="/login" replace />;
}

return children;
};

export default ProtectedRoute;