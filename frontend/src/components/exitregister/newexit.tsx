import { useEffect, useState } from "react";
import { HStack, Input, Button, Text, Box } from "@chakra-ui/react";
import Spin from "../ui/spinner";
import { toaster } from "../ui/toaster";
import Loader from "../ui/load";
import { ExitRegisterData } from "@/types/types";
import { useExitRegisterStore } from "@/store/store";
import { DEFAULT_EXIT_DATA } from "@/types/definitions";
import { formatDate } from "@/utils/functions";
import { validateExitForm, ValidationResult } from "./exitfunctions";
import {
  Gender,
  laptopModels,
  Reassignment,
  Response,
  Status,
} from "@/store/data";
import CustomSelect from "../reusable/customselect";
import { useAuth } from "@/auth/auth";

import { useNavigate } from "react-router-dom";

const NewExit = () => {
  const navigate = useNavigate();
  const { url } = useAuth();
  const [exitData, setExitData] = useState<ExitRegisterData>(DEFAULT_EXIT_DATA);

  const [load, setLoad] = useState<boolean>(false);
  const [staff, setStaff] = useState<
    { isExists: boolean; load: boolean } | any
  >({
    isExists: true,
    load: false,
  });
  const { addExit } = useExitRegisterStore();

  const fetchStaffDetails = async () => {
    try {
      const res = await fetch(
        `${url}/api/staffs/getstaff/${exitData.employee_id}`,
        { credentials: "include" }
      );

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        staff: data.staff,
      };
    } catch (error: any) {
      setStaff({ ...staff, load: false });
      console.error(error);
    }
  };

  useEffect(() => {
    if (exitData.employee_id.length === 3) {
      setStaff({ ...staff, load: true });
      const data = async () => {
        const d = await fetchStaffDetails();
        if (d?.success === false) {
          setStaff({ isExists: false, load: false });
          return toaster.create({
            type: "error",
            title: "Staff Details not found",
            description: "Proceed to enter staff details",
          });
        }
        setExitData({
          ...exitData,
          employee_name: d?.staff.employee_name,
          role: d?.staff.role,
          gender: d?.staff.gender,
          classification: d?.staff.classification,
          supervisor: d?.staff.supervisor,
          location: d?.staff.location,
        });
        d?.success && setStaff({ isExists: true, load: false });

        return d;
      };

      data();
    }
  }, [exitData.employee_id]);

  const handleClear = () => {
    setExitData(DEFAULT_EXIT_DATA);
  };

  const handleSubmitRegister = async (): Promise<void> => {
    setLoad(true);
    try {
      const handleValidationAndToast = (): boolean => {
        const result: ValidationResult = validateExitForm(exitData);

        if (!result.isValid) {
          toaster.create({
            type: "error",
            title: `Invalid Input`, // Generic title
            description:
              `Please check the ${result.field
                ?.replace(/(?<=[a-zA-Z])_/g, " ")
                .toUpperCase()} field ` || "Please check your form.",
            duration: 3000,
          });
          return false;
        }
        return true;
      };

      if (!handleValidationAndToast()) {
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
        navigate("../");
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
      {staff.load && <Loader />}

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
      {!staff.load && (
        <form className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5 gap-8 w-full">
          <div className=" gap-4 flex justify-between col-span-full xl:col-span-1">
            <div className="">
              <b>Period:</b>
              <Input
                minW={"5rem"}
                type="text"
                value={exitData.period}
                placeholder="Period"
                onChange={(e) =>
                  setExitData({
                    ...exitData,
                    period: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div className="">
              <b>Employee ID:</b>
              <Input
                minW={"7rem"}
                type="text"
                disabled={exitData.employee_name.length > 0}
                _disabled={{
                  bg: "gray.300",
                  fontWeight: "bold",
                }}
                value={exitData.employee_id}
                placeholder="Staff ID"
                onChange={(e) =>
                  setExitData({ ...exitData, employee_id: e.target.value })
                }
              />
            </div>

            <div>
              <b>Gender:</b>
              <CustomSelect
                disabled={staff.isExists}
                defaultValue="GENDER"
                value={exitData.gender || "GENDER"}
                onChange={(value) =>
                  setExitData({ ...exitData, gender: value })
                }
                options={Gender}
              />
            </div>
          </div>
          <div>
            <b>Employee name:</b>
            <Input
              type="text"
              disabled={staff.isExists}
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.employee_name}
              onChange={(e) =>
                setExitData({ ...exitData, employee_name: e.target.value })
              }
            />
          </div>
          <div>
            <b>Classification:</b>
            <Input
              type="text"
              disabled={staff.isExists}
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
              disabled={staff.isExists}
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.role}
            />
          </div>
          <div>
            <b>Supervisor:</b>
            <Input
              type="text"
              disabled={staff.isExists}
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.supervisor}
            />
          </div>

          <div>
            <b>Location:</b>
            <Input
              type="text"
              disabled={staff.isExists}
              _disabled={{
                bg: "gray.300",
                fontWeight: "bold",
              }}
              value={exitData.location}
            />
          </div>
          <div className=" gap-4 flex justify-between">
            <div>
              <b>System Type:</b>

              <CustomSelect
                defaultValue="TYPE" //laptop by default
                value={exitData.system_type || "TYPE"}
                onChange={(value: any) =>
                  setExitData({ ...exitData, system_type: value })
                }
                options={["LAPTOP", "DESKTOP"]}
              />
            </div>

            <div>
              <b>Model:</b>

              <CustomSelect
                defaultValue="MODEL"
                value={exitData.model || "MODEL"}
                onChange={(value) => setExitData({ ...exitData, model: value })}
                options={laptopModels}
              />
            </div>
          </div>
          <div className=" gap-4 flex justify-between">
            <div className="">
              <b>Ram Size:</b>
              <Input
                minW={"5rem"}
                maxW={"7rem"}
                type="text"
                placeholder="Ram"
                value={exitData.ram_size}
                onChange={(e) =>
                  setExitData({ ...exitData, ram_size: e.target.value })
                }
              />
            </div>
            <div className="w-44">
              <b>Tag:</b>
              <Input
                type="text"
                placeholder="Tag"
                value={exitData.tag}
                onChange={(e) =>
                  setExitData({
                    ...exitData,
                    tag: e.target.value.toUpperCase(),
                  })
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
          </div>

          <div>
            <b>Monitor Asset Tag:</b>
            <Input
              type="text"
              placeholder="Monitor Asset Tag"
              value={exitData.monitor_At?.toString()}
              onChange={(e) =>
                setExitData({
                  ...exitData,
                  monitor_At: e.target.value.toUpperCase(),
                })
              }
            />
          </div>

          <div>
            <b>Monitor Serial Number:</b>
            <Input
              type="text"
              placeholder="Monitor SERIAL NUMBER"
              value={exitData.monitor_serial_number}
              onChange={(e) =>
                setExitData({
                  ...exitData,
                  monitor_serial_number: e.target.value.toUpperCase(),
                })
              }
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
            <b>Current Custodian:</b>
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
              value={formatDate(exitData.date_Of_Exit)}
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
              value={formatDate(exitData.retrieval_Date)}
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
              value={exitData.reassignment_type || "REASSIGNMENT"}
              onChange={(value: any) =>
                setExitData({ ...exitData, reassignment_type: value })
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
