import { useEffect, useState } from "react";
import { HStack, Input, Button, Text, Box } from "@chakra-ui/react";
import Spin from "../ui/spinner";
import { toaster } from "../ui/toaster";
import Loader from "../ui/load";
import { ExitRegisterData } from "@/types/types";
import { useExitRegisterStore } from "@/store/store";
import { DEFAULT_EXIT_DATA } from "@/types/definitions";
import { nameCheck, serialCheck, tagCheck } from "@/utils/functions";
import {
  Bank,
  laptopModels,
  Reassignment,
  Response,
  Status,
} from "@/store/data";
import CustomSelect from "../reusable/customselect";
import { useAuth } from "@/auth/auth";

import { errorMessages } from "@/types/definitions";

const NewExit = () => {
  const { url } = useAuth();
  const [exitData, setExitData] = useState<ExitRegisterData>(DEFAULT_EXIT_DATA);

  const [load, setLoad] = useState(false);
  const [staff, setStaff] = useState(false);
  const { addExit } = useExitRegisterStore();

  const fetchStaffDetails = async () => {
    try {
      const res = await fetch(
        `${url}/api/staffs/getstaff/${exitData.staffId}`,
        { credentials: "include" }
      );

      const data = await res.json();

      data.success && setStaff(false);

      return {
        success: data.success,
        message: data.message,
        staff: data.staff,
      };
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (exitData.staffId.length === 3) {
      setStaff(true);
      const data = async () => {
        const d = await fetchStaffDetails();
        setExitData({
          ...exitData,
          name: d?.staff.name,
          role: d?.staff.role,
          gender: d?.staff.gender,
          classification: d?.staff.classification,
          supervisor: d?.staff.supervisor,
          location: d?.staff.location,
        });
        return d;
      };

      data();
    }
  }, [exitData.staffId]);

  const validateForm = (): boolean => {
    const requiredFields: (keyof ExitRegisterData)[] = [
      "staffId",
      "name",
      "gender",
      "classification",
      "role",
      "location",
      "supervisor",
      "date_Of_Exit",
      "type",
      "model_type",
      "serial_no",
      "tag",
      "ram",
      "monitor_At",
      "response",
      "status",
      "current_custodian",
      "retrieval_Date",
      "reassignment",
    ];

    const emptyFields = requiredFields.filter(
      (field) =>
        !exitData[field] ||
        (typeof exitData[field] === "string" && exitData[field].includes("--"))
    );

    if (emptyFields.length > 0) {
      toaster.create({
        type: "error",
        title: "Required fields are empty",
        description: `Please fill in all fields`,
        duration: 5000,
      });
      return false;
    }

    if (!tagCheck(exitData.tag)) {
      toaster.create({
        type: "error",
        title: "Invalid Tag",
        description: errorMessages.tag,
      });
      return false;
    }

    // Validate serial number format
    if (!serialCheck(exitData.serial_no)) {
      toaster.create({
        type: "error",
        title: "Invalid Serial Number",
        description: errorMessages.serialNumber,
      });
      return false;
    }

    if (!nameCheck(exitData.current_custodian)) {
      toaster.create({
        title: "Input Error",
        type: "error",
        description: errorMessages.name,
      });
      return false;
    }

    return true;
  };

  const handleClear = () => {
    setExitData(DEFAULT_EXIT_DATA);
  };

  const handleSubmitRegister = async (): Promise<void> => {
    setLoad(true);
    try {
      if (!validateForm()) {
        setLoad(false);
        return;
      }

      const { success, message } = await addExit(exitData);

      toaster.create({
        type: success ? "success" : "error",
        title: success ? "Success" : "Error",
        description: message,
      });

      if (success) {
        window.location.replace("../exit");
        handleClear();
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        type: "error",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <Box>
      {staff && <Loader />}

      <Box
        rounded={"md"}
        p={"0.5rem"}
        outline={1}
        w={"max-content"}
        mb={7}
        outlineColor={"black"}
        outlineStyle={"solid"}
      >
        <Text fontWeight={"bold"}>Add New Record</Text>
      </Box>
      {!staff && (
        <form className="grid p-5 grid-cols-3 gap-6 w-full">
          <div className=" gap-10 flex">
            <div>
              <b>Staff ID:</b>
              <Input
                minW={"10rem"}
                type="text"
                disabled={exitData.name.length > 0}
                _disabled={{
                  bg: "gray.300",
                  fontWeight: "bold",
                }}
                value={exitData.staffId}
                placeholder="Staff ID"
                onChange={(e) =>
                  setExitData({ ...exitData, staffId: e.target.value })
                }
              />
            </div>
            <div>
              <b>Gender:</b>

              <Input
                type="text"
                disabled
                _disabled={{
                  bg: "gray.300",
                  fontWeight: "bold",
                }}
                value={exitData.gender}
              />
            </div>
          </div>
          <div>
            <b>Employee name:</b>
            <Input
              type="text"
              disabled
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.name}
              onChange={(e) =>
                setExitData({ ...exitData, name: e.target.value })
              }
            />
          </div>
          <div>
            <b>Classification:</b>
            <Input
              type="text"
              disabled
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.classification}
            />
          </div>
          <div>
            <b>Role:</b>
            <Input
              type="text"
              disabled
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.role}
            />
          </div>
          <div>
            <b>Supervisor</b>
            <Input
              type="text"
              disabled
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.supervisor}
            />
          </div>

          <div>
            <b>Location;</b>
            <Input
              type="text"
              disabled
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.location}
            />
          </div>

          <div>
            <b>Type:</b>

            <CustomSelect
              defaultValue="TYPE" //laptop by default
              value={exitData.type || "TYPE"}
              onChange={(value: any) =>
                setExitData({ ...exitData, type: value })
              }
              options={["LAPTOP", "DESKTOP"]}
            />
          </div>

          <div>
            <b>Model Type:</b>

            <CustomSelect
              defaultValue="MODEL_TYPE"
              value={exitData.model_type || "MODEL_TYPE"}
              onChange={(value) =>
                setExitData({ ...exitData, model_type: value })
              }
              options={laptopModels}
            />
          </div>

          <div>
            <b>Tag:</b>
            <Input
              type="text"
              placeholder="Tag"
              value={exitData.tag}
              onChange={(e) =>
                setExitData({ ...exitData, tag: e.target.value.toUpperCase() })
              }
            />
          </div>
          <div>
            <b>Serial No:</b>
            <Input
              type="text"
              placeholder="Serial No"
              value={exitData.serial_no}
              onChange={(e) =>
                setExitData({
                  ...exitData,
                  serial_no: e.target.value.toUpperCase(),
                })
              }
            />
          </div>

          <div>
            <b>Monitor At:</b>

            <CustomSelect
              defaultValue="MONITOR_AT"
              value={exitData.monitor_At || "MONITOR_AT"}
              onChange={(value) =>
                setExitData({ ...exitData, monitor_At: value })
              }
              options={Bank}
            />
          </div>

          <div>
            <b>Response:</b>

            <CustomSelect
              defaultValue="RESPONSE"
              value={exitData.response || "RESPONSE"}
              onChange={(value) =>
                setExitData({ ...exitData, response: value })
              }
              options={Response}
            />
          </div>

          <div>
            <b>Ram (GB):</b>
            <Input
              type="text"
              placeholder="Ram"
              value={exitData.ram}
              onChange={(e) =>
                setExitData({ ...exitData, ram: e.target.value })
              }
            />
          </div>

          <div>
            <b>Current Custodian</b>
            <Input
              type="text"
              placeholder="Current Custodian"
              value={exitData.current_custodian}
              onChange={(e) =>
                setExitData({
                  ...exitData,
                  current_custodian: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          <div>
            <b>Date of Exit:</b>
            <Input
              type="Date"
              value={exitData.date_Of_Exit.toISOString().substring(0, 10)}
              onChange={(e) =>
                setExitData({
                  ...exitData,
                  date_Of_Exit: new Date(e.target.value),
                })
              }
            />
          </div>
          <div>
            <b>Retrieval Date:</b>
            <Input
              type="Date"
              value={exitData.retrieval_Date.toISOString().substring(0, 10)}
              onChange={(e) =>
                setExitData({
                  ...exitData,
                  retrieval_Date: new Date(e.target.value),
                })
              }
            />
          </div>

          <div>
            <b>Status:</b>
            <CustomSelect
              defaultValue="STATUS"
              value={exitData.status || "STATUS"}
              onChange={(value: any) =>
                setExitData({ ...exitData, status: value })
              }
              options={Status}
            />
          </div>
          <div>
            <b>Reassignment:</b>
            <CustomSelect
              defaultValue="Reassignment"
              value={exitData.reassignment || "REASSIGNMENT"}
              onChange={(value: any) =>
                setExitData({ ...exitData, reassignment: value })
              }
              options={Reassignment}
            />
          </div>

          <div className="col-span-full">
            <HStack>
              <Button
                disabled={load}
                variant={"subtle"}
                minW={"5.6rem"}
                colorPalette={"green"}
                onClick={() => {
                  handleSubmitRegister();
                }}
              >
                {load ? <Spin /> : "Submit"}
              </Button>
              <Button
                colorPalette={"red"}
                variant={"surface"}
                onClick={() => handleClear()}
              >
                Clear
              </Button>
            </HStack>
          </div>
        </form>
      )}
    </Box>
  );
};

export default NewExit;
