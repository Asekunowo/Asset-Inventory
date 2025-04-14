import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const Repairs = () => {
  const [assetData, setAssetData] = useState({
    vendor: "",
    branch: "",
    model: "",
    tag: "",
    serial_no: "",
  });
  return (
    <VStack textAlign={"left"} alignItems={"left"}>
      <Box>
        <Heading
          textTransform={"uppercase"}
          display={"block"}
          float={"left"}
          size={"2xl"}
          padding={"1rem"}
        >
          Repairs
        </Heading>
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
      >
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

        <select
          defaultValue={"default"}
          onChange={(e) =>
            setAssetData({ ...assetData, model: e.target.value })
          }
          className="col-start-1 row-start-1 w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
        >
          <option disabled className="" value={"default"}>
            --MODEL--
          </option>
          <option value={"HP"}>HP</option>
          <option value={"DELL"}>DELL</option>
        </select>
        <Input
          placeholder="Asset Tag"
          value={assetData.tag}
          onChange={(e) => setAssetData({ ...assetData, tag: e.target.value })}
        />
        <Input
          placeholder="Serial No"
          value={assetData.serial_no}
          onChange={(e) =>
            setAssetData({ ...assetData, serial_no: e.target.value })
          }
        />
        <select
          onChange={(e) =>
            setAssetData({ ...assetData, branch: e.target.value })
          }
          defaultValue={"default"}
          className="col-start-1 row-start-1 w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
        >
          <option disabled className="" value={"default"}>
            --BRANCH--
          </option>
          <option value={"LISD"}>LAGOS ISLAND</option>
          <option value={"SLR"}>SURULERE</option>
          <option value={"IKY"}>IKOYI</option>
        </select>
        <Input
          placeholder="Vendor"
          value={assetData.vendor}
          onChange={(e) =>
            setAssetData({ ...assetData, vendor: e.target.value })
          }
        />

        <HStack float={"right"}>
          <Button variant={"outline"} colorScheme={"gray"}>
            Submit
          </Button>
          <Button colorPalette={"gray"}>Clear</Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Repairs;
