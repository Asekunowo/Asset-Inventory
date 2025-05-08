import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Table,
  TableBody,
  TableColumnHeader,
  TableHeader,
  TableRow,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import Spin from "../ui/spinner";
import { useRepairStore } from "@/store/store";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { IoCaretBack, IoSearch } from "react-icons/io5";
import Sessionexpired from "../error/sessionexpired";
import { Toaster } from "../ui/toaster";

const Repairs = () => {
  const { userData } = useAuth();
  const [load, SetLoad] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { addRepair, repairs, fetchRepairs } = useRepairStore();

  const location = useLocation();

  const path = location.pathname;

  const filterRepairs = (repairs: any[], searchTerm: string) => {
    if (!searchTerm) return repairs;

    return repairs.filter((repair) => {
      const searchFields = [
        repair.vendor,
        repair.tag,
        repair.serial_no,
        repair.group,
        repair.branch,
        repair.createdAt,
      ];

      return searchFields.some((field) =>
        field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

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
        className="backdrop-brightness-25"
        position={"absolute"}
        top={0}
        left={0}
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
              <Field.Root w={"max-content"}>
                <HStack pos={"relative"} mr={5}>
                  <Input
                    minW={"14rem"}
                    p={2}
                    placeholder="Search"
                    variant={"flushed"}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Icon pos={"absolute"} right={0} size={"lg"}>
                    <IoSearch />
                  </Icon>
                </HStack>
              </Field.Root>
            </Flex>
          )}
          {path.includes("new") && (
            <Link to={"/repairs"}>
              <Button colorPalette={"gray"} variant={"surface"} rounded={"md"}>
                <IoCaretBack />
                Back
              </Button>
            </Link>
          )}
          {!path.includes("new") && (
            <Table.ScrollArea
              borderWidth="1px"
              maxW="9xl"
              colorPalette={"gray"}
            >
              <Table.Root
                borderRadius={"md"}
                stickyHeader
                variant={"outline"}
                showColumnBorder
              >
                <TableHeader>
                  <TableRow>
                    <TableColumnHeader minW={"13px"}>S/N</TableColumnHeader>
                    <TableColumnHeader>TYPE</TableColumnHeader>
                    <TableColumnHeader>TAG</TableColumnHeader>
                    <TableColumnHeader>SERIAL NO</TableColumnHeader>
                    <TableColumnHeader>VENDOR</TableColumnHeader>
                    <TableColumnHeader>FAULT</TableColumnHeader>
                    <TableColumnHeader>COST OF REPAIR</TableColumnHeader>

                    <TableColumnHeader>BANK</TableColumnHeader>
                    <TableColumnHeader textAlign={"end"}>
                      DATE ADDED
                    </TableColumnHeader>
                    <TableColumnHeader>CUSTODIAN</TableColumnHeader>
                  </TableRow>
                </TableHeader>
                <TableBody cursor={"text"}>
                  {filterRepairs(repairs, search).map(
                    (repair: any, index: number) => {
                      const repairDate = new Date(
                        repair.createdAt
                      ).toLocaleDateString();

                      return (
                        <TableRow key={index}>
                          <TableColumnHeader>{index + 1}</TableColumnHeader>
                          <TableColumnHeader>{repair.type}</TableColumnHeader>
                          <TableColumnHeader>{repair.tag}</TableColumnHeader>
                          <TableColumnHeader>
                            {repair.serial_no}
                          </TableColumnHeader>
                          <TableColumnHeader>{repair.vendor}</TableColumnHeader>
                          <TableColumnHeader>{repair.fault}</TableColumnHeader>
                          <TableColumnHeader>
                            {repair.costofrepair}
                          </TableColumnHeader>
                          <TableColumnHeader>{repair.bank}</TableColumnHeader>
                          <TableColumnHeader>{repairDate}</TableColumnHeader>
                          <TableColumnHeader
                            bg={"gray.300"}
                            fontWeight={"bold"}
                            color={"gray.500"}
                          >
                            {repair.custodian.firstname +
                              " " +
                              repair.custodian.lastname}
                          </TableColumnHeader>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table.Root>
            </Table.ScrollArea>
          )}

          <Outlet context={{ addRepair, userData }} />
        </Box>
      </VStack>
    </VStack>
  );
};

export default Repairs;
