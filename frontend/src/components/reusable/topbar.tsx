import { useAuth } from "@/auth/auth";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { Toaster } from "../ui/toaster";
import { useState, useEffect } from "react";
import Spin from "../ui/spinner";

import Timedate from "./timedate";
const Topbar = () => {
  const { userData, isAuthenticated } = useAuth();
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
    }, 300);
  }, []);

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
      <Text w={"max-content"} textTransform={"uppercase"} fontWeight={"bold"}>
        {userData.firstname + " " + userData.lastname}{" "}
      </Text>
      <HStack px={3} gap={5}>
        <Timedate />
      </HStack>
    </HStack>
  );
};

export default Topbar;
