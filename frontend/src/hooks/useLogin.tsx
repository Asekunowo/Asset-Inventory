import { useState } from "react";
import { useAuth } from "../auth/auth.tsx";

const useLogin = () => {
  const { login, url } = useAuth();
  const [error, setError] = useState<null | String>(null);
  const [loading, setLoading] = useState<null | Boolean>(null);

  const loginUser = async (values: any) => {
    if (!values) {
      return { success: false, message: "Please fill in all fields!" };
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res) {
        setError("Unable to communicate with erver");
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 200) {
        // message.success(data.message)

        login(data.token, data.user);

        return { success: data.success, message: data.message };
      } else if (res.status === 404) {
        setError(data.message);

        return { success: data.success, message: data.message };
      } else if (res.status === 401) {
        return { success: data.success, message: data.message };
      } else {
        return { success: data.success, message: "Login failed!" };
      }
    } catch (error: any) {
      setError(error.message);
      return { success: false, message: "Unable to communicate with server" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
