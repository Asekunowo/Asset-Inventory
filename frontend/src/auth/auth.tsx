import { useContext, createContext, useState, useEffect } from "react";
import { SERVER_URI as url } from "@/utils/secrets";

const AuthContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<any[] | null>(null);
  const storedData = JSON.parse(sessionStorage.getItem("user_data")!);
  const [isAuthenticated, setIsAuthenticated] = useState<null | Boolean>(
    storedData ? true : false
  );

  useEffect(() => {
    if (storedData) {
      const { user } = storedData;
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newData: []) => {
    sessionStorage.setItem(
      "user_data",
      JSON.stringify({
        user: newData,
      })
    );
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user_data");
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userData,
        url,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
