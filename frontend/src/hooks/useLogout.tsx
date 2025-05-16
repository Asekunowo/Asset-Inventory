import { useAuth } from "@/auth/auth";
import { SERVER_URI as url } from "@/utils/secrets";

const useLogout = () => {
  const { logout } = useAuth();
  const logoutUser = async () => {
    try {
      const res = await fetch(`${url}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res) {
        return {
          success: false,
          message: "Unable to communicate with the server",
        };
      }

      const data = await res.json();

      if (res.status === 200) {
        logout();
        return { success: data.success, message: data.message };
      }

      return { success: false, message: "Server Error" };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: "An unexpected Error occurred" };
    }
  };
  return { logoutUser };
};

export default useLogout;
