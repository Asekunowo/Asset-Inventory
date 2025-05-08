import Topbar from "@/components/reusable/topbar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Box
      rounded={"md"}
      minH={"100vh"}
      w={"full"}
      bg={"gray.200"}
      overflow={"clip"}
    >
      <Flex>
        {/* <Sidebar /> */}
        <Box w={"full"} p={"1.5rem"} color={"black"}>
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
