import "./App.css";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import LoginPage from "./pages/loginpage";
import { Route, Routes } from "react-router-dom";
import Asset from "./components/laptops/asset";
import Dashboard from "./components/dashboard";
import Repairs from "./components/repairs/repairs";
import Rooterror from "./components/error/rooterror";
import Nopage from "./components/error/nopage";
import Settings from "./components/settings/settings";
import Passwordchange from "./components/settings/passwordchange";
import Protected from "./utils/protected";
import Newasset from "./components/laptops/newasset";
import { LightMode } from "./components/ui/color-mode";
import Sidebar from "./components/sidebar";
import Newrepair from "./components/repairs/newrepair";
import Newothers from "./components/othersasets/newothers";
import { BsArrowsFullscreen } from "react-icons/bs";
import Movement from "./components/movement/movement";
import MovementForm from "./components/movement/movementform";

function App() {
  return (
    <LightMode>
      <Box display={{ base: "block", xl: "none" }}>
        <VStack minH={"90vh"} justifyContent={"center"} spaceY={10}>
          <Icon boxSize={"150px"} color={"white"} size={"2xl"}>
            <BsArrowsFullscreen />
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
