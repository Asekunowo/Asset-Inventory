import { Dialog, HStack, Button, Portal, Input } from "@chakra-ui/react";
import { ValidationResult, validateExitForm } from "./exitfunctions";
import { DEFAULT_REPAIR_DATA } from "@/types/definitions";
import { toaster } from "../ui/toaster";
import { useState } from "react";
import { ExitRegisterData } from "@/types/types";
import CustomSelect from "../reusable/customselect";
import { Reassignment, Response, Status } from "@/store/data";
import { LightMode } from "../ui/color-mode";
const keysToExclude = [
  "_id",
  "createdBy",
  "lastEditedBy",
  "createdAt",
  "updatedAt",
  "__v",
  "employee_id",
  "reassignment_type",
  "response",
  "status",
];

const UpdateExitRegister = ({
  editData,
  setEditData,
  updateExit,
  deleteExit,
}: {
  editData: ExitRegisterData;
  setEditData: any;
  updateExit: any;
  deleteExit: any;
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleInputChange = (title: any, newValue: string) => {
    setEditData((prevEditData: any) => ({
      ...prevEditData,
      [title]: newValue, // Update the specific repair item
    }));
  };

  const handleEdit = async (pid: string): Promise<void> => {
    if (!pid) {
      toaster.create({
        type: "error",
        title: "Please select a record to update",
      });
      return;
    }

    const { _id, createdBy, createdAt, lastEditedBy, ...data } = editData;

    const handleValidationAndToast = (): boolean => {
      const result: ValidationResult = validateExitForm(data);

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
      return;
    }

    const promise = new Promise<string>(async (resolve, reject) => {
      const { success, message }: { success: boolean; message: string } =
        await updateExit(pid, data);

      if (success) {
        resolve(message);
        setIsEditDialogOpen(false);
        setEditData(DEFAULT_REPAIR_DATA);
      } else {
        reject(message);
      }
    });

    toaster.promise(promise, {
      success: {
        title: promise.then((message) => message),
        description: "",
      },
      error: {
        title: "Failed to update record",
        description: promise.catch((message) => message),
      },
      loading: { title: "Update Record...", description: "Please wait" },
    });
  };

  const handleDelete = async (pid: string) => {
    setIsDeleteDialogOpen(false);
    const promise = new Promise<string>(async (resolve, reject) => {
      const { success, message }: { success: boolean; message: string } =
        await deleteExit(pid);

      if (success) {
        setEditData(DEFAULT_REPAIR_DATA);
        resolve(message);
      } else {
        reject(message);
      }
    });

    toaster.promise(promise, {
      success: {
        title: promise.then((message) => message),
        description: "",
      },
      error: {
        title: "Failed to delete record",
        description: promise.catch((message) => message),
      },
      loading: { title: "Deleting Record...", description: "Please wait" },
    });
  };

  return (
    <HStack justifyContent={"flex-end"}>
      <Dialog.Root
        placement={"center"}
        motionPreset="slide-in-bottom"
        size={"xl"}
        open={isEditDialogOpen}
        onOpenChange={(details) => setIsEditDialogOpen(details.open)}
        closeOnInteractOutside={false}
      >
        <Dialog.Trigger asChild disabled={!editData._id}>
          <Button
            variant="outline"
            colorPalette={"green"}
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <LightMode>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Update Record</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <div className="grid grid-cols-4 gap-12 m-20">
                    {Object.keys(editData)
                      .filter((title) => !keysToExclude.includes(title))
                      .map((title) => (
                        <div className="w-[10rem]" key={title}>
                          <b className="uppercase h-20">
                            {title.includes("cost")
                              ? "COST OF REPAIR"
                              : title.includes("number")
                              ? "MONITOR S/N"
                              : title.replace(/(?<=[a-zA-Z])_/g, " ")}
                          </b>
                          <Input
                            placeholder={title}
                            value={(editData as any)[title]}
                            onChange={(e) =>
                              handleInputChange(
                                title,
                                title.includes("tag") ||
                                  title.includes("serial") ||
                                  title.includes("monitor")
                                  ? e.target.value.toUpperCase()
                                  : e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    <div>
                      <b>STATUS</b>

                      <CustomSelect
                        defaultValue="STATUS"
                        value={editData.status || "STATUS"}
                        onChange={(value: any) =>
                          setEditData({ ...editData, status: value })
                        }
                        options={Status}
                      />
                    </div>
                    <div>
                      <b>REASSIGNMENT TYPE</b>
                      <CustomSelect
                        defaultValue="Reassignment"
                        value={editData.reassignment_type || "REASSIGNMENT"}
                        onChange={(value: any) =>
                          setEditData({ ...editData, reassignment_type: value })
                        }
                        options={Reassignment}
                      />
                    </div>
                    <div>
                      <b>RESPONSE</b>

                      <CustomSelect
                        defaultValue="Response"
                        value={editData.response || "Response"}
                        onChange={(value: any) =>
                          setEditData({ ...editData, response: value })
                        }
                        options={Response}
                      />
                    </div>
                  </div>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button onClick={() => handleEdit(editData._id!)}>
                    Update
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </LightMode>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <Dialog.Root
        role="alertdialog"
        open={isDeleteDialogOpen}
        onOpenChange={(details) => setIsDeleteDialogOpen(details.open)}
        closeOnInteractOutside={false}
      >
        <Dialog.Trigger asChild disabled={!editData._id}>
          <Button variant="surface" size="sm" colorPalette={"red"}>
            Delete
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Are you sure?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  This action cannot be undone. This will permanently delete{" "}
                  {editData.employee_name} from your records.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger
                  asChild
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette="red"
                  onClick={() => handleDelete(editData._id!)}
                >
                  Delete
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};

export default UpdateExitRegister;
