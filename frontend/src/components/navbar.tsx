import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container pt={2} maxW={"8xl"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Text
          fontSize={{ base: "26", sm: "28", lg: "32" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>IT ASSET INVENTORY</Link>
        </Text>

        <Button
          onClick={toggleColorMode}
          minW={"6.5rem"}
          placeItems={"center"}
          display={{ base: "block", md: "none" }}
        >
          {colorMode === "light" ? <IoMoon size={"20"} /> : <LuSun size="26" />}
        </Button>
      </Flex>
    </Container>
  );
};

export default Navbar;
