import { VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Unexpected = ({ error }: { error: boolean }) => {
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    let timer: any;

    if (error && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    if (count === 0) {
      window.location.reload();
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [error, count]);

  return (
    <VStack
      w={"full"}
      bg={"gray.400"}
      spaceX={4}
      align="center"
      justify="center"
      height="100vh"
    >
      <Text fontSize={"5xl"} color={"red.500"} fontWeight={"bold"}>
        Oops!
      </Text>
      <Text fontSize="3xl">An unexpected error occurred.</Text>
      <Text fontSize="lg">
        {count > 0
          ? `Retrying in ${count} second${count !== 1 ? "s" : ""}...`
          : "Reloading..."}
      </Text>
    </VStack>
  );
};

export default Unexpected;
