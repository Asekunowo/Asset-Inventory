import "./App.css";
import { Box } from "@chakra-ui/react";
import LoginPage from "./pages/loginpage";

import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboardpage";
import Asset from "./components/asset";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Box minH={"100vh"} bg={"#2c3e50"}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/view" element={<DashboardPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assets" element={<Asset />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
