import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/auth";
import { BackArrow } from "@/store/icons";
import { Tooltip } from "../ui/tooltip";
import Loader from "../ui/load";
import Sessionexpired from "../error/sessionexpired";
import { useAssetStore } from "@/store/store";
import Unexpected from "../error/unexpected";

const Settings = () => {
  const location = useLocation();

  const { userData } = useAuth();
  const { fetchAssets } = useAssetStore();

  const [load, SetLoad] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
        const data = await fetchAssets();
        if ("res" in data && data.res === 401) {
          setExpired(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        SetLoad(false);
      }
    };

    setTimeout(() => {
      data();
    }, 300);
  }, []);

  if (load) {
    return <Loader />;
  }

  if (error) {
    return <Unexpected error={error} />;
  }

  return (
    <Box bg={"white"} rounded={"md"} mt={5} minH={"80vh"} p={2}>
      {expired && <Sessionexpired />}
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
      {path.includes("pass") && (
        <Link to={"/settings"}>
          <Button ml={4} float={"left"}>
            <BackArrow /> Back
          </Button>
        </Link>
      )}
      {!path.includes("password") && (
        <HStack m={5} alignItems={"flex-start"}>
          <Link to={"passwordchange"}>
            <Button colorPalette={"gray"}>Change your password</Button>
          </Link>
          <Tooltip
            openDelay={200}
            content={"This feature is not available yet"}
          >
            <Button variant={"subtle"} disabled>
              Change your account
            </Button>
          </Tooltip>
        </HStack>
      )}
      <VStack mt={20}>
        <Outlet />
      </VStack>
    </Box>
  );
};

export default Settings;
