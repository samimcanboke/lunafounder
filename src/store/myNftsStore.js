import axiosInstance from "../services/AxiosInstance";

const myNftsStore = {
  getMyNfts: async () => {
    try {
      const response = await axiosInstance.get("/me/my-nfts");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default myNftsStore;
