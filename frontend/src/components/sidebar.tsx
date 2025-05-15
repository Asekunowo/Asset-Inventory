"use-client";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Topbar from "./reusable/topbar";
import { RiDashboardFill } from "react-icons/ri";
import { FaLaptop, FaTools } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/auth";
import { Toaster, toaster } from "./ui/toaster";
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const path = location.pathname;

  const links = [
    { link: "dashboard", title: "dashboard", icon: <RiDashboardFill /> },
    { link: "assets", title: "assets", icon: <FaLaptop /> },
    { link: "repairs", title: "repairs", icon: <FaTools /> },
    { link: "movement", title: "Movement Form", icon: <FaTruck /> },
    { link: "exit", title: "Exit Register", icon: <IoLogOut /> },
    { link: "settings", title: "settings", icon: <IoMdSettings /> },
  ];

  const handleLogOut = async () => {
    await logout();
    toaster.create({
      title: "Logged Out",
      type: "info",
    });

    navigate("/login");
  };

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
                <TbLogout2 />
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
