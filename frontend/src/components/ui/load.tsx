import { VStack } from "@chakra-ui/react";
import Spin from "./spinner";

const Loader = () => {
  return (
    <VStack
      className="backdrop-brightness-25"
      position={"absolute"}
      top={0}
      left={0}
      minH={"100vh"}
      minW={"full"}
      justifyContent={"center"}
    >
      <div className="scale-150">
        <Spin />
      </div>
    </VStack>
  );
};

export default Loader;
