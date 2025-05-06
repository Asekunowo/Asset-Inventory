import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { Bank, Branch, laptopModels } from "@/store/data";
import { useState } from "react";
import { toaster, Toaster } from "./ui/toaster";
import Spin from "./spinner";
import CustomSelect from "./customselect";

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

const Newasset = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  type OutletContextType = {
    userData: { firstname: string; lastname: string };
    addAsset: any;
  };

  const { userData, addAsset } = useOutletContext<OutletContextType>();

  const containsAlphabet = (str: string): boolean => {
    return /[a-zA-Z]/.test(str);
  };

  const [AssetData, setAssetData] = useState<Assets>({
    user: "",
    type: "Laptop",
    tag: "",
    serial_no: "",
    model: "",
    group: "",
    role: "",
    branch: "",
    bank: "",
  });

  const handleClear = () => {
    setAssetData({
      user: "",
      type: "Laptop",
      tag: "",
      serial_no: "",
      model: "",
      group: "",
      role: "",
      branch: "",
      bank: "",
    });
  };

  const validateForm = () => {
    const requiredFields: (keyof Assets)[] = [
      "user",
      "tag",
      "serial_no",
      "model",
      "group",
      "role",
      "branch",
      "bank",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !AssetData[field] || AssetData[field].includes("--")
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

    if (containsAlphabet(AssetData.tag)) {
      toaster.create({
        type: "error",
        title: "Invalid Tag Number",
        description: "Tag number cannot contain alpha characters.",
        duration: 5000,
      });
      return false;
    }

    return true;
  };

  const handleAddAsset = async () => {
    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const { success, message } = await addAsset(AssetData);
      // const success = true; // Simulate success for demonstration
      // const message = "Asset added successfully"; // Simulate success message

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
        <Text fontWeight={"bold"}>Add New Laptop</Text>
      </Box>
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
          onChange={(e) => setAssetData({ ...AssetData, user: e.target.value })}
        />
        <Input
          placeholder="Asset Tag"
          value={AssetData.tag}
          type="text"
          onChange={(e) => setAssetData({ ...AssetData, tag: e.target.value })}
        />
        <Input
          placeholder="Serial No"
          value={AssetData.serial_no}
          onChange={(e) =>
            setAssetData({
              ...AssetData,
              serial_no: e.target.value.toUpperCase(),
            })
          }
        />

        <CustomSelect
          defaultValue="LAPTOP MODEL"
          value={AssetData.model || "LAPTOP MODEL"}
          onChange={(value) => setAssetData({ ...AssetData, model: value })}
          options={laptopModels}
        />
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
          onChange={(e) => setAssetData({ ...AssetData, role: e.target.value })}
        />

        <CustomSelect
          defaultValue="BANK"
          value={AssetData.bank || "BANK"}
          onChange={(value) => setAssetData({ ...AssetData, bank: value })}
          options={Bank}
        />

        <CustomSelect
          defaultValue="BRANCH"
          value={AssetData.branch || "BRANCH"}
          onChange={(value) => setAssetData({ ...AssetData, branch: value })}
          options={Branch}
        />

        <HStack>
          <Button
            disabled={loading}
            variant={"subtle"}
            minW={"5.6rem"}
            colorPalette={"green"}
            onClick={() => {
              setLoading(true);
              handleAddAsset();
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

export default Newasset;
