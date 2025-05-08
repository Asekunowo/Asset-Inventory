import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Spin from "../ui/spinner";
import { Outlet } from "react-router-dom";
import { useMovementStore } from "@/store/store";
import { useLocation } from "react-router-dom";
import { movementData } from "@/utils/types";
import NewExit from "./newmovement";
import Sessionexpired from "../error/sessionexpired";
import ExitsTable from "./movementstable";

const Movement = () => {
  const { fetchMovements, movements } = useMovementStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [expired, setExpired] = useState(false);
  const [search, setSearch] = useState<string>("");

  const location = useLocation();

  const path = location.pathname;

  const handlePrint = (movement: movementData) => {
    sessionStorage.setItem("movement", JSON.stringify(movement));
    return;
  };

  useEffect(() => {
    const data = async () => {
      try {
        // setLoading(true);
        const data = await fetchMovements();
        if ("res" in data && data.res === 401) {
          setExpired(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      data();
    }, 1500);
  }, []);

  const filterExits = (movements: movementData[], searchTerm: string) => {
    if (!searchTerm) return movements;

    return movements.filter((movement) => {
      const searchFields = [
        movement.tag,
        movement.serial_no,
        movement.to_location,
        movement.recipient,
      ];

      return searchFields.some((field) =>
        field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  if (loading) {
    return (
      <VStack
        className="backdrop-brightness-25"
        position={"absolute"}
        left={0}
        top={0}
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
            <NewExit loading={loading} setLoading={setLoading} />
          )}
          {!path.includes("form") && (
            <Box w={"full"}>
              <ExitsTable
                setSearch={setSearch}
                movements={filterExits(movements, search)}
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
