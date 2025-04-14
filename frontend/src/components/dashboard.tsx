import { useAuth } from "@/auth/auth";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

const Dashboard = () => {
  const { userData } = useAuth();

  return (
    <VStack textAlign={"left"} alignItems={"left"}>
      <Box>
        <Heading display={"block"} float={"left"} size={"2xl"} padding={"1rem"}>
          Dashboard
        </Heading>
      </Box>
      <Box rounded={"md"} p={"1rem"} h={"max-content"} bg={"white"}>
        <VStack float={"left"}>
          <Text fontWeight={"bold"}>Profile</Text>
          <Box as={"ul"} listStyleType={"none"}>
            <li>User: {userData.firstname + "" + userData.lastname}</li>
            <li>Role: {userData.role} </li>
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
