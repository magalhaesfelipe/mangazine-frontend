import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  // '...rest' any additional props that may be passed to the 'ProtectedRoute' component are forwarded to the component being rendered
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Component {...rest} /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
