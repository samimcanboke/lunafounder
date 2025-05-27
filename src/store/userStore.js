import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useUserStore = create((set, get) => ({
  user: null,
  loginHistory: [],
  loading: false,
  error: null,
  wallet: null,
  walletSet: localStorage.getItem("walletSet") === "true",

  setWallet: async (walletAddress) => {
    try {
      set({ loading: true, error: null });
      await axiosInstance.post("/me/set-wallet", {
        wallet: walletAddress,
      });
      set({ wallet: walletAddress, walletSet: true });
      localStorage.setItem("walletSet", "true");
      // console.log("Wallet set successfully:", walletAddress);
    } catch (error) {
      console.error("Error setting wallet:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/me/profile");
      // console.log(response.data);
      set({
        user: response.data.user,
        loginHistory: response.data.loginHistory,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({ error: error.message, loading: false });
    }
  },

  setUserMintNft: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post("/nft/mint", data);
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.put("/me/profile", data);
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update user settings
  updateSettings: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.put("/users/settings", data);
      set({
        user: { ...useUserStore.getState().user, settings: response.data },
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get user referrals
  getReferrals: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/users/referrals");
      set({
        user: { ...useUserStore.getState().user, referrals: response.data },
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get user rewards
  getRewards: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/users/rewards");
      set({
        user: { ...useUserStore.getState().user, rewards: response.data },
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Clear user data
  clearUser: () => {
    set({ user: null, error: null });
  },

  // Set user data
  setUser: (userData) => {
    set({ user: userData });
  },
}));

export default useUserStore;
