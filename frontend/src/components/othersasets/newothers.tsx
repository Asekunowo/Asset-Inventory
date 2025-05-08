import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { Bank, Branch, equipmentTypes } from "@/store/data";
import { useState } from "react";
import { toaster, Toaster } from "../ui/toaster";
import Spin from "../ui/spinner";
import CustomSelect from "../reusable/customselect";
import { DEFAULT_OTHERASSET_DATA } from "@/utils/definitions";
import { OtherAssets as Assets } from "@/utils/types";
import { serialCheck, tagCheck } from "@/utils/functions";
import { useOtherAssetStore } from "@/store/store";

const Newothers = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addOther } = useOtherAssetStore();
  type OutletContextType = {
    userData: { firstname: string; lastname: string };
  };

  const { userData } = useOutletContext<OutletContextType>();

  const [otherAssetData, setOtherAssetData] = useState<Assets>(
    DEFAULT_OTHERASSET_DATA
  );

  const handleClear = () => {
    setOtherAssetData(DEFAULT_OTHERASSET_DATA);
  };

  const validateForm = () => {
    const requiredFields: (keyof Assets)[] = [
      "tag",
      "serial_no",
      "type",
      "branch",
      "bank",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !otherAssetData[field] || otherAssetData[field].includes("--")
    );

    if (emptyFields.length > 0) {
      toaster.create({
        type: "error",
        title: "Required fields are empty",
        description: `Please fill in: ${emptyFields.join(", ").toUpperCase()}`,
        duration: 5000,
      });
      return false;
    }

    if (!tagCheck(otherAssetData.tag)) {
      toaster.create({
        type: "error",
        title: "Invalid Tag Number",
        description: `Tags cannot must be at least 6 NUMERIC characters.`,
        duration: 5000,
      });
      return false;
    }

    if (!serialCheck(otherAssetData.serial_no)) {
      toaster.create({
        type: "error",
        title: "Invalid Serial Number",
        description: "Serial number must be at least 6 alphanumeric characters",
      });
      return false;
    }
    return true;
  };

  const handleAddOtherAsset = async () => {
    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const { success, message } = await addOther(otherAssetData);

      toaster.create({
        type: success ? "success" : "error",
        title: message,
      });

      window.location.replace("../assets");
      success && handleClear();
    } catch (error) {
      toaster.create({
        type: "error",
        title: "Error",
        description: "Failed to add asset. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        rounded={"md"}
        p={"1rem"}
        outline={1}
        w={"10rem"}
        mb={7}
        outlineColor={"black"}
        outlineStyle={"solid"}
      >
        <Text fontWeight={"bold"}>Add New Asset</Text>
      </Box>
      <Toaster />
      <form className="grid p-5 grid-cols-2 gap-6 w-full">
        <Input
          value={
            "SUBMITTED BY: " + userData.firstname + " " + userData.lastname
          }
          disabled
          textTransform={"uppercase"}
          fontWeight={"bold"}
          _disabled={{ bg: "gray.400" }}
        />
        <CustomSelect
          defaultValue="TYPE"
          value={otherAssetData.type || "TYPE"}
          onChange={(value) =>
            setOtherAssetData({ ...otherAssetData, type: value })
          }
          options={equipmentTypes}
        />

        <Input
          placeholder="Asset Tag"
          value={otherAssetData.tag}
          type="text"
          onChange={(e) =>
            setOtherAssetData({ ...otherAssetData, tag: e.target.value })
          }
        />

        <Input
          placeholder="Serial No"
          value={otherAssetData.serial_no}
          onChange={(e) =>
            setOtherAssetData({
              ...otherAssetData,
              serial_no: e.target.value.toUpperCase(),
            })
          }
        />

        <CustomSelect
          defaultValue="BANK"
          value={otherAssetData.bank || "BANK"}
          onChange={(value) =>
            setOtherAssetData({ ...otherAssetData, bank: value })
          }
          options={Bank}
        />
        <div>
          <CustomSelect
            defaultValue="BRANCH"
            value={otherAssetData.branch || "BRANCH"}
            onChange={(value) =>
              setOtherAssetData({ ...otherAssetData, branch: value })
            }
            options={Branch}
          />
        </div>

        <div className="col-span-2">
          <HStack>
            <Button
              disabled={loading}
              variant={"subtle"}
              minW={"5.6rem"}
              colorPalette={"green"}
              onClick={() => {
                setLoading(true);
                handleAddOtherAsset();
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

export default Newothers;
