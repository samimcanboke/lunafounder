import axiosInstance from "./AxiosInstance";

export async function buyWithCreditCard(publicKey) {
  const response = await axiosInstance.post("/nft/buy-with-card", { publicKey });
  return response.data;
}
