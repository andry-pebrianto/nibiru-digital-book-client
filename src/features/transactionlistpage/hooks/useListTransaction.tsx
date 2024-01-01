import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

const fetchListTransaction = async () => {
  const response = await API.get(`/api/v1/customer/transaction`);

  return response.data;
};

export const useFetchListTransaction = () => {
  return useQuery({
    queryKey: ["list-transaction"],
    queryFn: () => fetchListTransaction(),
    staleTime: 10000,
  });
};
