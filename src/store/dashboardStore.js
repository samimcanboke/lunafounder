import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useUserDashboardStore = create((set) => ({
  userDashboardStats: [],
  loading: false,
  error: null,

  fetchDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("statistics/dashboard");
      set({ userDashboardStats: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error(error);
    }
  },
}));

const useUserLatestSales = create((set) => ({
  latestSales: [],
  loadingLatest: false,
  errorLatest: null,

  fetchLatestSales: async () => {
    set({ loadingLatest: true, errorLatest: null });
    try {
      const response = await axiosInstance.get("statistics/last-sales");
      set({ latestSales: response.data, loadingLatest: false });
      return response.data;
    } catch (error) {
      set({ loadingLatest: false, errorLatest: error.message });
      console.error(error);
    }
  },
}));

export { useUserLatestSales };

export default useUserDashboardStore;
