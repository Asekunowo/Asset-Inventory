import { repairData } from "@/types/types";
import {
  Table,
  TableBody,
  TableColumnHeader,
  TableHeader,
  TableRow,
  Flex,
  Icon,
  Input,
  HStack,
  Heading,
} from "@chakra-ui/react";

import { Search } from "@/store/icons";

const Repairstable: React.FC<any> = ({
  repairs,
  setEditData,
  editData,
  search,
  setSearch,
}) => {
  return (
    <div>
      <Flex m={3} justify={"space-between"} alignItems={"center"}>
        <Heading>REPAIRS TABLE</Heading>
        <HStack pos={"relative"} mr={5}>
          <Input
            minW={"14rem"}
            p={2}
            placeholder="Search"
            variant={"flushed"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Icon pos={"absolute"} right={0} size={"lg"}>
            <Search />
          </Icon>
        </HStack>
      </Flex>
      <Table.ScrollArea borderWidth="1px" maxW="9xl" colorPalette={"gray"}>
        <Table.Root
          borderRadius={"md"}
          stickyHeader
          variant={"outline"}
          showColumnBorder
        >
          <TableHeader>
            <TableRow>
              <TableColumnHeader></TableColumnHeader>
              <TableColumnHeader minW={"13px"}>S/N</TableColumnHeader>
              <TableColumnHeader>TYPE</TableColumnHeader>
              <TableColumnHeader>TAG</TableColumnHeader>
              <TableColumnHeader>SERIAL NO</TableColumnHeader>
              <TableColumnHeader>VENDOR</TableColumnHeader>
              <TableColumnHeader>FAULT</TableColumnHeader>
              <TableColumnHeader>COST OF REPAIR</TableColumnHeader>

              <TableColumnHeader>ENTITY</TableColumnHeader>
              <TableColumnHeader textAlign={"end"}>
                DATE ADDED
              </TableColumnHeader>
              <TableColumnHeader>CREATED BY</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody cursor={"text"}>
            {repairs.map((repair: repairData, index: number) => {
              return (
                <TableRow key={index}>
                  <TableColumnHeader>
                    <input
                      type="radio"
                      name="select"
                      checked={editData._id === repair._id}
                      onChange={() => setEditData(repair)}
                    />
                  </TableColumnHeader>
                  <TableColumnHeader>{index + 1}</TableColumnHeader>
                  <TableColumnHeader>{repair.type}</TableColumnHeader>
                  <TableColumnHeader>{repair.tag}</TableColumnHeader>
                  <TableColumnHeader>{repair.serial_no}</TableColumnHeader>
                  <TableColumnHeader>{repair.vendor}</TableColumnHeader>
                  <TableColumnHeader>{repair.fault}</TableColumnHeader>
                  <TableColumnHeader>{repair.costofrepair}</TableColumnHeader>
                  <TableColumnHeader>{repair.entity}</TableColumnHeader>
                  <TableColumnHeader>{repair.createdAt}</TableColumnHeader>
                  <TableColumnHeader
                    bg={"gray.300"}
                    fontWeight={"bold"}
                    color={"gray.500"}
                  >
                    {repair.createdBy!.firstname +
                      " " +
                      repair.createdBy!.lastname}
                  </TableColumnHeader>
                </TableRow>
              );
            })}
          </TableBody>
        </Table.Root>
      </Table.ScrollArea>
    </div>
  );
};

export default Repairstable;
