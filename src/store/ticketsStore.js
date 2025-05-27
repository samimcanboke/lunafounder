import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useTicketsStore = create((set) => ({
  tickets: [],

  // Fetch tickets from the API
  fetchTickets: async () => {
    try {
      const response = await axiosInstance.get("/ticket");
      set({ tickets: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  },
}));

export default useTicketsStore;
