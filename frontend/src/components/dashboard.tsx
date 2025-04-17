"use client";

import { useAuth } from "@/utils/auth";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Spin from "./spinner";
import { useAssetStore, useRepairStore } from "@/store/store";

const Dashboard = () => {
  const { userData } = useAuth();
  const { fetchAssets, assets } = useAssetStore();
  const { fetchRepairs, repairs } = useRepairStore();
  const [load, SetLoad] = useState(true);

  useEffect(() => {
    const data = async () => {
      try {
        await fetchRepairs();
        await fetchAssets();
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

  return (
    <VStack textAlign={"left"} alignItems={"left"}>
      <VStack
        rounded={"md"}
        p={"1rem"}
        h={"max-content"}
        alignItems={"flex-start"}
        bg={"white"}
        mt={5}
      >
        <Heading
          shadow={"xs"}
          rounded={"md"}
          textTransform={"uppercase"}
          size={"2xl"}
          padding={"1rem"}
        >
          Dashboard
        </Heading>

        <VStack alignItems={"flex-start"} w={"full"} p={2} rounded={"md"}>
          <Text fontWeight={"bold"} textAlign={"left"}>
            Profile
          </Text>
          <Box as={"ul"} listStyleType={"none"}>
            <li>User: {userData.firstname + " " + userData.lastname}</li>
            <li>Role: {userData.role}</li>
            <li>Email: {userData.email}</li>
          </Box>
        </VStack>
      </VStack>
      <HStack mt={5} gap={"10rem"} justifyContent={"space-between"}>
        <Box
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          h={"max-content"}
          bg={"white"}
        >
          <Text fontWeight={"bold"}>Asset Report</Text>
          <Text>Total Assets: {assets.length} </Text>
        </Box>
        <Box
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          h={"max-content"}
          bg={"white"}
        >
          <Text fontWeight={"bold"}>Repairs Report</Text>
          <Text>Total Repairs: {repairs.length}</Text>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Dashboard;
