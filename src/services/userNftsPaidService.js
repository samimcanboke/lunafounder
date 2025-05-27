import axiosInstance from "./AxiosInstance";

const userNftsPaidService = {
  updatePaidStatus: async (oldDistributionId, nftId, isPaid) => {
    try {
      const response = await axiosInstance.put(
        `/admin/users-old-nfts/${oldDistributionId}/${nftId}`,
        { isPaid }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userNftsPaidService;
