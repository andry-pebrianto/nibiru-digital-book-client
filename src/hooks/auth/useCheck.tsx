import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/api";

const checkAccessToken = async () => {  
  const response = await API.get(`/api/v1/customer/auth/check`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response;
};

export const useCheckAccessToken = () => {
  return useQuery({
    queryKey: ["check-access-token"],
    queryFn: () => checkAccessToken(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    retryOnMount: false,
  });
};
