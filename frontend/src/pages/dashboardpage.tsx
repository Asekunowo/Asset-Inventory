import Sidebar from "@/components/sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Box rounded={"md"} minH={"100vh"} w={"full"} bg={"gray.200"}>
      <Flex>
        <Sidebar />
        <Box w={"10/12"} p={"1.5rem"} color={"black"}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardPage;
