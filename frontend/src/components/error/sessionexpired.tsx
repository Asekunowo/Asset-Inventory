import { useEffect } from "react";
import { toaster, Toaster } from "../ui/toaster";
import useLogout from "@/hooks/useLogout";

const Sessionexpired = () => {
  const { logoutUser } = useLogout();

  useEffect(() => {
    toaster.create({
      type: "info",
      title: "Session Expired",
      description: "Rerouting to login...",
    });

    setTimeout(() => {
      logoutUser();
      window.location.replace("../login");
    }, 5000);
  }, []);

  return (
    <>
      <Toaster />
    </>
  );
};

export default Sessionexpired;
