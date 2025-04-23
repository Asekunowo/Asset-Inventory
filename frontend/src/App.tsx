import "./App.css";
import { Box } from "@chakra-ui/react";
import LoginPage from "./pages/loginpage";

import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboardpage";
import Asset from "./components/asset";
import Dashboard from "./components/dashboard";
import Repairs from "./components/repairs";
import Rooterror from "./components/error/rooterror";
import Nopage from "./components/error/nopage";
import Settings from "./components/settings";
import Passwordchange from "./components/passwordchange";
import Protected from "./utils/protected";
import { useEffect } from "react";
import { useAuth } from "./utils/auth";

function App() {
  const { logout } = useAuth();
  const updateExpireTime = () => {
    const expireTime: number = Date.now() + 3600000;

    localStorage.setItem("expireTime", JSON.stringify(expireTime));
  };

  const checkForInactivity = () => {
    const expireTime: number = JSON.parse(localStorage.getItem("expireTime")!);

    if (expireTime < Date.now()) {
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  });
  useEffect(() => {
    updateExpireTime();

    const events = ["click", "mousemove", "keydown", "scroll", "resize"];
    events.forEach((event) => {
      window.addEventListener(event, updateExpireTime);
    });

    // Cleanup event listeners on component unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateExpireTime);
      });
    };
  });

  return (
    <Box minH={"100vh"} bg={"#2c3e50"} minW={"3xl"}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <Protected>
              <DashboardPage />
            </Protected>
          }
          errorElement={<Rooterror />}
        >
          <Route
            path="dashboard"
            element={<Dashboard />}
            errorElement={<Rooterror />}
          />
          <Route path="assets" element={<Asset />} errorElement={<Rooterror />}>
            <Route
              path="new"
              element={<Asset />}
              errorElement={<Rooterror />}
            />
          </Route>
          <Route
            path="repairs"
            element={<Repairs />}
            errorElement={<Rooterror />}
          />
          <Route
            path="settings"
            element={<Settings />}
            errorElement={<Nopage />}
          >
            <Route path="passwordchange" element={<Passwordchange />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
