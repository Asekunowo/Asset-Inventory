import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useMovementStore } from "@/store/store";
import { filterMovements, handlePrint } from "@/utils/functions";
import Loader from "../ui/load";
import Sessionexpired from "../error/sessionexpired";
import NewMovement from "./newmovement";
import MovementsTable from "./movementstable";
import Unexpected from "../error/unexpected";

const Movement = () => {
  const location = useLocation();
  const { fetchMovements, movements } = useMovementStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        const data = await fetchMovements();
        if ("res" in data && data.res === 401) {
          setExpired(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      data();
    }, 300);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Unexpected error={error} />;
  }

  return (
    <VStack
      id="print"
      textAlign={"left"}
      alignItems={"left"}
      overflow={"hidden"}
    >
      {expired && <Sessionexpired />}
      <VStack
        mt={10}
        gap={"10rem"}
        justifyContent={"space-between"}
        bg={"white"}
        rounded={"md"}
        minH={"100vh"}
      >
        <Box
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          spaceY={"4"}
          bg={"white"}
          pos={"relative"}
        >
          <HStack>
            <Heading
              float={"left"}
              size={"2xl"}
              padding={"1rem"}
              textTransform={"uppercase"}
              // w={"full"}
              display={"block"}
              ml={-2}
            >
              Movement Register
            </Heading>
          </HStack>

          <Box>
            <Outlet context={{ loading, setLoading }} />
          </Box>

          {!path.includes("form") && (
            <NewMovement loading={loading} setLoading={setLoading} />
          )}
          {!path.includes("form") && (
            <Box w={"full"}>
              <MovementsTable
                setSearch={setSearch}
                movements={filterMovements(movements, search)}
                handlePrint={handlePrint}
              />
            </Box>
          )}
        </Box>
      </VStack>
    </VStack>
  );
};

export default Movement;
