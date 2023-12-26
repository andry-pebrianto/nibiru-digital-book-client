import axios, { AxiosError } from "axios";
import { decryptData } from "./encrypt";
import { showToastError } from "./toast";

export const API = axios.create({
  baseURL: process.env.API_URL,
});

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error instanceof AxiosError) {
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (localStorage.getItem("refreshToken")) {
          originalRequest._retry = true;
  
          try {
            const response = await axios.get(
              `${process.env.API_URL}/api/v1/customer/auth/refresh/${decryptData(
                localStorage.getItem("refreshToken") || ""
              )}`
            );
            localStorage.setItem("accessToken", response.data.accessToken);
            console.log("New Access Token Generated");
  
            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            // Handle refresh token error or redirect to login
            if (localStorage.getItem("refreshToken")) {
              showToastError("Session Has Expired, Please Re-Login");
              localStorage.clear();
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            }
          }
        }
      }
    }

    return Promise.reject(error);
  }
);
