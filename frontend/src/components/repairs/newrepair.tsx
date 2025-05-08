import { useState } from "react";
import { Box, Text, Input, Button, HStack } from "@chakra-ui/react";
import { Bank, Branch, equipmentTypes, Fault, Vendors } from "@/store/data";
import CustomSelect from "../reusable/customselect";
import { toaster } from "../ui/toaster";
import { useOutletContext } from "react-router-dom";
import Spin from "../ui/spinner";
import { repairData } from "@/utils/types";
import { serialCheck, tagCheck } from "@/utils/functions";
import { DEFAULT_REPAIR_DATA } from "@/utils/definitions";

type OutletContextType = {
  userData: { firstname: string; lastname: string };
  addRepair: any;
};

const Newrepair = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [repairData, setRepairData] = useState<repairData>(DEFAULT_REPAIR_DATA);

  const { userData, addRepair } = useOutletContext<OutletContextType>();

  const validateForm = () => {
    const requiredFields: (keyof repairData)[] = [
      "type",

      "tag",
      "serial_no",
      "branch",
      "vendor",
      "fault",
      "costofrepair",
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

    if (!tagCheck(repairData.tag)) {
      toaster.create({
        type: "error",
        title: "Invalid Tag Number",
        description: `Tags must be at least 6 NUMERIC characters.`,
        duration: 5000,
      });
      return false;
    }

    if (!serialCheck(repairData.serial_no)) {
      toaster.create({
        type: "error",
        title: "Invalid Serial Number",
        description: "Serial number must be at least 6 alphanumeric characters",
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

      success && window.location.replace("../repairs");
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
    setRepairData(DEFAULT_REPAIR_DATA);
  };
  return (
    <Box>
      <Box
        rounded={"md"}
        p={"0.5rem"}
        outline={1}
        w={"max-content"}
        mb={7}
        outlineColor={"black"}
        outlineStyle={"solid"}
      >
        <Text fontWeight={"bold"}>Add New Repair</Text>
      </Box>
      <form className="p-5 grid grid-cols-3 gap-6 w-full ">
        <div className="col-span-3">
          <Input
            value={"SUBMITTED BY: " + userData.firstname}
            disabled
            textTransform={"uppercase"}
            fontWeight={"bold"}
            _disabled={{ bg: "gray.400", fontWeight: "bold" }}
          />
        </div>
        <div>
          <b>Type:</b>

          <CustomSelect
            defaultValue="TYPE"
            value={repairData.type || "TYPE"}
            onChange={(value) => setRepairData({ ...repairData, type: value })}
            options={equipmentTypes}
          />
        </div>

        <div>
          <b>Tag:</b>
          <Input
            placeholder="Asset Tag"
            value={repairData.tag}
            onChange={(e) =>
              setRepairData({ ...repairData, tag: e.target.value })
            }
          />
        </div>
        <div>
          <b>Bank:</b>
          <CustomSelect
            defaultValue="BANK"
            value={repairData.bank || "BANK"}
            onChange={(value) => setRepairData({ ...repairData, bank: value })}
            options={Bank}
          />
        </div>
        <div>
          <b>Branch:</b>
          <CustomSelect
            defaultValue="BRANCH"
            value={repairData.branch || "BRANCH"}
            onChange={(value) =>
              setRepairData({ ...repairData, branch: value })
            }
            options={Branch}
          />
        </div>
        <div>
          <b>Serial No</b>
          <Input
            placeholder="Serial No"
            value={repairData.serial_no}
            onChange={(e) =>
              setRepairData({
                ...repairData,
                serial_no: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div>
          <b>Vendor:</b>
          <CustomSelect
            defaultValue="VENDOR"
            value={repairData.vendor || "VENDOR"}
            onChange={(value) =>
              setRepairData({ ...repairData, vendor: value })
            }
            options={Vendors}
          />
        </div>
        <div>
          <b>Fault:</b>
          <CustomSelect
            defaultValue="FAULT"
            value={repairData.fault || "FAULT"}
            onChange={(value) => setRepairData({ ...repairData, fault: value })}
            options={Fault}
          />
        </div>
        <div>
          <b>Cost of repair</b>
          <Input
            placeholder="Cost of Repair"
            value={repairData.costofrepair}
            onChange={(e) =>
              setRepairData({ ...repairData, costofrepair: e.target.value })
            }
          />
        </div>
        <div className="col-span-2">
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
        </div>
      </form>
    </Box>
  );
};

export default Newrepair;
