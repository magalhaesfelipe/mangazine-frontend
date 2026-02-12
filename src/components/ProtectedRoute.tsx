import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  // '...rest' any additional props that may be passed to the 'ProtectedRoute' component are forwarded to the component being rendered

  <Component {...rest} />;
};

export default ProtectedRoute;
