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

const assetModels = [
  "DELL LATITUDE 3420",
  "DELL LATITUDE 5420",
  "DELL LATTITUDE 5520",
  "DELL LATITUDE 3430",
  "DELL LATITUDE 3400",
  "DELL LATITUDE 5440",
  "DELL LATITUDE 3490",
  "DELL LATITUDE 5320",
  "DELL LATITUDE 5580",
  "HP ELITEBOOK 640 G9",
  "HP ELITEBOOK 450 G10",
  "HP ELITEBOOK 840 G9",
  "HP ELITEBOOK X360 1040 G6",
  "HP PROBOOK 440 G9",
  "HP PROBOOK 440 G11",
  "MACBOOK  ***",
];

const Asset = () => {
  const [AssetData, setAssetData] = useState({
    user: "",
    tag: "",
    serial_no: "",
    model: "",
    group: "",
    role: "",
    location: "",
  });

  console.log(AssetData);

  return (
    <VStack textAlign={"left"} alignItems={"left"}>
      <Box>
        <Heading display={"block"} float={"left"} size={"2xl"} padding={"1rem"}>
          Asset
        </Heading>
      </Box>
      <VStack mt={5} gap={"10rem"} justifyContent={"space-between"}>
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
            defaultValue={"default"}
            // value={AssetData.model}
            onChange={(e) =>
              setAssetData({ ...AssetData, model: e.target.value })
            }
            className="col-start-1 row-start-1 w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option disabled className="" value={"default"}>
              --ASSET MODEL--
            </option>
            {assetModels.map((model) => (
              <option value={model}>{model}</option>
            ))}
            DELL
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
          <Input
            placeholder="Location"
            value={AssetData.location}
            onChange={(e) =>
              setAssetData({ ...AssetData, location: e.target.value })
            }
          />

          <HStack float={"right"}>
            <Button variant={"outline"} colorScheme={"gray"}>
              Submit
            </Button>
            <Button colorPalette={"gray"}>Clear</Button>
          </HStack>
        </VStack>

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
          <select
            defaultValue={"LISD"}
            className="col-start-1 row-start-1 w-full h-10 rounded-md py-10 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-1 outline-1 focus:outline-offset-1 focus:outline-black sm:text-sm/6 "
          >
            <option disabled className="" value={"LISD"}>
              --BRANCH--
            </option>
            <option value={"LISD"}>LAGOS ISLAND</option>
            <option value={"SLR"}>SURULERE</option>
            <option value={"IKY"}>IKOYI</option>
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
