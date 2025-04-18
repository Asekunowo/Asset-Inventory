import Spin from "@/components/spinner";
import { Toaster, toaster } from "@/components/ui/toaster";
import useLogin from "@/hooks/useLogin";
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loading, loginUser } = useLogin();

  const [pass, showPass] = useState(false);

  const navigate = useNavigate();

  const [invalid, setInvalid] = useState({
    password: false,
    email: false,
  });

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (LoginData.email.includes("@") && LoginData.email.includes(".")) {
      setInvalid({ ...invalid, email: false });
    } else if (LoginData.email === "") {
      setInvalid({ ...invalid, email: false });
    } else {
      setInvalid({ ...invalid, email: true });
    }
  }, [LoginData]);

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

    if (success === true) {
      setTimeout(() => navigate("/dashboard"), 500);
    }
  }

  if (load) {
    return (
      <VStack
        className="backdrop-brightness-50"
        position={"absolute"}
        left={0}
        top={2}
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
              <Field.Root invalid={invalid.email}>
                <Field.Label>Email </Field.Label>
                <Input
                  type="text"
                  placeholder="Provide Your Email"
                  value={LoginData.email}
                  onChange={(e) =>
                    setLoginData({ ...LoginData, email: e.target.value })
                  }
                />
                <Field.ErrorText>Enter a valid email address</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={invalid.password}>
                <Field.Label>Password</Field.Label>
                <HStack w={"full"} position={"relative"}>
                  <Input
                    autoComplete="current_password"
                    type={pass ? "text" : "password"}
                    placeholder="Provide Your Password"
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
                    bottom={0}
                    onClick={() => showPass((prevPass) => !prevPass)}
                  >
                    {pass ? <BsEyeSlash size={20} /> : <BsEyeFill size={20} />}
                  </Button>
                </HStack>
                <Field.ErrorText>Password is required</Field.ErrorText>
              </Field.Root>

              <Button
                disabled={loading}
                w={"full"}
                mt={5}
                variant={"subtle"}
                outlineColor={"white"}
                fontWeight={"bold"}
                alignItems={"center"}
                colorScheme="blue"
                onClick={() => handleSignIn()}
              >
                {loading ? <Spin /> : <>Login</>}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};

export default LoginPage;
