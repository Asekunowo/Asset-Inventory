"use-client";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "./topbar";
import { RiDashboardFill } from "react-icons/ri";
import { FaLaptop, FaTools } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const Sidebar = () => {
  const [activePath, setActivePath] = useState<boolean>(true);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path.includes("dashboard")) {
      setActivePath(true);
    } else {
      setActivePath(false);
    }
  }, []);

  const links = [
    { link: "dashboard", icon: <RiDashboardFill /> },
    { link: "assets", icon: <FaLaptop /> },
    { link: "repairs", icon: <FaTools /> },
    { link: "settings", icon: <IoMdSettings /> },
  ];

  return (
    <Box rounded={"md"} minH={"100vh"} w={"full"} bg={"gray.200"}>
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
                  {link.link}
                </Button>
              </NavLink>
            ))}
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
