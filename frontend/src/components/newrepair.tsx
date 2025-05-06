import { useState } from "react";
import { Box, Text, Input, Button, HStack } from "@chakra-ui/react";
import {
  Bank,
  Branch,
  equipmentTypes,
  Fault,
  laptopModels,
  Vendors,
} from "@/store/data";
import CustomSelect from "./customselect";
import { toaster, Toaster } from "./ui/toaster";
import { useOutletContext } from "react-router-dom";
import Spin from "./spinner";

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

type OutletContextType = {
  userData: { firstname: string; lastname: string };
  addRepair: any;
};

const Newrepair = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [repairData, setRepairData] = useState<repairData>({
    type: "",
    model: "",
    tag: "",
    serial_no: "",
    branch: "",
    vendor: "",
    fault: "",
    cost_of_repair: "",
    bank: "",
  });

  const { userData, addRepair } = useOutletContext<OutletContextType>();

  const validateForm = () => {
    const requiredFields: (keyof repairData)[] = [
      "type",
      "model",
      "tag",
      "serial_no",
      "branch",
      "vendor",
      "fault",
      "cost_of_repair",
      "bank",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !repairData[field] || repairData[field].includes("--")
    );

    if (emptyFields.length > 0) {
      toaster.create({
        type: "error",
        title: "Required fields are empty",
        description: `Please fill in: ${emptyFields.join(", ")}`,
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  const handleAddRepair = async () => {
    try {
      setLoading(true);

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const { success, message } = await addRepair(repairData);

      toaster.create({
        type: success ? "success" : "error",
        description: message,
      });

      success && handleClear();
    } catch (error) {
      console.error(error);
      toaster.create({
        type: "error",
        title: "Error",
        description: "Failed to add asset. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setRepairData({
      type: "",
      model: "",
      tag: "",
      serial_no: "",
      branch: "",
      vendor: "",
      fault: "",
      cost_of_repair: "",
      bank: "",
    });
  };
  return (
    <Box>
      <Toaster />
      <Box
        rounded={"md"}
        p={"1rem"}
        outline={1}
        w={"10rem"}
        mb={7}
        outlineColor={"black"}
        outlineStyle={"solid"}
      >
        <Text fontWeight={"bold"}>Add New Repair</Text>
      </Box>
      <form className="p-5 grid grid-cols-2 gap-4 w-full ">
        <Input
          value={"SUBMITTED BY: " + userData.firstname}
          disabled
          textTransform={"uppercase"}
          fontWeight={"bold"}
          _disabled={{ bg: "gray.400" }}
        />
        <CustomSelect
          defaultValue="TYPE"
          value={repairData.type || "TYPE"}
          onChange={(value) => setRepairData({ ...repairData, type: value })}
          options={equipmentTypes}
        />

        <CustomSelect
          defaultValue="MODEL"
          value={repairData.model || "MODEL"}
          onChange={(value) => setRepairData({ ...repairData, model: value })}
          options={laptopModels}
        />

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
        <CustomSelect
          defaultValue="BRANCH"
          value={repairData.branch || "BRANCH"}
          onChange={(value) => setRepairData({ ...repairData, branch: value })}
          options={Branch}
        />

        <CustomSelect
          defaultValue="VENDOR"
          value={repairData.vendor || "VENDOR"}
          onChange={(value) => setRepairData({ ...repairData, vendor: value })}
          options={Vendors}
        />

        <CustomSelect
          defaultValue="FAULT"
          value={repairData.fault || "FAULT"}
          onChange={(value) => setRepairData({ ...repairData, fault: value })}
          options={Fault}
        />
        <Input
          placeholder="Cost of Repair"
          value={repairData.cost_of_repair}
          onChange={(e) =>
            setRepairData({ ...repairData, cost_of_repair: e.target.value })
          }
        />

        <CustomSelect
          defaultValue="BANK"
          value={repairData.bank || "BANK"}
          onChange={(value) => setRepairData({ ...repairData, bank: value })}
          options={Bank}
        />
        <HStack>
          <Button
            disabled={loading}
            variant={"subtle"}
            colorPalette={"green"}
            onClick={() => {
              setLoading(true);
              handleAddRepair();
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
    </Box>
  );
};

export default Newrepair;
