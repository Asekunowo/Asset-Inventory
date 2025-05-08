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
import { Toaster, toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";
import Sessionexpired from "../error/sessionexpired";
interface PasswordState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ErrorState {
  same: boolean;
  notmatch: boolean;
}

interface ChangePassword {
  changePass: (password: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => Promise<{ success: boolean; message: string }>;
}

const DEFAULT_PASSWORD_STATE: PasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const Passwordchange = () => {
  const navigate = useNavigate();
  const [expired, setExpired] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, SetLoad] = useState(false);
  const [password, setPassword] = useState(DEFAULT_PASSWORD_STATE);
  const [error, setError] = useState<ErrorState>({
    same: false,
    notmatch: false,
  });

  const { changePass }: ChangePassword = userStore();

  useEffect(() => {
    if (password.newPassword || password.confirmNewPassword) {
      setError((prev) => ({
        ...prev,
        notmatch: password.newPassword !== password.confirmNewPassword,
      }));
    } else if (!password.newPassword && !password.confirmNewPassword) {
      setError((prev) => ({ ...prev, notmatch: false }));
    }
    {
      setError((prev) => ({ ...prev, notmatch: false }));
    }
  }, [password.newPassword, password.confirmNewPassword]);

  const validatePasswords = (): boolean => {
    if (
      !password.oldPassword ||
      !password.newPassword ||
      !password.confirmNewPassword
    ) {
      toaster.create({
        type: "error",
        title: "Please fill all fields",
      });
      return false;
    }

    if (error.notmatch) {
      toaster.create({
        type: "error",
        title: "Passwords do not match",
      });
      return false;
    }

    if (password.oldPassword === password.newPassword) {
      setError((prev) => ({ ...prev, same: true }));
      toaster.create({
        type: "error",
        title: "New password cannot be same as old password",
      });
      return false;
    }

    return true;
  };

  const handlePassChange = async (): Promise<void> => {
    if (!validatePasswords()) return;

    if (!confirm("Are you sure you want to change your password?")) return;

    try {
      SetLoad(true);

      const data = await changePass(password);

      if ("res" in data && data.res === 401) {
        setExpired(true);
        return;
      }

      if (data.success) {
        toaster.create({ type: "success", title: data.message });
        setPassword(DEFAULT_PASSWORD_STATE);
        setTimeout(() => navigate("../"), 500);
      } else {
        toaster.create({ type: "error", title: data.message });
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        type: "error",
        title: "Failed to change password",
        description: "Please try again later",
      });
    } finally {
      SetLoad(false);
    }
  };

  return (
    <Box shadow={"md"} rounded={"md"}>
      {expired && <Sessionexpired />}
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
              type={showPassword ? "text" : "password"}
            />
            <Button
              bg={"transparent"}
              pos={"absolute"}
              variant={"surface"}
              zIndex={2}
              right={0}
              onClick={() => setShowPassword((prevPass) => !prevPass)}
            >
              {showPassword ? (
                <BsEyeSlash size={20} />
              ) : (
                <BsEyeFill size={20} />
              )}
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
              type={showPassword ? "text" : "password"}
            />
            <Button
              bg={"transparent"}
              pos={"absolute"}
              variant={"surface"}
              zIndex={2}
              right={0}
              onClick={() => setShowPassword((prevPass) => !prevPass)}
            >
              {showPassword ? (
                <BsEyeSlash size={20} />
              ) : (
                <BsEyeFill size={20} />
              )}
            </Button>
          </HStack>

          <Field.ErrorText>Passwords do not match</Field.ErrorText>
        </Field.Root>

        <Button disabled={loading} onClick={() => handlePassChange()}>
          Change Password
        </Button>
      </VStack>
    </Box>
  );
};

export default Passwordchange;
