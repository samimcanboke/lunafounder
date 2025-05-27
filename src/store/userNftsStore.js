import axiosInstance from "../services/AxiosInstance";

const userNftsStore = {
  getOldDistributions: async (page, limit) => {
    try {
      const response = await axiosInstance.get("/admin/users-old-nfts", {
        params: { page, limit },
      });
      return response.data; // { users, totalUsers, totalPages }
    } catch (error) {
      throw error;
    }
  },
};

export default userNftsStore;
