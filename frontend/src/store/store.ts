import { create } from "zustand";
import { SERVER_URI as url } from "@/utils/secrets";
import { movementData as Movement, OtherAsset, resData } from "@/types/types";

export const useAssetStore: any = create((set) => ({
  assets: [],
  setAssets: (assets: []) => set({ assets }),
  fetchAssets: async () => {
    const res: Response = await fetch(`${url}/api/assets/get`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: resData = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ assets: data.assets });
    return { success: true, message: data.message };
  },
  addAsset: async (assetData: any) => {
    const res = await fetch(`${url}/api/assets/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assetData),
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return {
        success: data.success,
        res: 401,
        message: data.message,
      };
    }

    if (res.status === 403) {
      return {
        success: data.success,
        message: data.message,
      };
    }

    if (res.status === 500) {
      return { success: false, message: "Server Error" };
    }

    set((state: any) => ({ assets: [...state.assets, data.asset] }));

    return { success: data.success, message: data.message };
  },
  updateAsset: async (pid: string, updatedAsset: {}) => {
    const res = await fetch(`${url}/api/assets/edit/${pid}`, {
      method: "PUT",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAsset),
    });
    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    //updates UI immediately without refresh
    set((state: any) => ({
      assets: state.assets.map((asset: any) =>
        asset._id === pid ? data.data : asset
      ),
    }));
    return { success: data.success, message: data.message };
  },
  deleteAsset: async (pid: string) => {
    const res = await fetch(`${url}/api/assets/delete/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    //updates UI immediately without refresh
    set((state: any) => ({
      assets: state.assets.filter((asset: any) => asset._id !== pid),
    }));
    return { success: true, message: data.message };
  },
}));

export const userStore: any = create((set) => ({
  user: [],
  setUser: (user: []) => set({ user }),
  changePass: async (pass: {}) => {
    const res: Response = await fetch(`${url}/api/users/passchg`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pass),
    });
    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data: resData = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    return { success: data.success, message: data.message };
  },
}));

export const useRepairStore: any = create((set) => ({
  repairs: [],
  setRepairs: (repairs: []) => set({ repairs }),
  fetchRepairs: async () => {
    const res: Response = await fetch(`${url}/api/repairs/get`, {
      credentials: "include",
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }
    const data: resData = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }
    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }
    set({ repairs: data.repairs });
    return { success: data.success, message: data.message };
  },
  addRepair: async (repairData: any) => {
    const res = await fetch(`${url}/api/repairs/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repairData),
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, message: false };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set((state: any) => ({ repairs: [...state.repairs, data.repair] }));

    return { success: data.success, message: data.message };
  },
  updateRepair: async (pid: string, updatedRepair: {}) => {
    const res = await fetch(`${url}/api/repairs/update/${pid}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRepair),
    });
    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }
    if (!data.success) {
      return { success: false, message: data.message };
    }

    //updates UI immediately without refresh
    set((state: any) => ({
      repairs: state.repairs.map((repair: any) =>
        repair._id === pid ? data.repair : repair
      ),
    }));
    return { success: data.success, message: data.message };
  },
  deleteRepair: async (pid: string) => {
    const res = await fetch(`${url}/api/repairs/delete/${pid}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }
    if (!data.success) return { success: false, message: data.message };

    //updates UI immediately without refresh
    set((state: any) => ({
      repairs: state.repairs.filter((repair: any) => repair._id !== pid),
    }));
    return { success: true, message: data.message };
  },
}));

// Add the store implementation after existing stores
export const useOtherAssetStore: any = create((set) => ({
  others: [],
  setOthers: (others: OtherAsset[]) => set({ others }),

  fetchOthers: async () => {
    try {
      const res = await fetch(`${url}/api/assets/others`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 400) {
        return { success: data.success, message: data.message };
      }

      if (res.status === 401) {
        return { success: false, res: 401, message: data.message };
      }

      if (res.status === 403) {
        return {
          success: false,
          message: "You are not authorized to perform this action",
        };
      }

      set({ others: data.others });
      return { success: true, message: "Others fetched successfully" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },

  addOther: async (otherData: Omit<OtherAsset, "_id">) => {
    const res = await fetch(`${url}/api/assets/addother`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otherData),
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    // Update UI immediately without refresh
    set((state: any) => ({ others: [...state.others, data.other] }));
    return { success: data.success, message: data.message };
  },

  updateOther: async (pid: string, updatedOther: Partial<OtherAsset>) => {
    const res = await fetch(`${url}/api/others/edit/${pid}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOther),
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    // Update UI immediately without refresh
    set((state: any) => ({
      others: state.others.map((other: OtherAsset) =>
        other._id === pid ? { ...other, ...data.other } : other
      ),
    }));
    return { success: data.success, message: data.message };
  },
}));

export const useMovementStore: any = create((set) => ({
  movements: [],
  setMovements: (movements: Movement[]) => set({ movements }),

  fetchMovements: async () => {
    try {
      const res = await fetch(`${url}/api/movements/get`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 400) {
        return { success: data.success, message: data.message };
      }

      if (res.status === 401) {
        return { success: false, res: 401, message: data.message };
      }

      if (res.status === 403) {
        return {
          success: false,
          message: "You are not authorized to perform this action",
        };
      }

      set({ movements: data.movements });
      return { success: true, message: "Exits fetched successfully" };
    } catch (error) {
      console.error("Error fetching movements:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },

  addMovement: async (movementData: Omit<Movement, "_id">) => {
    try {
      const res = await fetch(`${url}/api/movements/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movementData),
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 400) {
        return { success: data.success, message: data.message };
      }
      if (res.status === 401) {
        return { success: false, res: 401, message: data.message };
      }

      if (res.status === 403) {
        return {
          success: false,
          message: "You are not authorized to perform this action",
        };
      }

      set((state: any) => ({ movements: [...state.movements, data.movement] }));
      return { success: true, message: "Exit record created successfully" };
    } catch (error) {
      console.error("Error adding exit:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },
}));

export const useExitRegisterStore: any = create((set) => ({
  exits: [],
  setExits: (exits: any[]) => set({ exits }),

  fetchExits: async () => {
    try {
      const res = await fetch(`${url}/api/exits/get`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 400) {
        return { success: data.success, message: data.message };
      }

      if (res.status === 401) {
        return { success: false, res: 401, message: data.message };
      }

      if (res.status === 403) {
        return {
          success: false,
          message: "You are not authorized to perform this action",
        };
      }

      set({ exits: data.exits });
      return { success: true, message: "Exits fetched successfully" };
    } catch (error) {
      console.error("Error fetching exits:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },

  addExit: async (exitData: any) => {
    try {
      const res = await fetch(`${url}/api/exits/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exitData),
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 400) {
        return { success: data.success, message: data.message };
      }

      if (res.status === 401) {
        return { success: false, res: 401, message: data.message };
      }

      if (res.status === 403) {
        return {
          success: false,
          message: "You are not authorized to perform this action",
        };
      }

      set((state: any) => ({ exits: [...state.exits, data.exit] }));
      return { success: true, message: "Exit registered successfully" };
    } catch (error) {
      console.error("Error adding exit:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },

  updateExit: async (pid: string, updatedExit: any) => {
    try {
      const res = await fetch(`${url}/api/exits/update/${pid}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExit),
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 401) {
        return { success: false, res: 401, message: data.message };
      }

      if (res.status === 403) {
        return {
          success: false,
          message: "You are not authorized to perform this action",
        };
      }

      set((state: any) => ({
        exits: state.exits.map((exit: any) =>
          exit._id === pid ? { ...exit, ...data.exit } : exit
        ),
      }));
      return { success: data.success, message: data.message };
    } catch (error) {
      console.error("Error updating exit:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },

  deleteExit: async (pid: string) => {
    try {
      const res = await fetch(`${url}/api/exits/delete/${pid}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res) {
        return { success: false, message: "Unable to communicate with server" };
      }

      const data = await res.json();

      if (res.status === 401) {
        return { success: false, res: 401, message: data.message };
      }

      if (res.status === 403) {
        return {
          success: false,
          message: "You are not authorized to perform this action",
        };
      }

      set((state: any) => ({
        exits: state.exits.filter((exit: any) => exit._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting exit:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  },
}));
