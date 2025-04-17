"use client";
import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import Spin from "./spinner";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/auth";
import Notauthorized from "./error/notauthorized";
import { useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";

const Settings = () => {
  const { userData, isAuthenticated } = useAuth();
  const [load, SetLoad] = useState(true);
  const [path, setPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
      } catch (error) {
        console.log(error);
      } finally {
        SetLoad(false);
      }
    };

    setTimeout(() => {
      data();
    }, 500);
  }, []);

  useEffect(() => {
    const l_path = location.pathname;
    setPath(l_path);
  }, [location.pathname]);

  if (load) {
    return (
      <VStack
        className="backdrop-brightness-50"
        position={"absolute"}
        left={0}
        top={2}
        h={"full"}
        minH={"100vh"}
        minW={"full"}
        justifyContent={"center"}
      >
        <div className="scale-150">
          <Spin />
        </div>
      </VStack>
    );
  }

  if (!isAuthenticated) {
    return (
      <VStack
        className="backdrop-brightness-50"
        position={"absolute"}
        left={0}
        top={2}
        h={"full"}
        minH={"100vh"}
        minW={"full"}
        bg={"blue.900"}
        justifyContent={"center"}
      >
        <Notauthorized />;
      </VStack>
    );
  }
  return (
    <Box bg={"white"} rounded={"md"} mt={5} minH={"80vh"} p={2}>
      <VStack textAlign={"left"} alignItems={"flex-start"}>
        <Heading
          display={"block"}
          textTransform={"uppercase"}
          float={"left"}
          size={"2xl"}
          padding={"1rem"}
        >
          Settings
        </Heading>
      </VStack>
      {path.includes("pass") && (
        <Link to={"/settings"}>
          <Button ml={4} float={"left"}>
            <FaChevronLeft /> Back
          </Button>
        </Link>
      )}
      <HStack m={5} alignItems={"flex-start"}>
        {!path.includes("password") && (
          <Link to={"passwordchange"}>
            <Button variant={"subtle"}>Change your password</Button>
          </Link>
        )}
        <Tooltip openDelay={500} content={"This feature is not available yet"}>
          <Button variant={"subtle"} disabled>
            Change your account
          </Button>
        </Tooltip>
      </HStack>
      <VStack mt={20}>
        <Outlet context={[userData._id]} />
      </VStack>
    </Box>
  );
};

export default Settings;
