import { userStore } from "@/store/store";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Field,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Toaster, toaster } from "./ui/toaster";
import { useNavigate, useOutletContext } from "react-router-dom";
import Spin from "./spinner";

const Passwordchange = () => {
  const [id]: string = useOutletContext();

  const navigate = useNavigate();
  const [pass, showPass] = useState<boolean>(false);
  const [load, SetLoad] = useState(false);
  const [error, setError] = useState({
    same: false,
    notmatch: false,
  });

  const { changePass } = userStore();

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (
      password.newPassword &&
      password.newPassword !== password.confirmNewPassword
    ) {
      setError({ ...error, notmatch: true });
    } else {
      setError({ ...error, notmatch: false });
    }
  }, [password]);

  const handlePassChange = async (pid: string) => {
    if (
      !password.oldPassword &&
      !password.newPassword &&
      !password.confirmNewPassword
    ) {
      toaster.create({
        type: "error",
        description: "Please fill all the fields",
        duration: 2000,
      });
      return;
    }
    if (error.notmatch) {
      toaster.create({
        type: "error",
        description: "Passwords do not match",
        duration: 1500,
      });
      return;
    }
    if (password.oldPassword === password.newPassword) {
      setError({ ...error, same: true });
      toaster.create({
        type: "error",
        description: "New password cannot be same as old password",
        duration: 1500,
      });
      return;
    }

    if (!confirm("Are you sure you want to change your password?")) {
      return;
    }

    SetLoad(true);

    const { success, message } = await changePass(pid, password);

    success &&
      setTimeout(() => {
        SetLoad(false);
        navigate("../");
        toaster.create({
          type: success ? "success" : "error",
          description: message,
        });
      }, 1500);

    success &&
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
  };

  return (
    <Box>
      {load && (
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
      )}
      <Toaster />
      <VStack
        spaceY={4}
        bg={"white"}
        p={10}
        w={"full"}
        rounded={"md"}
        alignItems={"center"}
      >
        <Heading size={"2xl"} fontWeight={"bold"}>
          Change Password
        </Heading>
        <Input
          w={"sm"}
          placeholder="Old Password"
          value={password.oldPassword}
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
          type="password"
        />

        <Field.Root invalid={error.same}>
          <HStack position={"relative"}>
            <Input
              w={"sm"}
              placeholder="New Password"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
              type={pass ? "text" : "password"}
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
          {password.oldPassword &&
            password.oldPassword === password.newPassword && (
              <Field.ErrorText>
                New password cannot be same as old password
              </Field.ErrorText>
            )}
        </Field.Root>
        <Field.Root invalid={error.notmatch}>
          <HStack position={"relative"}>
            <Input
              w={"sm"}
              placeholder="Confirm new Password"
              value={password.confirmNewPassword}
              onChange={(e) =>
                setPassword({ ...password, confirmNewPassword: e.target.value })
              }
              type={pass ? "text" : "password"}
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

          <Field.ErrorText>Passwords do not match</Field.ErrorText>
        </Field.Root>

        <Button colorPalette={"blue"} onClick={() => handlePassChange(id)}>
          Change Password
        </Button>
      </VStack>
    </Box>
  );
};

export default Passwordchange;
