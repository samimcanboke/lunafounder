import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useUserReferralsStore = create((set) => ({
  firstline: [],

  // fetch user referral tree
  fetchTree: async () => {
    try {
      const response = await axiosInstance.get("/me/firstline");
      set({ firstline: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserReferralsStore;
