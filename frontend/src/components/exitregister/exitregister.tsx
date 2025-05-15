import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Spin from "../ui/spinner";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useExitRegisterStore } from "@/store/store";
import { ExitRegisterData } from "@/utils/types";
import Sessionexpired from "../error/sessionexpired";
import ExitRegisterTable from "./exitregistertable";
import { Link } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";

const ExitRegister = () => {
  const { fetchExits, exits } = useExitRegisterStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [expired, setExpired] = useState(false);
  const [search, setSearch] = useState<string>("");

  const location = useLocation();

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        // setLoading(true);
        const data = await fetchExits();
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

  const filterExits = (exits: ExitRegisterData[], searchTerm: string) => {
    if (!searchTerm) return exits;

    return exits.filter((exit) => {
      const searchFields = [
        exit.tag,
        exit.serial_no,
        exit.location,
        exit.name,
        exit.date_Of_Exit,
        exit.current_custodian,
        exit.supervisor,
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
              Exit Register
            </Heading>
          </HStack>
          {path.includes("new") && (
            <Link to={"/exit"}>
              <Button colorPalette={"gray"} variant={"surface"} rounded={"md"}>
                <IoCaretBack />
                Back
              </Button>
            </Link>
          )}
          {!path.includes("new") && (
            <Button colorPalette={"blue"} variant={"solid"}>
              <Link to={"new"}>Add New </Link>
            </Button>
          )}

          <Box>
            <Outlet />
          </Box>

          {!path.includes("new") && (
            <Box w={"full"}>
              <ExitRegisterTable
                setSearch={setSearch}
                exits={filterExits(exits, search)}
              />
            </Box>
          )}
        </Box>
      </VStack>
    </VStack>
  );
};

export default ExitRegister;
