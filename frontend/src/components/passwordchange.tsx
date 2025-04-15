import { userStore } from "@/store/store";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Toaster, toaster } from "./ui/toaster";
import { useNavigate, useOutletContext } from "react-router-dom";

const Passwordchange = () => {
  const [id]: String = useOutletContext();

  const navigate = useNavigate();

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { changePass } = userStore();

  const [pass, showPass] = useState<Boolean>(true);

  const handlePassChange = async (pid: String) => {
    if (!confirm("Are yu sure you want to change your password?")) {
      return;
    }

    const { success, message } = await changePass(pid, password);

    toaster.create({
      type: success ? "success" : "error",
      description: message,
    });

    navigate("../");
  };

  return (
    <Box>
      <Toaster />
      <VStack
        spaceY={4}
        bg={"white"}
        p={10}
        w={"full"}
        rounded={"md"}
        alignItems={"center"}
      >
        <Input
          w={"sm"}
          placeholder="Old Password"
          value={password.oldPassword}
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
          type="password"
        />

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

        <Button colorPalette={"blue"} onClick={() => handlePassChange(id)}>
          Change Password
        </Button>
      </VStack>
    </Box>
  );
};

export default Passwordchange;
