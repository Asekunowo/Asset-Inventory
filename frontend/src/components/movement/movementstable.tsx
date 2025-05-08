import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Table,
  TableBody,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { movementData } from "@/utils/types";
import { IoSearch } from "react-icons/io5";

const MovementsTable = ({ movements, handlePrint, setSearch }: any) => {
  return (
    <div>
      <Flex m={3} justify={"space-between"} alignItems={"center"}>
        <Heading>EXITS</Heading>
        <HStack pos={"relative"} mr={5}>
          <Input
            minW={"14rem"}
            p={2}
            placeholder="Search"
            variant={"flushed"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Icon pos={"absolute"} right={0} size={"lg"}>
            <IoSearch />
          </Icon>
        </HStack>
      </Flex>
      <Table.ScrollArea>
        <Table.Root
          variant={"outline"}
          stickyHeader
          showColumnBorder
          borderRadius={"md"}
        >
          <TableHeader>
            <TableRow>
              <TableColumnHeader w={"3px"}>S/N</TableColumnHeader>
              <TableColumnHeader>Type</TableColumnHeader>
              <TableColumnHeader>Tag</TableColumnHeader>
              <TableColumnHeader>Serial Number</TableColumnHeader>
              <TableColumnHeader>TO</TableColumnHeader>
              <TableColumnHeader>Recipient</TableColumnHeader>
              <TableColumnHeader w={"15px"}>Action</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((exit: movementData, index: number) => (
              <TableRow key={index}>
                <TableColumnHeader w={"3px"}>{index + 1}</TableColumnHeader>
                <TableColumnHeader>{exit.type}</TableColumnHeader>
                <TableColumnHeader>{exit.tag}</TableColumnHeader>
                <TableColumnHeader>{exit.serial_no}</TableColumnHeader>
                <TableColumnHeader>{exit.to_location}</TableColumnHeader>
                <TableColumnHeader>{exit.recipient}</TableColumnHeader>
                <TableColumnHeader>
                  <Button
                    onClick={() => {
                      handlePrint(exit);
                    }}
                  >
                    <Link to={"form"}>Print</Link>
                  </Button>{" "}
                </TableColumnHeader>
              </TableRow>
            ))}
          </TableBody>
        </Table.Root>
      </Table.ScrollArea>
    </div>
  );
};

export default MovementsTable;
