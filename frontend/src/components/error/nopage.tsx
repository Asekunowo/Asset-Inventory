import { Heading, VStack } from "@chakra-ui/react";

const Nopage = () => {
  return (
    <VStack minH={"70vh"} justifyContent={"center"}>
      <Heading>
        The page you are looking for has either been moved or does not exist.
      </Heading>
    </VStack>
  );
};

export default Nopage;
