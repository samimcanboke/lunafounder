import axiosInstance from "../services/AxiosInstance";

const userMintedNftsStore = {
  getMintedNfts: async (page, limit) => {
    try {
      const response = await axiosInstance.get("admin/minted-nfts", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userMintedNftsStore;
