"use client";

import { useAuth } from "@/auth/auth";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Spin from "./spinner";
import Notauthorized from "./error/notauthorized";

const Dashboard = () => {
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
    }, 700);
  }, []);

  console.log(userData);

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
    <VStack textAlign={"left"} alignItems={"left"}>
      <Box>
        <Heading display={"block"} float={"left"} size={"2xl"} padding={"1rem"}>
          Dashboard
        </Heading>
      </Box>
      <Box rounded={"md"} p={"1rem"} h={"max-content"} bg={"white"}>
        <VStack float={"left"}>
          <Text fontWeight={"bold"} textAlign={"left"}>
            Profile
          </Text>
          <Box as={"ul"} listStyleType={"none"}>
            <li>User: {userData.firstname + " " + userData.lastname}</li>
            <li>Role: {userData.role}</li>
            <li>Email: {userData.email}</li>
          </Box>
        </VStack>
      </Box>
      <HStack mt={5} gap={"10rem"} justifyContent={"space-between"}>
        <Box
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          h={"max-content"}
          bg={"white"}
        >
          <Text fontWeight={"bold"}>Asset Report</Text>
          <Text>Total Assets: </Text>
        </Box>
        <Box
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          h={"max-content"}
          bg={"white"}
        >
          <Text fontWeight={"bold"}>Repairs Report</Text>
          <Text>Total Repairs: </Text>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Dashboard;
