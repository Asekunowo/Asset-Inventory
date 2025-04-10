import { Button, HStack, Text } from "@chakra-ui/react";

const Topbar = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        IT ASSET INVENTORY
      </Text>
      <HStack gap={8}>
        <Text>Welcome Admin</Text>
        <Button colorPalette="gray" variant={"subtle"} w={"max-content"}>
          Logout
        </Button>
      </HStack>
    </HStack>
  );
};

export default Topbar;
