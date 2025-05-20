import { repairData } from "@/types/types";
import {
  Table,
  TableBody,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import React from "react";

const Repairstable: React.FC<any> = ({ repairs }) => {
  return (
    <Table.ScrollArea borderWidth="1px" maxW="9xl" colorPalette={"gray"}>
      <Table.Root
        borderRadius={"md"}
        stickyHeader
        variant={"outline"}
        showColumnBorder
      >
        <TableHeader>
          <TableRow>
            <TableColumnHeader minW={"13px"}>S/N</TableColumnHeader>
            <TableColumnHeader>TYPE</TableColumnHeader>
            <TableColumnHeader>TAG</TableColumnHeader>
            <TableColumnHeader>SERIAL NO</TableColumnHeader>
            <TableColumnHeader>VENDOR</TableColumnHeader>
            <TableColumnHeader>FAULT</TableColumnHeader>
            <TableColumnHeader>COST OF REPAIR</TableColumnHeader>

            <TableColumnHeader>BANK</TableColumnHeader>
            <TableColumnHeader textAlign={"end"}>DATE ADDED</TableColumnHeader>
            <TableColumnHeader>CREATED BY</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody cursor={"text"}>
          {repairs.map((repair: repairData, index: number) => {
            return (
              <TableRow key={index}>
                <TableColumnHeader>{index + 1}</TableColumnHeader>
                <TableColumnHeader>{repair.type}</TableColumnHeader>
                <TableColumnHeader>{repair.tag}</TableColumnHeader>
                <TableColumnHeader>{repair.serial_no}</TableColumnHeader>
                <TableColumnHeader>{repair.vendor}</TableColumnHeader>
                <TableColumnHeader>{repair.fault}</TableColumnHeader>
                <TableColumnHeader>{repair.costofrepair}</TableColumnHeader>
                <TableColumnHeader>{repair.bank}</TableColumnHeader>
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
  );
};

export default Repairstable;
