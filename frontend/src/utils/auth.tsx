import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);
// const url = 'https://product-store-back.onrender.com';
const url: String = "http://localhost:5000";
// const url: String = "https://bp8ntrs2-5000.uks1.devtunnels.ms";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<null | String>(null);
  const [userData, setUserData] = useState<any[] | null>(null);
  const storedData = JSON.parse(sessionStorage.getItem("user_data")!);
  const [isAuthenticated, setIsAuthenticated] = useState<null | Boolean>(
    storedData ? true : false
  );

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setUserData(user);
      setToken(userToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: String, newData: []) => {
    sessionStorage.setItem(
      "user_data",
      JSON.stringify({
        userToken: newToken,
        user: newData,
      })
    );

    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user_data");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
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
