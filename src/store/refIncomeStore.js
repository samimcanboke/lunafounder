import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useRefIncomeStore = create((set) => ({
  refIncome: { total: 0, data: [] },
  fetchRefIncome: async (isDev = false) => {
    try {
      const endpoint = isDev ? "/me/ref-income?dev=true" : "/me/ref-income";
      const response = await axiosInstance.get(endpoint);
      set({ refIncome: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch referral income:", error);
    }
  },
}));

export default useRefIncomeStore;
