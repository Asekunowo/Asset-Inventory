import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";

import { FaHouseChimney } from "react-icons/fa6";
import { FaLaptop, FaTools } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <VStack
      bg={"#2c3e50"}
      minW={"270px"}
      w={"2/12"}
      minH={"100vh"}
      p={2}
      pt={10}
    >
      <Heading textTransform={"uppercase"}>IT INVENTORY</Heading>
      <VStack
        textAlign={"left"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        mt={10}
      >
        <Link to={"dashboard"}>
          <Button fontSize={16} variant={"ghost"}>
            <FaHouseChimney /> Dashboard
          </Button>
        </Link>
        <Link to={"assets"}>
          <Button fontSize={16} variant={"ghost"}>
            <FaLaptop /> Assets
          </Button>
        </Link>
        <Link to={"repairs"}>
          <Button fontSize={16} variant={"ghost"}>
            <FaTools /> Repairs
          </Button>
        </Link>
        <Link to={"settings"}>
          <Button fontSize={16} variant={"ghost"}>
            <IoMdSettings /> Settings
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};

export default Sidebar;
