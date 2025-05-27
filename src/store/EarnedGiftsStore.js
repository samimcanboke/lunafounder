import axiosInstance from "../services/AxiosInstance";

const EarnedGiftsStore = {
  // getMyTickets: async () => {
  //   try {
  //     const response = await axiosInstance.get("/admin/ticket-rewards"); // Ensure the correct endpoint
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching earned gifts:", error);
  //     throw error;
  //   }
  // },

  getMyTickets: async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get("/admin/ticket-rewards", {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching earned gifts:", error);
      throw error;
    }
  },

  updateClaimStatus: async (id) => {
    try {
      const response = await axiosInstance.put(`/admin/ticket-rewards/${id}`, {
        isClaimed: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating claim status:", error);
      throw error;
    }
  },
};

export default EarnedGiftsStore;
