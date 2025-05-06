import { create } from "zustand";

const url: string = "http://localhost:5000";

type resData = {
  success: boolean;
  message: string;
  assets?: [];
  repairs?: [];
};

interface OtherAsset {
  _id: string;
  type: string;
  tag: string;
  serial_no: string;
  model: string;
  branch: string;
  vendor: string;
  custodian: {
    firstname: string;
    lastname: string;
  };
}

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
  },
  addAsset: async (assetData: any) => {
    const res = await fetch(`${url}/api/assets/new`, {
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

    if (res.status === 401) {
      return {
        success: false,
        res: 401,

        message: "Token Expired. Please login again ",
      };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    if (res.status === 500) {
      return { success: false, message: "Server Error" };
    }

    const data = await res.json();

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
    const res = await fetch(`${url}/api/repairs/new`, {
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

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
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
    const res = await fetch(`${url}/api/repairs/edit/${pid}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRepair),
    });
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
    if (!data.success) {
      return { success: false, message: data.message };
    }

    //updates UI immediately without refresh
    set((state: any) => ({
      repairs: state.repairs.map((repair: any) =>
        repair._id === pid ? data.data : repair
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
export const useOtherStore = create((set) => ({
  others: [],
  setOthers: (others: OtherAsset[]) => set({ others }),

  fetchOthers: async () => {
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
  },

  addOther: async (otherData: Omit<OtherAsset, "_id">) => {
    const res = await fetch(`${url}/api/assets/newother`, {
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

  deleteOther: async (pid: string) => {
    const res = await fetch(`${url}/api/assets/delete/${pid}`, {
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

    // Update UI immediately without refresh
    set((state: any) => ({
      others: state.others.filter((other: OtherAsset) => other._id !== pid),
    }));
    return { success: data.success, message: data.message };
  },
}));
