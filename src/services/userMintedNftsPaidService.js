import axiosInstance from "./AxiosInstance";

const userMintedNftsPaidService = {
  updatePaidStatus: async (nftId, distId, isPaid, txHash) => {
    try {
      const response = await axiosInstance.put(
        `/admin/minted-nfts/${nftId}/${distId}`,
        { isPaid, txHash }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userMintedNftsPaidService;
