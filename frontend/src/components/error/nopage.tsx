import { Box, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { TbFaceIdError } from "react-icons/tb";
import Navbar from "../navbar";
import { DarkMode } from "../ui/color-mode";

const Nopage = () => {
  return (
    <Box>
      <DarkMode>
        <Navbar />
        <VStack
          minH={"70vh"}
          spaceY={"10"}
          justifyContent={"center"}
          mx={"auto"}
          p={4}
        >
          <Icon boxSize={"150px"} color={"gray.500"} fontSize={"4xl"}>
            <TbFaceIdError fontSize={"50px"} />
          </Icon>
          <VStack spaceY={10}>
            <Heading fontSize={"5xl"} color={"red.500"}>
              PAGE NOT FOUND
            </Heading>
            <Text fontWeight={"bold"}>
              The page you are looking for does not exist.
            </Text>
          </VStack>
        </VStack>
      </DarkMode>
    </Box>
  );
};

export default Nopage;
