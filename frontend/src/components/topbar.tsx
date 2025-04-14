import { useAuth } from "@/auth/auth";
import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();

  const handleLogOut = () => {
    navigate("/login");
  };
  return (
    <HStack justifyContent={"space-between"}>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        IT ASSET INVENTORY
      </Text>
      <HStack gap={8}>
        <HStack>
          <Text>Welcome </Text>
          <Avatar.Root size={"md"}>
            <Avatar.Fallback
              name={userData.firstname + " " + userData.lastname}
            />
            <Avatar.Image src="" />
          </Avatar.Root>
        </HStack>
        <Button
          colorPalette="gray"
          variant={"subtle"}
          w={"max-content"}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </HStack>
    </HStack>
  );
};

export default Topbar;
