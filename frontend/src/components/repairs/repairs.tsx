import { Box, Button, Flex, Heading, Loader, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRepairStore } from "@/store/store";
import { Outlet, Link, useLocation } from "react-router-dom";
import { BackArrow } from "@/store/icons";
import Sessionexpired from "../error/sessionexpired";
import { Toaster } from "../ui/toaster";
import Repairstable from "./repairstable";
import { filterRepairs } from "@/utils/functions";
import Unexpected from "../error/unexpected";
import { useAuth } from "@/auth/auth";
import { DEFAULT_REPAIR_DATA } from "@/types/definitions";
import { repairData } from "@/types/types";

import UpdateRepair from "./updaterepair";

const Repairs = () => {
  const { userData } = useAuth();
  const { addRepair, repairs, fetchRepairs, updateRepair, deleteRepair } =
    useRepairStore();
  const location = useLocation();

  const [load, SetLoad] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [editData, setEditData] = useState<repairData>(DEFAULT_REPAIR_DATA);

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
        const data = await fetchRepairs();
        if ("res" in data && data.res === 401) {
          setExpired(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        SetLoad(false);
      }
    };
    setTimeout(() => {
      data();
    }, 200);
  }, []);

  if (load) {
    return <Loader />;
  }

  if (error) {
    return <Unexpected error={error} />;
  }
  return (
    <VStack textAlign={"left"} alignItems={"left"}>
      {expired && <Sessionexpired />}
      <Toaster />
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
          <Heading
            float={"left"}
            size={"2xl"}
            padding={"1rem"}
            textTransform={"uppercase"}
            w={"full"}
            ml={-2}
          >
            Repairs
          </Heading>
          {!path.includes("new") && (
            <Flex
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mx={2}
            >
              <Button colorPalette={"blue"} variant={"solid"}>
                <Link to={"new"}>Add New Repair</Link>
              </Button>
              <UpdateRepair
                editData={editData}
                setEditData={setEditData}
                deleteRepair={deleteRepair}
                updateRepair={updateRepair}
              />
            </Flex>
          )}
          {path.includes("new") && (
            <Link to={"/repairs"}>
              <Button colorPalette={"gray"} variant={"surface"} rounded={"md"}>
                <BackArrow />
                Back
              </Button>
            </Link>
          )}

          {!path.includes("new") && (
            <Repairstable
              repairs={filterRepairs(repairs, search)}
              editData={editData}
              setEditData={setEditData}
              search={search}
              setSearch={setSearch}
            />
          )}

          <Outlet context={{ addRepair, userData, setExpired }} />
        </Box>
      </VStack>
    </VStack>
  );
};

export default Repairs;
