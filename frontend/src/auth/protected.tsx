import { Navigate } from "react-router-dom";

const Protected = ({ children }: any) => {
  const storedData = JSON.parse(sessionStorage.getItem("user_data")!);

  const token = storedData && storedData.user._id;

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
