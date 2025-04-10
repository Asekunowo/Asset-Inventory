import { VStack, Spinner } from "@chakra-ui/react";

const Spin = () => {
  return (
    <VStack>
      <Spinner
        color={"teal.500"}
        css={{ "--spinner-track-color": "colors.gray.200" }}
      />
    </VStack>
  );
};

export default Spin;
