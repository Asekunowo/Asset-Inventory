import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Box rounded={"md"} minH={"100vh"} w={"full"} bg={"gray.200"}>
      <Flex>
        <Sidebar />
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

export default DashboardPage;
