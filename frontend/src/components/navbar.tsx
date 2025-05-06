import { Container, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container pt={2} px={4} bg={"whie"} rounded={"md"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to={"/"}>
          <Text
            fontSize={{ base: "26", sm: "28", lg: "2rem" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            // bgGradient={"linear(to-r, cyan.400, blue.500)"}
            // bgClip={"text"}
          >
            IT ASSET INVENTORY
          </Text>
        </Link>
      </Flex>
    </Container>
  );
};

export default Navbar;
