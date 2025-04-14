import { Toaster, toaster } from "@/components/ui/toaster";
import useLogin from "@/hooks/useLogin";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loading, loginUser } = useLogin();

  const [pass, showPass] = useState(true);
  const disabled: Boolean = true;

  const navigate = useNavigate();

  async function handleSignIn() {
    if (!LoginData.email && !LoginData.password) {
      toaster.create({
        type: "error",
        description: "Please fill in all fields",
      });
      return;
    }

    const { success, message } = await loginUser(LoginData);

    toaster.create({
      type: success ? "success" : "warning",
      description: message,
    });

    setTimeout(() => navigate("/dashboard"), 500);
  }

  return (
    <Container maxW={"2xl"} minH={"100vh"} mt={""}>
      <Toaster />
      <VStack
        minH={"80vh"}
        w={"full"}
        justify={"center"}
        color={"blackAlpha.200"}
      >
        <VStack
          pos={"relative"}
          w={"full"}
          p={6}
          borderRadius={"md"}
          bg={"gray.100"}
          justify={"center"}
        >
          <Heading as={"h3"} size={"xl"} color={"#2c3e50"}>
            LOGIN
          </Heading>
          <Box w={"sm"}>
            <Heading as={"h4"} size={"lg"} color={"#2c3e50"}>
              Enter Login Details
            </Heading>
            <VStack p={6} spaceY={3} color={"black"}>
              <Input
                type="text"
                placeholder="Email"
                value={LoginData.email}
                onChange={(e) =>
                  setLoginData({ ...LoginData, email: e.target.value })
                }
              />
              <HStack w={"full"} position={"relative"}>
                <Input
                  autoComplete="current_password"
                  type={pass ? "text" : "password"}
                  placeholder="Password"
                  value={LoginData.password}
                  onChange={(e) =>
                    setLoginData({ ...LoginData, password: e.target.value })
                  }
                  minLength={8}
                  maxLength={16}
                />
                <Button
                  bg={"transparent"}
                  pos={"absolute"}
                  variant={"solid"}
                  zIndex={2}
                  right={0}
                  onClick={() => showPass((prevPass) => !prevPass)}
                >
                  {pass ? <BsEyeSlash size={20} /> : <BsEyeFill size={20} />}
                </Button>
              </HStack>

              <Button
                disabled={!disabled}
                w={"full"}
                mt={5}
                variant={"subtle"}
                outlineColor={"white"}
                fontWeight={"bold"}
                alignItems={"center"}
                colorScheme="blue"
                onClick={() => handleSignIn()}
              >
                Login
              </Button>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};

export default LoginPage;
