import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableColumnHeader,
  Flex,
  Heading,
  HStack,
  Input,
  Icon,
} from "@chakra-ui/react";

import { IoSearch } from "react-icons/io5";

const ExitRegisterTable = ({ exits, setSearch }: any) => {
  const excludedKeys = ["_id", "createdAt", "updatedAt", "__v"];
  const columns =
    exits && exits.length > 0
      ? Object.keys(exits[0])
          .filter((key) => !excludedKeys.includes(key))
          .map((key) => (key === "ram" ? "RAM (GB)" : key))
      : [];

  return (
    <div>
      <Flex m={3} justify={"space-between"} alignItems={"center"}>
        <Heading>EXITS REGISTER TABLE</Heading>
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
      {!columns && <Heading>Nothing to see here!</Heading>}
      <Table.ScrollArea>
        <Table.Root
          variant={"outline"}
          stickyHeader
          showColumnBorder
          borderRadius={"md"}
        >
          <TableHeader>
            <TableRow>
              <TableColumnHeader fontWeight={"bold"}>S/N</TableColumnHeader>
              {columns.map((col) => (
                <TableColumnHeader
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  key={col}
                >
                  {col.replace(/[-_.]/g, " ")}
                </TableColumnHeader>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* You can map exits here to render rows */}
            {exits && exits.length > 0 ? (
              exits.map((exit: any, rowIdx: number) => (
                <TableRow key={exit._id || rowIdx}>
                  <TableColumnHeader>{rowIdx + 1}</TableColumnHeader>
                  {columns.map((col) => (
                    <TableColumnHeader as="td" key={col}>
                      {exit[col.includes("RAM") ? "ram" : col].replace(
                        "_",
                        " "
                      )}
                    </TableColumnHeader>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableColumnHeader
                  as="td"
                  colSpan={columns.length}
                  textAlign="center"
                >
                  No exits found.
                </TableColumnHeader>
              </TableRow>
            )}
          </TableBody>
        </Table.Root>
      </Table.ScrollArea>
    </div>
  );
};

export default ExitRegisterTable;
