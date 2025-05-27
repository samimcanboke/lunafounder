import axiosInstance from "../services/AxiosInstance";

const oldMintStore = {
  getOldDistributions: async (page, limit) => {
    try {
      const response = await axiosInstance.get("/admin/old-distributions", {
        params: { page, limit },
      });
      return response.data; // { oldDistributions, totalOldDistributions, totalPages }
    } catch (error) {
      throw error;
    }
  },
};

export default oldMintStore;
