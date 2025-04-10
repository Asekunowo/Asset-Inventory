import {
  Box,
  Heading,
  HStack,
  NativeSelect,
  Text,
  Portal,
  Select,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import Topbar from "./topbar";

const Asset = () => {
  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });
  return (
    <VStack textAlign={"left"} alignItems={"left"}>
      <Box rounded={"md"} p={"1rem"} h={"max-content"} bg={"white"}>
        <Topbar />
      </Box>
      <Box>
        <Heading display={"block"} float={"left"} size={"2xl"} padding={"1rem"}>
          Asset
        </Heading>
      </Box>
      <Box rounded={"md"} p={"1rem"} h={"max-content"} bg={"white"}>
        <VStack float={"left"}>
          <Text fontWeight={"bold"}>Laptop Section</Text>
          {/* <form action=""> */}
          <NativeSelect.Root size="sm" width="240px">
            <NativeSelect.Field
              colorPalette={"white"}
              placeholder="Select option"
            >
              <option value="react">Demi</option>
              <option value="vue">Kiishi</option>
              <option value="angular">Kaleb</option>
              <option value="svelte">Joshua</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          {/* </form> */}
        </VStack>
      </Box>
      <HStack mt={5} gap={"10rem"} justifyContent={"space-between"}>
        <Box
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          h={"max-content"}
          bg={"white"}
        >
          <Select.Root collection={frameworks} size="sm" width="320px">
            <Select.HiddenSelect />
            <Select.Label>Select framework</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select framework" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Box>
        <Box
          rounded={"md"}
          w={"full"}
          p={"1rem"}
          h={"max-content"}
          bg={"white"}
        >
          <Text fontWeight={"bold"}>Repairs Report</Text>
          <Text>Total Repairs: </Text>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Asset;
