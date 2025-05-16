import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Field,
  VStack,
} from "@chakra-ui/react";
import { userStore } from "@/store/store";
import { IEyeOpen, IEyeClose } from "@/store/icons";
import { toaster } from "../ui/toaster";
import Sessionexpired from "../error/sessionexpired";
import { ErrorState } from "@/types/types";
import {
  DEFAULT_ERROR_STATE,
  DEFAULT_PASSWORD_STATE,
} from "@/types/definitions";

const Passwordchange = () => {
  const navigate = useNavigate();

  const [expired, setExpired] = useState<boolean>(false);
  const [loading, SetLoad] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState(DEFAULT_PASSWORD_STATE);
  const [error, setError] = useState<ErrorState>(DEFAULT_ERROR_STATE);

  const { changePass } = userStore();

  useEffect(() => {
    if (password.newPassword || password.confirmNewPassword) {
      setError({
        ...error,
        notmatch: password.newPassword !== password.confirmNewPassword,
      });
    } else if (!password.newPassword && !password.confirmNewPassword) {
      setError((prev) => ({ ...prev, notmatch: false }));
    } else {
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

        <Field.Root invalid={error.same || error.notmatch}>
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
              ring={0}
              variant={"surface"}
              zIndex={2}
              right={0}
              onClick={() => setShowPassword((prevPass) => !prevPass)}
            >
              {showPassword ? <IEyeClose size={20} /> : <IEyeOpen size={20} />}
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
              ring={0}
              variant={"surface"}
              zIndex={2}
              right={0}
              onClick={() => setShowPassword((prevPass) => !prevPass)}
            >
              {showPassword ? <IEyeClose size={20} /> : <IEyeOpen size={20} />}
            </Button>
          </HStack>

          <Field.ErrorText>Passwords do not match</Field.ErrorText>
        </Field.Root>

        <Button
          disabled={loading || error.same || error.notmatch}
          onClick={() => handlePassChange()}
        >
          Change Password
        </Button>
      </VStack>
    </Box>
  );
};

export default Passwordchange;
