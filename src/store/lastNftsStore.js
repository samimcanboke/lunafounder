import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useLastNftsStore = create((set) => ({
  lastNfts: [],
  // fetch the most recent NFTs, only add ?dev=true when isDev=true
  fetchLastNfts: async (isDev = false) => {
    try {
      const endpoint = isDev
        ? "/nft/last-nfts?dev=true"
        : "/nft/last-nfts";
      const response = await axiosInstance.get(endpoint);
      set({ lastNfts: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch last NFTs:", error);
    }
  },
}));

export default useLastNftsStore;
