// import axiosInstance from "../services/AxiosInstance";

// const RewardStore = {
//   getRewardDetails: async (rewardId) => {
//     try {
//       const response = await axiosInstance.get(`/admin/select-reward-winner/${rewardId}`);
//       return response.data; // Return the reward details
//     } catch (error) {
//       console.error("Error fetching reward details:", error);
//       throw error;
//     }
//   },
// };

// export default RewardStore;




// Assuming this is the existing RewardStore file
 import axiosInstance from "../services/AxiosInstance";

const RewardStore = {

  getRewardDetails: async (rewardId) => {
    try {
      const response = await axiosInstance.get(`/admin/select-reward-winner/${rewardId}`);
      return response.data; // Return the reward details
    } catch (error) {
      console.error("Error fetching reward details:", error);
      throw error;
    }
  },

  // New method for claiming reward
  claimReward: async (userId, rewardId, ticket) => {
    try {
      const response = await axiosInstance.get(`/admin/give-user-reward/${userId}/${rewardId}/${ticket}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default RewardStore
