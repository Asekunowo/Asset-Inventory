import { useAuth } from "@/auth/auth";
import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toaster, Toaster } from "./ui/toaster";
import { useState, useEffect } from "react";
import Spin from "./spinner";
const Topbar = () => {
  const navigate = useNavigate();
  const { userData, logout, isAuthenticated } = useAuth();
  const [load, SetLoad] = useState(true);

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
    }, 700);
  }, []);

  const handleLogOut = async () => {
    await logout();
    toaster.create({
      title: "Logged Out",
      type: "info",
    });

    navigate("/login");
  };

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
    return <></>;
  }

  return (
    <HStack justifyContent={"space-between"}>
      <Toaster />
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        IT ASSET INVENTORY
      </Text>
      <HStack gap={8}>
        <HStack>
          <Text>Welcome </Text>
          <Avatar.Root size={"md"}>
            <Avatar.Fallback
              name={userData.firstname + " " + userData.lastname}
            />
            <Avatar.Image src="" />
          </Avatar.Root>
        </HStack>
        <Button
          colorPalette="gray"
          variant={"subtle"}
          w={"max-content"}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </HStack>
    </HStack>
  );
};

export default Topbar;
