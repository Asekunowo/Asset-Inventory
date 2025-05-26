import { Dialog, HStack, Button, Portal, Input } from "@chakra-ui/react";
import { ValidationResult, validateRepairForm } from "./repairsfunctions";
import { DEFAULT_REPAIR_DATA } from "@/types/definitions";
import { toaster } from "../ui/toaster";
import { useState } from "react";
import { repairData } from "@/types/types";
import { LightMode } from "../ui/color-mode";
import CustomSelect from "../reusable/customselect";
import { Bank } from "@/store/data";
const keysToExclude = [
  "_id",
  "createdBy",
  "lastEditedBy",
  "createdAt",
  "updatedAt",
  "__v",
  "entity",
];

const UpdateRepair = ({
  editData,

  setEditData,
  updateRepair,
  deleteRepair,
}: {
  editData: repairData;
  setEditData: any;
  updateRepair: any;
  deleteRepair: any;
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
      const result: ValidationResult = validateRepairForm(data);

      if (!result.isValid) {
        toaster.create({
          type: "error",
          title: `Invalid Input`, // Generic title
          description:
            result.message + ` ${result.field} field` ||
            "Please check your form.",
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
        await updateRepair(pid, data);

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
        await deleteRepair(pid);

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
        size={"lg"}
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
                  <div className="grid grid-cols-3 gap-12 m-20">
                    {Object.keys(editData)
                      .filter((title) => !keysToExclude.includes(title))
                      .map((title) => (
                        <div className="w-[10rem]" key={title}>
                          <b className="uppercase h-20">
                            {title.includes("cost")
                              ? "COST OF REPAIR"
                              : title.replace(/(?<=[a-zA-Z])_/g, " ")}
                          </b>
                          <Input
                            placeholder={title}
                            value={(editData as any)[title]}
                            onChange={(e) =>
                              handleInputChange(
                                title,
                                title.includes("tag") ||
                                  title.includes("serial")
                                  ? e.target.value.toUpperCase()
                                  : e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    <div>
                      <b>ENTITY</b>
                      <CustomSelect
                        defaultValue="ENTITY"
                        value={editData.entity || "ENTITY"}
                        onChange={(value: any) =>
                          setEditData({ ...editData, entity: value })
                        }
                        options={Bank}
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
                  {editData.type} from your records.
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

export default UpdateRepair;
