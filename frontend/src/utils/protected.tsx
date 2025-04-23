import { useAuth } from "../utils/auth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }: any) => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
