import { OtherAsset } from "@/types/types";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableColumnHeader,
} from "@chakra-ui/react";

const Otherassets: React.FC<any> = ({ others }) => {
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
            <TableColumnHeader maxW={"10px"}>S/N</TableColumnHeader>
            <TableColumnHeader>TYPE</TableColumnHeader>
            <TableColumnHeader>TAG</TableColumnHeader>
            <TableColumnHeader>SERIAL NO</TableColumnHeader>
            <TableColumnHeader>BRANCH</TableColumnHeader>
            <TableColumnHeader>DATE</TableColumnHeader>
            <TableColumnHeader>CREATED BY</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody cursor={"text"}>
          {others.map((asset: OtherAsset, index: number) => {
            return (
              <TableRow key={index}>
                <TableColumnHeader>{index + 1}</TableColumnHeader>
                <TableColumnHeader>{asset.type}</TableColumnHeader>
                <TableColumnHeader>{asset.tag}</TableColumnHeader>
                <TableColumnHeader>{asset.serial_no}</TableColumnHeader>
                <TableColumnHeader>{asset.branch}</TableColumnHeader>
                <TableColumnHeader>{asset.createdAt}</TableColumnHeader>
                <TableColumnHeader>
                  {asset.createdBy!.firstname + " " + asset.createdBy!.lastname}
                </TableColumnHeader>
              </TableRow>
            );
          })}
        </TableBody>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default Otherassets;
