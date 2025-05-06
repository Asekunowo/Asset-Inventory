import { useAuth } from "@/utils/auth";

const useLogout = () => {
  const { url, logout } = useAuth();
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
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      console.error(error);
      return { success: false, message: "An unexpected Error occurred" };
    }
  };
  return { logoutUser };
};

export default useLogout;
