import { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Box, Button, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { useExitRegisterStore } from "@/store/store";
import { BackArrow } from "@/store/icons";
import { filterExits } from "@/utils/functions";
import Loader from "../ui/load";
import Sessionexpired from "../error/sessionexpired";
import Unexpected from "../error/unexpected";
import ExitRegisterTable from "./exitregistertable";
import UpdateExitRegister from "./updatedexitregister";
import { ExitRegisterData } from "@/types/types";
import { DEFAULT_EXIT_DATA } from "@/types/definitions";

const ExitRegister = () => {
  const location = useLocation();

  const { fetchExits, exits, updateExit, deleteExit } = useExitRegisterStore();

  const [load, setLoad] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [editData, setEditData] = useState<ExitRegisterData>(DEFAULT_EXIT_DATA);

  const [search, setSearch] = useState<string>(""); //for search

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        const data = await fetchExits();
        if ("res" in data && data.res === 401) {
          setExpired(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoad(false);
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
    <Unexpected error={error} />;
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
              display={"block"}
              ml={-2}
            >
              Exit Register
            </Heading>
          </HStack>
          {path.includes("new") && (
            <Link to={"/exit"}>
              <Button colorPalette={"gray"} variant={"surface"} rounded={"md"}>
                <BackArrow />
                Back
              </Button>
            </Link>
          )}
          {!path.includes("new") && (
            <Flex justify={"space-between"}>
              <Button colorPalette={"blue"} variant={"solid"}>
                <Link to={"new"}>Add New </Link>
              </Button>
              <UpdateExitRegister
                editData={editData}
                setEditData={setEditData}
                updateExit={updateExit}
                deleteExit={deleteExit}
              />
            </Flex>
          )}

          <Box>
            <Outlet />
          </Box>

          {!path.includes("new") && (
            <Box w={"full"}>
              <ExitRegisterTable
                search={search}
                setSearch={setSearch}
                exits={filterExits(exits, search)}
                editData={editData}
                setEditData={setEditData}
              />
            </Box>
          )}
        </Box>
      </VStack>
    </VStack>
  );
};

export default ExitRegister;
