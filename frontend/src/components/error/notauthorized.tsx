import { Text, VStack } from "@chakra-ui/react";
import { MdError } from "react-icons/md";

const Notauthorized = () => {
  return (
    <VStack
      minH={"50vh"}
      justifyContent={"center"}
      fontSize={"6xl"}
      color={"red.600"}
    >
      <MdError />
      <Text fontWeight={"bolder"}>
        You are not authorized to view this page!
      </Text>
    </VStack>
  );
};

export default Notauthorized;
