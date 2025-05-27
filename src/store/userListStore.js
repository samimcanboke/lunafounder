import axiosInstance from "../services/AxiosInstance";

const userListStore = {
  getUserList: async (page, limit, query = "") => {
    try {
      const response = await axiosInstance.get("/admin/users", {
        params: { page, limit, q: query },
      });
      return response.data; // { users, totalUsers, totalPages }
    } catch (error) {
      throw error;
    }
  },
};

export default userListStore;
