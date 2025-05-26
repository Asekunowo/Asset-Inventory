import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import Topbar from "./reusable/topbar";
import {
  IAsset,
  IDashboard,
  IRepair,
  ISettings,
  IMovement,
  ILogout,
  IRegister,
  IReport,
} from "@/store/icons";

import { Toaster, toaster } from "./ui/toaster";
import useLogout from "@/hooks/useLogout";
import Loader from "./ui/load";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = useLogout();
  const [load, setLoad] = useState<boolean>(false);
  const path = location.pathname;

  const links = [
    { link: "dashboard", title: "dashboard", icon: <IDashboard /> },
    { link: "assets", title: "assets", icon: <IAsset /> },
    { link: "repairs", title: "repairs", icon: <IRepair /> },
    { link: "movement", title: "Movement Form", icon: <IMovement /> },
    { link: "exit", title: "Exit Register", icon: <IRegister /> },
    { link: "settings", title: "settings", icon: <ISettings /> },
    { link: "reports", title: "reports", icon: <IReport /> },
  ];

  const handleLogOut = async () => {
    setLoad(true);
    try {
      const { success, message } = await logoutUser();

      success &&
        toaster.create({
          title: message,
          type: "info",
        });

      navigate("/login");
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "An error occured",
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    }
  };

  if (load) {
    return (
      <>
        <Toaster />
        <Loader />;
      </>
    );
  }

  return (
    <Box rounded={"md"} minH={"100vh"} w={"full"} bg={"gray.200"}>
      <Toaster />
      <Flex>
        <VStack
          bg={"#2c3e50"}
          minW={"270px"}
          w={"2/12"}
          minH={"100vh"}
          alignContent={"flex-start"}
          justifyContent={"flex-start"}
          p={2}
          pt={10}
          position={"relative"}
        >
          <Heading textTransform={"uppercase"} color={"white"}>
            IT ASSET INVENTORY
          </Heading>
          <Box className="mt-10" mt={10}>
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={`../${link.link}`}
                className={"block text-left m-10 "}
              >
                <Button
                  textTransform={"capitalize"}
                  minW={"7rem"}
                  w={"full"}
                  justifyContent={"flex-start"}
                  p={2}
                  mb={5}
                  bg={path.includes(link.link) ? "white" : "black"}
                  color={path.includes(link.link) ? "black" : "white"}
                  _hover={{ bg: "white", color: "black" }}
                >
                  {link.icon}
                  {link.title}
                </Button>
              </NavLink>
            ))}
            <div className={"block text-left m-10 "}>
              <Button
                colorPalette="black"
                variant={"surface"}
                minW={"7rem"}
                w={"full"}
                justifyContent={"flex-start"}
                onClick={handleLogOut}
              >
                <ILogout />
                Logout
              </Button>
            </div>
          </Box>
        </VStack>
        <Box w={"10/12"} p={"1.5rem"} color={"black"}>
          <Box rounded={"md"} p={"1rem"} h={"max-content"} bg={"white"}>
            <Topbar />
          </Box>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
