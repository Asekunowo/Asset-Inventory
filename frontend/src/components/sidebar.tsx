import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";

import { FaHouseChimney } from "react-icons/fa6";
import { FaLaptop, FaTools } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <VStack bg={"#2c3e50"} w={"2/12"} minW={"2/12"} minH={"100vh"} p={2} pt={5}>
      <Heading textTransform={"uppercase"}>IT INVENTORY</Heading>
      <ButtonGroup mt={10}>
        <VStack textAlign={"left"} alignItems={"left"}>
          <Link to={"dashboard"}>
            <Button variant={"ghost"}>
              <FaHouseChimney /> Dashboard
            </Button>
          </Link>
          <Link to={"assets"}>
            <Button variant={"ghost"}>
              <FaLaptop /> Assets
            </Button>
          </Link>
          <Link to={"repairs"}>
            <Button variant={"ghost"}>
              <FaTools /> Repairs
            </Button>
          </Link>
          <Link to={"settings"}>
            <Button variant={"ghost"}>
              <IoMdSettings /> Settings
            </Button>
          </Link>
        </VStack>
      </ButtonGroup>
    </VStack>
  );
};

export default Sidebar;
