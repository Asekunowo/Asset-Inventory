import { Button, EmptyState, VStack } from "@chakra-ui/react";
import { MdError } from "react-icons/md";

const Rooterror = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <VStack
          minH={"70vh"}
          spaceY={2}
          justifyContent={"center"}
          textAlign="center"
          scale={1.2}
        >
          <EmptyState.Indicator>
            <MdError />
          </EmptyState.Indicator>
          <EmptyState.Title>Error!</EmptyState.Title>
          <EmptyState.Description spaceY={4}>
            An unexpected error occured.
            <br />
            <Button onClick={() => window.location.reload()}>Try Again?</Button>
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default Rooterror;
