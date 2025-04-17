import { create } from "zustand";

const url: string = "http://localhost:5000";

type resData = {
  success: boolean;
  message: string;
  assets?: [];
  repairs?: [];
};

export const useAssetStore: any = create((set) => ({
  assets: [],
  setAssets: (assets: []) => set({ assets }),
  fetchAssets: async () => {
    const res: Response = await fetch(`${url}/api/assets/get`);
    const data: resData = await res.json();

    set({ assets: data.assets });
  },
  addAsset: async (pid: string, assetData: any) => {
    const res = await fetch(`${url}/api/assets/new/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assetData),
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    set((state: any) => ({ assets: [...state.assets, data.asset] }));

    return { success: data.success, message: data.message };
  },
  updateAsset: async (pid: string, updatedAsset: {}) => {
    const res = await fetch(`${url}/api/assets/edit/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAsset),
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    //updates UI immediately without refresh
    set((state: any) => ({
      assets: state.assets.map((asset: any) =>
        asset._id === pid ? data.data : asset
      ),
    }));
    // console.log(profileProducts)
    return { success: data.success, message: data.message };
  },
  deleteAsset: async (pid: string) => {
    const res = await fetch(`${url}/api/assets/delete/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

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
  changePass: async (pid: string, pass: {}) => {
    const res: Response = await fetch(`${url}/api/users/passchg/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pass),
    });
    const data: resData = await res.json();

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    return { success: data.success, message: data.message };
  },
}));

export const useRepairStore: any = create((set) => ({
  repairs: [],
  setRepairs: (repairs: []) => set({ repairs }),
  fetchRepairs: async () => {
    const res: Response = await fetch(`${url}/api/repairs/get`);
    const data: resData = await res.json();

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set({ repairs: data.repairs });
    return { success: data.success, message: data.message };
  },
  addRepair: async (pid: string, repairData: any) => {
    const res = await fetch(`${url}/api/repairs/new/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repairData),
    });

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    const data = await res.json();

    if (data.success === false) {
      return { success: false, message: data.message };
    }

    set((state: any) => ({ repairs: [...state.repairs, data.repair] }));

    return { success: data.success, message: data.message };
  },
  updateRepair: async (pid: string, updatedRepair: {}) => {
    const res = await fetch(`${url}/api/repairs/edit/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRepair),
    });
    const data = await res.json();

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
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //updates UI immediately without refresh
    set((state: any) => ({
      repairs: state.repairs.filter((repair: any) => repair._id !== pid),
    }));
    return { success: true, message: data.message };
  },
}));
