import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { LightMode } from "./components/ui/color-mode";
import { FullScreen } from "./store/icons";
import LoginPage from "./pages/loginpage";
import Asset from "./components/assets/asset";
import Dashboard from "./components/dashboard";
import Repairs from "./components/repairs/repairs";
import Rooterror from "./components/error/rooterror";
import Nopage from "./components/error/nopage";
import Settings from "./components/settings/settings";
import Passwordchange from "./components/settings/passwordchange";
import Newasset from "./components/assets/laptops/newlaptop";
import Sidebar from "./components/sidebar";
import Newrepair from "./components/repairs/newrepair";
import Newothers from "./components/assets/othersasets/newothers";
import Movement from "./components/movement/movement";
import MovementForm from "./components/movement/movementform";
import NewExit from "./components/exitregister/newexit";
import ExitRegister from "./components/exitregister/exitregister";
import Protected from "./auth/protected";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <LightMode>
      <Toaster />
      <Box display={{ base: "block", xl: "none" }}>
        <VStack minH={"90vh"} justifyContent={"center"} spaceY={10}>
          <Icon boxSize={"150px"} color={"white"} size={"2xl"}>
            <FullScreen />
          </Icon>
          <Text fontWeight={"bold"} fontSize={"4xl"} color={"white"}>
            This page can only be viewed on larger screens
          </Text>
        </VStack>
      </Box>
      <Box
        minH={"100vh"}
        bg={"#2c3e50"}
        minW={"3xl"}
        overflow={"hidden"}
        display={{ base: "none", xl: "block" }}
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
              path="movement"
              element={<Movement />}
              errorElement={<Rooterror />}
            >
              <Route
                path="form"
                element={<MovementForm />}
                errorElement={<Rooterror />}
              />
            </Route>
            <Route path="exit" element={<ExitRegister />}>
              <Route path="new" element={<NewExit />} />
            </Route>

            <Route
              path="settings"
              element={<Settings />}
              errorElement={<Rooterror />}
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
