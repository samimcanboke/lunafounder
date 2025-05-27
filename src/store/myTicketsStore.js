import axiosInstance from "../services/AxiosInstance";

const myTicketsStore = {
  getMyTickets: async () => {
    try {
      const response = await axiosInstance.get("/me/my-tickets");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default myTicketsStore;
