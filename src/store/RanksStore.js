import axiosInstance from "../services/AxiosInstance";

const RanksStore = {
  getMyRank: async () => {
    try {
      const response = await axiosInstance.get("/me/my-rank");
      return response.data; // { totalWorth, flatList }
    } catch (error) {
      throw error;
    }
  },
};

export default RanksStore;
