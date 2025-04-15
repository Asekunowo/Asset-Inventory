import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import Spin from "./spinner";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/auth";

const Settings = () => {
  const { userData, isAuthenticated } = useAuth();
  const [load, SetLoad] = useState(true);

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
      } catch (error) {
        console.log(error);
      } finally {
        SetLoad(false);
      }
    };

    setTimeout(() => {
      data();
    }, 700);
  }, []);

  if (load) {
    return (
      <VStack
        className="backdrop-brightness-50"
        position={"absolute"}
        left={0}
        top={2}
        h={"full"}
        minH={"100vh"}
        minW={"full"}
        justifyContent={"center"}
      >
        <div className="scale-150">
          <Spin />
        </div>
      </VStack>
    );
  }

  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <Box>
      <VStack textAlign={"left"} alignItems={"flex-start"}>
        <Heading
          display={"block"}
          textTransform={"uppercase"}
          float={"left"}
          size={"2xl"}
          padding={"1rem"}
        >
          Settings
        </Heading>
      </VStack>
      <VStack float={"left"}>
        <Link to={"passwordchange"}>
          <Button>Change your password</Button>
        </Link>
      </VStack>
      <VStack mt={20}>
        <Outlet context={[userData._id]} />
      </VStack>
    </Box>
  );
};

export default Settings;
