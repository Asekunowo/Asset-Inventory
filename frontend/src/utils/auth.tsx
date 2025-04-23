import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext<any>(null);
// const url = 'https://product-store-back.onrender.com';
const url: String = "http://localhost:5000";
// const url: String = "https://bp8ntrs2-5000.uks1.devtunnels.ms";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<any[] | null>(null);
  const storedData = JSON.parse(sessionStorage.getItem("user_data")!);
  const [isAuthenticated, setIsAuthenticated] = useState<null | Boolean>(
    storedData ? true : false
  );

  const cookies = new Cookies();

  useEffect(() => {
    if (storedData) {
      const { user } = storedData;
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: String, newData: []) => {
    sessionStorage.setItem(
      "user_data",
      JSON.stringify({
        user: newData,
      })
    );

    cookies.set("jwt_authorization", newToken, {
      expires: new Date(Date.now() + 7200 * 1000), // 10 seconds for testings  });
    });
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user_data");
    setUserData(null);
    setIsAuthenticated(false);
    cookies.remove("jwt_authorization");
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
