import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useUserOldNftsStore = create((set) => ({
  userOldNfts: [],
  loading: false,
  error: null,

  getOldNfts: async (page, limit) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/me/old-nfts", {});
      set({ userOldNfts: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  setOldNftMinted: async (mint, cmId) => {
    try {
      const response = await axiosInstance.post(
        "/nft/save-old-nft-distribution",
        { mint, cmId }
      );
      // console.log("response", response);
      // set({ userOldNfts: response.data });
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  preOldNftDistribution: async (price) => {
    try {
      const response = await axiosInstance.post(
        "/nft/pre-old-nft-distribution",
        { price }
      );
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useUserOldNftsStore;
