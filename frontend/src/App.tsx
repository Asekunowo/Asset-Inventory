import "./App.css";
import { Box, VStack } from "@chakra-ui/react";
import LoginPage from "./pages/loginpage";

import { Route, Routes } from "react-router-dom";
import Asset from "./components/asset";
import Dashboard from "./components/dashboard";
import Repairs from "./components/repairs";
import Rooterror from "./components/error/rooterror";
import Nopage from "./components/error/nopage";
import Settings from "./components/settings";
import Passwordchange from "./components/passwordchange";
import Protected from "./utils/protected";
import Newasset from "./components/newasset";
import { LightMode } from "./components/ui/color-mode";
import Sidebar from "./components/sidebar";
import Newrepair from "./components/newrepair";
import Newothers from "./components/newothers";

function App() {
  return (
    <LightMode>
      <VStack visibility={{ base: "visible", xl: "hidden" }}></VStack>
      <Box
        minH={"100vh"}
        bg={"#2c3e50"}
        minW={"3xl"}
        overflow={"hidden"}
        visibility={{ base: "hidden", xl: "visible" }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <Protected>
                <Sidebar />
              </Protected>
            }
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
            >
              <Route
                path="newlaptop"
                element={<Newasset />}
                errorElement={<Rooterror />}
              />
              <Route
                path="newothers"
                element={<Newothers />}
                errorElement={<Rooterror />}
              />
            </Route>
            <Route
              path="repairs"
              element={<Repairs />}
              errorElement={<Rooterror />}
            >
              <Route
                path="new"
                element={<Newrepair />}
                errorElement={<Rooterror />}
              />
            </Route>
            <Route
              path="settings"
              element={<Settings />}
              errorElement={<Nopage />}
            >
              <Route path="passwordchange" element={<Passwordchange />} />
            </Route>
          </Route>
          <Route path="*" element={<Nopage />} />
        </Routes>
      </Box>
    </LightMode>
  );
}

export default App;
