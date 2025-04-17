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
import { useAuth } from "@/utils/auth";
import { toaster, Toaster } from "./ui/toaster";
import Spin from "./spinner";
import {
  Bank,
  Branch,
  equipmentTypes,
  Fault,
  laptopModels,
} from "@/store/data";
import { useRepairStore } from "@/store/store";

type repairData = {
  type: string;
  model: string;
  tag: string;
  serial_no: string;
  branch: string;
  vendor: string;
  fault: string;
  cost_of_repair: string;
  bank: string;
};

const Repairs = () => {
  const { userData } = useAuth();
  const [load, SetLoad] = useState(true);
  const { addRepair } = useRepairStore();

  const [repairData, setRepairData] = useState<repairData>({
    type: "--TYPE--",
    model: "--MODEL--",
    tag: "",
    serial_no: "",
    branch: "--BRANCH--",
    vendor: "",
    fault: "--FAULT--",
    cost_of_repair: "",
    bank: "--BANK--",
  });

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
    }, 700);
  }, []);

  const handleAddRepair = async (pid: string) => {
    const { success, message } = await addRepair(pid, repairData);

    toaster.create({
      type: success ? "success" : "error",
      description: message,
    });

    success &&
      setRepairData({
        type: "--TYPE--",
        model: "--MODEL--",
        tag: "",
        serial_no: "",
        branch: "--BRANCH--",
        vendor: "",
        fault: "--FAULT--",
        cost_of_repair: "",
        bank: "--BANK--",
      });
  };

  const handleClear = () => {
    setRepairData({
      type: "--TYPE--",
      model: "--MODEL--",
      tag: "",
      serial_no: "",
      branch: "--BRANCH--",
      vendor: "",
      fault: "--FAULT--",
      cost_of_repair: "",
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
      <Box>
        <Toaster />
      </Box>
      <VStack
        rounded={"md"}
        w={"full"}
        p={"1rem"}
        spaceY={"2"}
        h={"max-content"}
        bg={"white"}
        pos={"relative"}
        placeItems={"flex-start"}
        textAlign={"left"}
        alignItems={"flex-start"}
        mt={5}
      >
        <Heading
          textTransform={"uppercase"}
          display={"block"}
          float={"left"}
          size={"2xl"}
          padding={"1rem"}
        >
          Repairs
        </Heading>
        <VStack
          rounded={"md"}
          p={"1rem"}
          outline={1}
          outlineColor={"black"}
          outlineStyle={"solid"}
          //   h={"max-content"}
          float={"left"}
          //   w={"full"}
        >
          <Text fontWeight={"bold"}>Add New Repair</Text>
        </VStack>
        <form className="p-5 grid grid-cols-2 gap-4 w-full h-full">
          <Input
            value={"SUBMITTED BY: " + userData.firstname}
            disabled
            textTransform={"uppercase"}
            fontWeight={"bold"}
            _disabled={{ bg: "gray.400" }}
          />
          <select
            value={repairData.type}
            onChange={(e) =>
              setRepairData({ ...repairData, type: e.target.value })
            }
            className="col-start- row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option
              className="disabled:text-gray-400"
              value="--TYPE--"
              disabled
            >
              --TYPE--
            </option>
            {equipmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={repairData.model}
            onChange={(e) =>
              setRepairData({ ...repairData, model: e.target.value })
            }
            className="col-start- row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option
              className="disabled:text-gray-400"
              value="--MODEL--"
              disabled
            >
              --MODEL--
            </option>
            {laptopModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <Input
            placeholder="Asset Tag"
            value={repairData.tag}
            onChange={(e) =>
              setRepairData({ ...repairData, tag: e.target.value })
            }
          />
          <Input
            placeholder="Serial No"
            value={repairData.serial_no}
            onChange={(e) =>
              setRepairData({ ...repairData, serial_no: e.target.value })
            }
          />
          <select
            onChange={(e) =>
              setRepairData({ ...repairData, branch: e.target.value })
            }
            value={repairData.branch}
            className="col-start- row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option
              className="disabled:text-gray-400"
              value="--BRANCH--"
              disabled
            >
              --BRANCH--
            </option>
            {Branch.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <Input
            placeholder="Vendor"
            value={repairData.vendor}
            onChange={(e) =>
              setRepairData({ ...repairData, vendor: e.target.value })
            }
          />

          <select
            value={repairData.fault}
            onChange={(e) =>
              setRepairData({ ...repairData, fault: e.target.value })
            }
            className="col-start- row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option
              className="disabled:text-gray-400"
              value="--FAULT--"
              disabled
            >
              --FAULT--
            </option>
            {Fault.map((fault) => (
              <option key={fault} value={fault}>
                {fault}
              </option>
            ))}
          </select>
          <Input
            placeholder="Cost of Repair"
            value={repairData.cost_of_repair}
            onChange={(e) =>
              setRepairData({ ...repairData, cost_of_repair: e.target.value })
            }
          />
          <select
            value={repairData.bank}
            onChange={(e) =>
              setRepairData({ ...repairData, bank: e.target.value })
            }
            className="col-start- row-start- w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option
              className="disabled:text-gray-400"
              value="--BANK--"
              disabled
            >
              --BANK--
            </option>
            {Bank.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </form>
        <HStack float={"right"}>
          <Button
            variant={"subtle"}
            colorPalette={"green"}
            onClick={() => handleAddRepair(userData._id)}
          >
            Submit
          </Button>
          <Button
            colorPalette={"red"}
            variant={"surface"}
            onClick={() => handleClear()}
          >
            Clear
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Repairs;
