import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  SegmentGroup,
  VStack,
} from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAssetStore, useOtherAssetStore } from "@/store/store";
import { Search, BackArrow, ILaptop, IAsset } from "@/store/icons";
import { useAuth } from "@/auth/auth";
import { filterAssets } from "@/utils/functions";
import Sessionexpired from "../error/sessionexpired";
import Otherassets from "./othersasets/otherassets";
import { Toaster } from "../ui/toaster";
import Unexpected from "../error/unexpected";
import Loader from "../ui/load";
import Laptops from "./laptops/laptops";

const Asset = () => {
  const location = useLocation();

  const { userData } = useAuth();
  const { fetchOthers, others } = useOtherAssetStore();
  const { addAsset, fetchAssets, assets } = useAssetStore();

  const [load, SetLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);

  const [search, setSearch] = useState<string>(""); //for search
  const [value, setValue] = useState<string>("laptop"); //for segment

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
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

  if (load) {
    return <Loader />;
  }

  if (error) {
    return <Unexpected error={error} />;
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
                    <Search />
                  </Icon>
                </HStack>
              </Field.Root>
            </Flex>
          )}
          {path.includes("new") && (
            <Link to={"/assets"}>
              <Button colorPalette={"gray"} variant={"surface"} rounded={"md"}>
                <BackArrow />
                Back
              </Button>
            </Link>
          )}
          {!path.includes("new") && (
            <SegmentGroup.Root
              value={value}
              onValueChange={(e) => {
                setValue(e.value!);
              }}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[
                  {
                    value: "laptop",
                    label: (
                      <HStack>
                        <ILaptop />
                        Laptop
                      </HStack>
                    ),
                  },
                  {
                    value: "others",
                    label: (
                      <HStack>
                        <IAsset />
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
