import axiosInstance from "./AxiosInstance";

const OldDistributionService = {
  updatePaidStatus: async (distributionId, nftId, isPaid) => {
    try {
      const response = await axiosInstance.put(
        `/admin/old-distributions/${distributionId}/${nftId}`,
        { isPaid }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update paid status:", error);
      throw error;
    }
  },

  getOldDistributions: async (page, itemsPerPage) => {
    try {
      const response = await axiosInstance.get(
        `/admin/old-distributions?page=${page}&limit=${itemsPerPage}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch old distributions:", error);
      throw error;
    }
  },
};

export default OldDistributionService;
