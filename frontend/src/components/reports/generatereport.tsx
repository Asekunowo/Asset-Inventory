import { Text, VStack } from "@chakra-ui/react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { IHourGlass } from "@/store/icons";

export const exportExcel = async (data: any[], name: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.columns = Object.keys(data[0]).map((key) => ({
    header: key.replace(/(?<=[a-zA-Z])_/g, " ").toUpperCase(),
    key,
    width: 20,
  }));

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // White bold text
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4F81BD" }, // Blue background
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${name} report.xlsx`);
};

const GenerateReports = () => {
  return (
    <VStack justifyContent={"center"} minH={"50vh"}>
      <IHourGlass size={"10rem"} />

      <Text fontSize={"3xl"} fontWeight={"bold"} fontFamily={"monospace"}>
        Your download should begin shortly. Please wait!
      </Text>
    </VStack>
  );
};

export default GenerateReports;
