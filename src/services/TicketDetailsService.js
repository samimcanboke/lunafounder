import axiosInstance from "./AxiosInstance";

const TicketDetailsService = {
  getTicketDetails: async (collectionMint) => {
    try {
      const response = await axiosInstance.get(
        `/admin/buyed-tickets/${collectionMint}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TicketDetailsService;
