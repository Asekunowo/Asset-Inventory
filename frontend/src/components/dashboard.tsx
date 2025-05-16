import { useEffect, useState } from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@/auth/auth";
import { useAssetStore, useRepairStore } from "@/store/store";
import Loader from "./ui/load";
import Sessionexpired from "./error/sessionexpired";
import Unexpected from "./error/unexpected";

const Dashboard = () => {
  const { userData } = useAuth();
  const { fetchAssets, assets } = useAssetStore();
  const { fetchRepairs, repairs } = useRepairStore();

  const [expired, setExpired] = useState<boolean>(false);
  const [load, SetLoad] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
        await fetchRepairs();
        const data = await fetchAssets();
        if ("res" in data && data.res === 401) {
          setExpired(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        SetLoad(false);
      }
    };

    setTimeout(() => {
      data();
    }, 700);
  }, []);

  if (load) {
    return <Loader />;
  }

  if (error) {
    return <Unexpected error={error} />;
  }

  return (
    <VStack textAlign={"left"} alignItems={"left"}>
      {expired && <Sessionexpired />}
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
            <li>
              User: {userData && userData.firstname + " " + userData.lastname}
            </li>
            <li>Role: {userData && userData.role}</li>
            <li>Email: {userData && userData.email}</li>
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
