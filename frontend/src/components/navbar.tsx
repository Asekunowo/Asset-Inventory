import { Link } from "react-router-dom";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { IDashboard } from "@/store/icons";

const Navbar = () => {
  return (
    <Container pt={2} px={4} bg={"whie"} rounded={"md"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to={"/dashboard"}>
          <Text
            fontSize={{ base: "26", sm: "28", lg: "2rem" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            IT ASSET INVENTORY
          </Text>
        </Link>
        <Link to={"/dashboard"}>
          <Button>
            <IDashboard />
            Go to Dashboard
          </Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default Navbar;
