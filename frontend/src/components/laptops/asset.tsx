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
  Text,
  SegmentGroup,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import Spin from "../ui/spinner";
import { useAssetStore, useOtherAssetStore } from "@/store/store";
import { MdImportantDevices } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoCaretBack, IoSearch } from "react-icons/io5";
import Sessionexpired from "../error/sessionexpired";
import Otherassets from "../othersasets/otherassets";
import { BsLaptop } from "react-icons/bs";
import Laptops from "./laptops";
import { Toaster } from "../ui/toaster";
import CustomSelect from "../reusable/customselect";
import { Searchby } from "@/store/data";

const Asset = () => {
  const { userData, isAuthenticated } = useAuth();
  const [load, SetLoad] = useState<boolean>(true);
  const [count, setCount] = useState<number>(10);
  const [error, setError] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const { addAsset, fetchAssets, assets } = useAssetStore();
  const { fetchOthers, others } = useOtherAssetStore();

  const [value, setValue] = useState<string | null>("laptop");

  const location = useLocation();

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
        // await fetchAssets();
        await fetchOthers();
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
  const [searchBy, setSearchBy] = useState<string>(Searchby[0]);

  const filterAssets = (assets: any[], searchTerm: string) => {
    if (!searchTerm) return assets;

    return assets.filter((asset) => {
      const searchFields = [
        asset.user,
        asset.tag,
        asset.serial_no,
        asset.model,
        asset.createdAt,
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
              <Box mr={5}>
                <CustomSelect
                  defaultValue="SEARCH BY"
                  onChange={(value) => setSearchBy(value)}
                  value={searchBy}
                  options={Searchby}
                />
              </Box>
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
          {!path.includes("new") && (
            <SegmentGroup.Root
              value={value}
              onValueChange={(e) => {
                setValue(e.value);
              }}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[
                  {
                    value: "laptop",
                    label: (
                      <HStack>
                        <BsLaptop />
                        Laptop
                      </HStack>
                    ),
                  },
                  {
                    value: "others",
                    label: (
                      <HStack>
                        <MdImportantDevices />
                        Other Assets
                      </HStack>
                    ),
                  },
                ]}
              />
            </SegmentGroup.Root>
          )}
          {!path.includes("/new") ? (
            value?.includes("laptop") ? (
              <Laptops laptops={filterAssets(assets, search)} />
            ) : (
              <Otherassets others={filterAssets(others, search)} />
            )
          ) : (
            <></>
          )}

          <Outlet context={{ addAsset, userData }} />
        </Box>
      </VStack>
    </VStack>
  );
};

export default Asset;
