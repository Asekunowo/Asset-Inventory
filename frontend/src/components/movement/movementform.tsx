import { useEffect } from "react";
import { Box, Button, Flex, HStack, Loader, Text } from "@chakra-ui/react";
import {
  Navigate,
  useNavigate,
  useOutletContext,
  Link,
} from "react-router-dom";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { BackArrow, IPrint } from "@/store/icons";
import { movementData } from "@/types/types";
import Form from "./form";

const MovemnentForm = () => {
  // const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const { loading, setLoading }: any = useOutletContext();

  const data: movementData = JSON.parse(sessionStorage.getItem("movement")!);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (!data) {
        return <Navigate to={"../"} />;
      }
    }, 500);
  });

  if (loading) {
    return <Loader />;
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
        <Text fontWeight={"bold"}>PRINT MOVEMENT FORM</Text>
      </Box>
      <HStack m={2}>
        <Link to={"../"}>
          <Button
            variant={"surface"}
            onClick={() => sessionStorage.removeItem("movement")}
          >
            <BackArrow />
            Back To Movements
          </Button>
        </Link>
        <Button bg={"gray.600"} onClick={() => handleDownload()}>
          <IPrint /> Print
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
