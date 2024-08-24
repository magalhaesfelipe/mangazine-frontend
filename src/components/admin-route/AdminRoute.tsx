import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";

const AdminRoute = ({ element: Element, ...rest }) => {
  const { userId } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure that 'userId' is available from 'useAuth()' when the component mounts
    if (userId) {
      console.log(userId);

      // Fetch user role
      Axios.get(`http://localhost:2000/api/v1/user/get-role/${userId}`)
        .then((response) => {
          setRole(response.data.userRole);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Loading state while fetching role
  }

  return role === "admin" ? <Element {...rest} /> : <Navigate to="/home" />;
};
export default AdminRoute;
