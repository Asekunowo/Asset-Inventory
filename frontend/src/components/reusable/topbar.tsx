import { useAuth } from "@/utils/auth";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toaster, Toaster } from "../ui/toaster";
import { useState, useEffect } from "react";
import Spin from "../ui/spinner";
import { TbLogout2 } from "react-icons/tb";
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
          <Toaster />
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
      <Text textTransform={"uppercase"} fontWeight={"bold"}>
        {userData.firstname + " " + userData.lastname}{" "}
      </Text>
      <HStack gap={8}>
        <HStack></HStack>
        <Button
          colorPalette="black"
          variant={"surface"}
          w={"max-content"}
          onClick={handleLogOut}
        >
          <TbLogout2 />
          Logout
        </Button>
      </HStack>
    </HStack>
  );
};

export default Topbar;
