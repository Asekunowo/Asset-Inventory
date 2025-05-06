"use client";
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
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import Spin from "./spinner";
import { useAssetStore } from "@/store/store";

import { Link, Outlet, useLocation } from "react-router-dom";
import { IoCaretBack, IoSearch } from "react-icons/io5";
import Sessionexpired from "./error/sessionexpired";

const Asset = () => {
  const { userData, isAuthenticated } = useAuth();
  const [load, SetLoad] = useState<boolean>(true);
  const [count, setCount] = useState<number>(10);
  const [error, setError] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const { addAsset, fetchAssets, assets } = useAssetStore();

  const location = useLocation();

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
        // await fetchAssets();
        const data = await fetchAssets();
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
    }, 1000);
  }, []);

  useEffect(() => {
    let timer: number;

    if (error && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    if (count === 0) {
      window.location.reload();
    }

    // Cleanup function to clear interval
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [error, count]);

  const [search, setSearch] = useState<string>("");

  const filterAssets = (assets: any[], searchTerm: string) => {
    if (!searchTerm) return assets;

    return assets.filter((asset) => {
      const searchFields = [
        asset.user,
        asset.tag,
        asset.serial_no,
        asset.model,
        asset.group,
        asset.branch,
      ];

      return searchFields.some((field) =>
        field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  if (load) {
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

  if (!isAuthenticated) {
    window.location.replace("../login");
    return;
  }

  if (error) {
    return (
      <VStack
        w={"full"}
        bg={"gray.400"}
        spaceX={4}
        align="center"
        justify="center"
        height="100vh"
      >
        <Text fontSize="3xl">An unexpected error occurred.</Text>
        <Text fontSize="lg">
          {count > 0
            ? `Retrying in ${count} second${count !== 1 ? "s" : ""}...`
            : "Reloading..."}
        </Text>
      </VStack>
    );
  }

  return (
    <VStack textAlign={"left"} alignItems={"left"} overflow={"hidden"}>
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
          // placeItems={"flex-start"}
        >
          <Heading
            float={"left"}
            size={"2xl"}
            padding={"1rem"}
            textTransform={"uppercase"}
            w={"full"}
            ml={-2}
          >
            Assets
          </Heading>

          {!path.includes("new") && (
            <Flex
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mx={2}
            >
              <Button colorPalette={"blue"} variant={"solid"}>
                <Link to={"newlaptop"}>Add New Laptop</Link>
              </Button>
              <Button
                ml={"1rem"}
                mr={"auto"}
                colorPalette={"gray"}
                variant={"solid"}
              >
                <Link to={"newothers"}>Add New Other Asset</Link>
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
            <Link to={"/assets"}>
              <Button colorPalette={"gray"} variant={"surface"} rounded={"md"}>
                <IoCaretBack />
                Back
              </Button>
            </Link>
          )}
          {!path.includes("/new") && (
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
                    <TableColumnHeader maxW={"10px"}>S/N</TableColumnHeader>
                    <TableColumnHeader w={"12rem"}>USER</TableColumnHeader>
                    <TableColumnHeader>TYPE</TableColumnHeader>
                    <TableColumnHeader>TAG</TableColumnHeader>
                    <TableColumnHeader>SERIAL NO</TableColumnHeader>
                    <TableColumnHeader>MODEL</TableColumnHeader>
                    <TableColumnHeader>GROUP</TableColumnHeader>

                    <TableColumnHeader textAlign={"end"}>
                      BRANCH
                    </TableColumnHeader>
                    <TableColumnHeader>DATE</TableColumnHeader>
                    <TableColumnHeader>CUSTODIAN</TableColumnHeader>
                  </TableRow>
                </TableHeader>
                <TableBody cursor={"text"}>
                  {filterAssets(assets, search).map(
                    (asset: any, index: number) => {
                      const recordDate = new Date(
                        asset.createdAt
                      ).toDateString();
                      return (
                        <TableRow key={index}>
                          <TableColumnHeader>{index + 1}</TableColumnHeader>
                          <TableColumnHeader>{asset.user}</TableColumnHeader>
                          <TableColumnHeader>{asset.type}</TableColumnHeader>
                          <TableColumnHeader>{asset.tag}</TableColumnHeader>
                          <TableColumnHeader>
                            {asset.serial_no}
                          </TableColumnHeader>
                          <TableColumnHeader>{asset.model}</TableColumnHeader>
                          <TableColumnHeader>{asset.group}</TableColumnHeader>
                          <TableColumnHeader textAlign={"end"}>
                            {asset.branch}
                          </TableColumnHeader>
                          <TableColumnHeader>{recordDate}</TableColumnHeader>
                          <TableColumnHeader>
                            {asset.custodian.firstname +
                              " " +
                              asset.custodian.lastname}
                          </TableColumnHeader>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table.Root>
            </Table.ScrollArea>
          )}

          <Outlet context={{ addAsset, userData }} />
        </Box>
      </VStack>
    </VStack>
  );
};

export default Asset;
