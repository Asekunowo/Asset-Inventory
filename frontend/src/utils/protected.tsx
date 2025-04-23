import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();

const Protected = ({ children }: any) => {
  const token = cookies.get("jwt_authorization");

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
