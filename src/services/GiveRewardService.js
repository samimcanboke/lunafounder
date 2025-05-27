import axiosInstance from "./AxiosInstance";

const GiveRewardService = {
  giveReward: async (userId, rewardId, ticket) => {
    try {
      const response = await axiosInstance.get(
        `/admin/give-user-reward/${userId}/${rewardId}/${ticket}`
      );
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error in GiveRewardService:", error);
      throw error;
    }
  },
};

export default GiveRewardService;
