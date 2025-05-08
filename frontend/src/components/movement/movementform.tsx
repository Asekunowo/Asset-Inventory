import { PDFViewer, pdf } from "@react-pdf/renderer";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { movementData } from "@/utils/types";
import { useEffect, useState } from "react";
import Spin from "../ui/spinner";
import Form from "./form";
import { IoArrowBackSharp, IoPrint } from "react-icons/io5";
import { Link } from "react-router-dom";

const MovemnentForm = () => {
  // const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const { loading, setLoading }: any = useOutletContext();

  const [data, setData] = useState<movementData>(
    JSON.parse(sessionStorage.getItem("movement")!)
  );

  useEffect(() => {
    // setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (!data) {
        return <Navigate to={"../"} />;
      }
    }, 500);
  });

  if (loading) {
    return (
      <VStack
        className="backdrop-brightness-25"
        position={"absolute"}
        left={0}
        top={0}
        h={"full"}
        minH={"100vh"}
        minW={"full"}
        justifyContent={"center"}
      >
        <div className="scale-150">
          <Spin />
        </div>
      </VStack>
    );
  }

  const handleDownload = async () => {
    const blob = await pdf(<Form data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exitform.pdf";
    link.click();

    setLoading(true);

    setTimeout(() => {
      sessionStorage.removeItem("exit");
      navigate("../");
      setLoading(false);
    }, 1000);
  };

  return (
    <Flex direction={"column"}>
      <Box
        rounded={"md"}
        p={"0.5rem"}
        outline={1}
        w={"max-content"}
        mb={7}
        textAlign={"left"}
        outlineColor={"black"}
        outlineStyle={"solid"}
      >
        <Text fontWeight={"bold"}>PRINT EXIT FORM</Text>
      </Box>
      <HStack m={2}>
        <Link to={"../"}>
          <Button
            variant={"surface"}
            onClick={() => sessionStorage.removeItem("movement")}
          >
            <IoArrowBackSharp />
            Back To Exits Page
          </Button>
        </Link>
        <Button bg={"gray.600"} onClick={() => handleDownload()}>
          <IoPrint /> Print
        </Button>
      </HStack>
      <div className="w-full h-[90vh]">
        <PDFViewer width={"100%"} height={"100%"}>
          <Form data={data} />
        </PDFViewer>
      </div>
    </Flex>
  );
};

export default MovemnentForm;
