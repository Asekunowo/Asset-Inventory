"use client";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Bank, Branch, laptopModels } from "@/store/data";
import { useAuth } from "@/utils/auth";
import Spin from "./spinner";
import { useAssetStore } from "@/store/store";
import { toaster, Toaster } from "./ui/toaster";

type Assets = {
  user: string;
  type: string;
  tag: string;
  serial_no: string;
  model: string;
  group: string;
  role: string;
  branch: string;
  bank: string;
};

const Asset = () => {
  const { userData } = useAuth();
  const [load, SetLoad] = useState<boolean>(true);
  const { addAsset, loading } = useAssetStore();

  useEffect(() => {
    const data = async () => {
      try {
        await userData;
      } catch (error) {
        console.log(error);
      } finally {
        SetLoad(false);
      }
    };

    setTimeout(() => {
      data();
    }, 1000);
  }, []);

  const [AssetData, setAssetData] = useState<Assets>({
    user: "",
    type: "Laptop",
    tag: "",
    serial_no: "",
    model: "--LAPTOP MODEL--",
    group: "",
    role: "",
    branch: "--BRANCH--",
    bank: "--BANK--",
  });

  const handleClear = () => {
    setAssetData({
      user: "",
      type: "Laptop",
      tag: "",
      serial_no: "",
      model: "--LAPTOP MODEL--",
      group: "",
      role: "",
      branch: "--BRANCH--",
      bank: "--BANK--",
    });
  };

  const handleAddAsset = async (pid: string) => {
    if (
      !AssetData.user &&
      !AssetData.tag &&
      !AssetData.serial_no &&
      !AssetData.model &&
      !AssetData.group &&
      !AssetData.role &&
      !AssetData.branch &&
      !AssetData.bank
    ) {
      toaster.create({
        type: "error",
        description: "Please fill in all fields",
      });
      return;
    }

    const { success, message } = await addAsset(pid, AssetData);
    // const success = true; // Simulate success for demonstration
    // const message = "Asset added successfully"; // Simulate success message

    setTimeout(() => {
      toaster.create({
        type: success ? "success" : "error",
        description: message,
      });
    }, 700);

    success &&
      setAssetData({
        user: "",
        type: "Laptop",
        tag: "",
        serial_no: "",
        model: "--LAPTOP MODEL--",
        group: "",
        role: "",
        branch: "--BRANCH--",
        bank: "--BANK--",
      });
  };

  if (load) {
    return (
      <VStack
        className="backdrop-brightness-50"
        position={"absolute"}
        left={0}
        top={2}
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
    <VStack textAlign={"left"} alignItems={"left"}>
      <Toaster />
      <VStack
        mt={10}
        gap={"10rem"}
        justifyContent={"space-between"}
        bg={"white"}
        rounded={"md"}
      >
        <VStack
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          spaceY={"2"}
          h={"max-content"}
          bg={"white"}
          pos={"relative"}
          placeItems={"flex-start"}
        >
          <Heading
            float={"left"}
            size={"2xl"}
            padding={"1rem"}
            textTransform={"uppercase"}
            ml={-2}
          >
            Assets
          </Heading>
          <Box
            rounded={"md"}
            p={"1rem"}
            outline={1}
            outlineColor={"black"}
            outlineStyle={"solid"}
            h={"max-content"}
            bg={"white"}
            mb={5}
          >
            <VStack float={"left"}>
              <Text fontWeight={"bold"}>Laptop Section</Text>
            </VStack>
          </Box>
          {/* Entry Form */}
          <form className="p-5 grid grid-cols-2 gap-6 w-full">
            <Input
              value={"SUBMITTED BY: " + userData.firstname}
              disabled
              textTransform={"uppercase"}
              fontWeight={"bold"}
              _disabled={{ bg: "gray.400" }}
            />
            <Input
              value={"TYPE: " + AssetData.type}
              disabled
              fontWeight={"bold"}
              textTransform={"uppercase"}
              _disabled={{ bg: "gray.400" }}
            />
            <Input
              placeholder="User"
              value={AssetData.user}
              onChange={(e) =>
                setAssetData({ ...AssetData, user: e.target.value })
              }
            />
            <Input
              placeholder="Asset Tag"
              value={AssetData.tag}
              onChange={(e) =>
                setAssetData({ ...AssetData, tag: e.target.value })
              }
            />
            <Input
              placeholder="Serial No"
              value={AssetData.serial_no}
              onChange={(e) =>
                setAssetData({ ...AssetData, serial_no: e.target.value })
              }
            />
            <select
              value={AssetData.model}
              onChange={(e) =>
                setAssetData({ ...AssetData, model: e.target.value })
              }
              className="col-start-  row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
            >
              <option
                disabled
                className="disabled:text-gray-400"
                value={"--LAPTOP MODEL--"}
              >
                --LAPTOP MODEL--
              </option>
              {laptopModels.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <Input
              placeholder="Group"
              value={AssetData.group}
              onChange={(e) =>
                setAssetData({ ...AssetData, group: e.target.value })
              }
            />
            <Input
              placeholder="Role"
              value={AssetData.role}
              onChange={(e) =>
                setAssetData({ ...AssetData, role: e.target.value })
              }
            />

            <select
              value={AssetData.bank}
              onChange={(e) =>
                setAssetData({ ...AssetData, bank: e.target.value })
              }
              className="col-start- row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
            >
              <option disabled className="" value={"--BANK--"}>
                --BANK--
              </option>
              {Bank.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>

            <select
              value={AssetData.branch}
              onChange={(e) =>
                setAssetData({ ...AssetData, branch: e.target.value })
              }
              className="col-start- row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
            >
              <option disabled className="" value={"--BRANCH--"}>
                --BRANCH--
              </option>
              {Branch.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <HStack float={"right"}>
              <Button
                variant={"subtle"}
                colorPalette={"green"}
                onClick={() => {
                  handleAddAsset(userData._id);
                }}
              >
                {loading ? <Spin /> : "Submit"}
              </Button>
              <Button
                colorPalette={"red"}
                variant={"surface"}
                onClick={() => handleClear()}
              >
                Clear
              </Button>
            </HStack>
          </form>
        </VStack>

        {/* OTHERS SECTION */}

        <VStack
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          spaceY={"2"}
          h={"max-content"}
          bg={"white"}
          pos={"relative"}
          placeItems={"flex-start"}
          display={"none"}
        >
          <Box
            rounded={"md"}
            p={"1rem"}
            outline={1}
            outlineColor={"black"}
            outlineStyle={"solid"}
            h={"max-content"}
            bg={"white"}
            mb={5}
          >
            <VStack float={"left"}>
              <Text fontWeight={"bold"}>Others Section</Text>
            </VStack>
          </Box>
          <select
            defaultValue={"LISD"}
            className="col-start-1 row-start-1 w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option disabled className="" value={"MODEL"}>
              --MODEL--
            </option>
            <option value={"HP"}>HP</option>
            <option value={"DELL"}>DELL</option>
          </select>
          <Input placeholder="Asset Tag" />
          <Input placeholder="Serial No" />
          <select className="col-start-1 row-start-1 w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 ">
            <option disabled className="" value={"LISD"}>
              --BRANCH--
            </option>
            {Branch.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <Input placeholder="Vendor" />

          <HStack float={"right"}>
            <Button variant={"outline"} colorScheme={"gray"}>
              Submit
            </Button>
            <Button colorPalette={"gray"}>Clear</Button>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Asset;
