import "./App.css";
import { Box } from "@chakra-ui/react";
import LoginPage from "./pages/loginpage";

import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboardpage";
import Asset from "./components/asset";
import Dashboard from "./components/dashboard";
import Repairs from "./components/repairs";
import Rooterror from "./components/error/rooterror";

function App() {
  return (
    <Box minH={"100vh"} bg={"#2c3e50"} minW={"3xl"}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<DashboardPage />}
          errorElement={<Rooterror />}
        >
          <Route
            path="dashboard"
            element={<Dashboard />}
            errorElement={<Rooterror />}
          />
          <Route
            path="assets"
            element={<Asset />}
            errorElement={<Rooterror />}
          />
          <Route
            path="repairs"
            element={<Repairs />}
            errorElement={<Rooterror />}
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
