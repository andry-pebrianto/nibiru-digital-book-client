import { API } from "./api";
import { decryptData } from "./encrypt";
import { showToastError } from "./toast";

export async function getNewAccessToken() {
  try {
    const response = await API.get(
      `/api/v1/customer/auth/refresh/${decryptData(
        localStorage.getItem("refreshToken") || ""
      )}`
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    console.log("New Access Token Generated");
  } catch (error) {
    showToastError("Session Has Expired, Please Re-Login");
    localStorage.clear();
  }
}
