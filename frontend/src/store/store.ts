import { create } from "zustand";

const url = "http://localhost:5000";

export const useAssetStore: any = create((set) => ({
  assetStore: [],
  setAssetStore: (assetStore: []) => set({ assetStore }),
  fetchAssets: async () => {
    const res = await fetch(`${url}/api/assets/`);
    const data = await res.json();

    set({ profileProducts: data.product });
  },
  addAsset: async (pid: String, assetData: {}) => {
    const res = await fetch(`${url}/api/asset/add/${pid}`, {
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

    set((state: any) => ({ assetStore: [...state.assetStore, data.asset] }));

    return { success: data.success, message: data.message };
  },
  updateAsset: async (pid: String, updatedAsset: {}) => {
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
      assetStore: state.assetStore.map((asset: any) =>
        asset._id === pid ? data.data : asset
      ),
    }));
    // console.log(profileProducts)
    return { success: data.success, message: data.message };
  },
  deleteAsset: async (pid: String) => {
    const res = await fetch(`${url}/api/assets/delete/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //updates UI immediately without refresh
    set((state: any) => ({
      assetStore: state.assetStore.filter((asset: any) => asset._id !== pid),
    }));
    return { success: true, message: data.message };
  },
}));

export const userStore: any = create((set) => ({
  user: [],
  setUser: (user: []) => set({ user }),
  changePass: async (pid: String, pass: {}) => {
    const res = await fetch(`${url}/api/users/passchg/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pass),
    });
    const data = await res.json();

    if (!res) {
      return { success: false, message: "Unable to communicate with server" };
    }

    return { success: data.success, message: data.message };
  },
}));
