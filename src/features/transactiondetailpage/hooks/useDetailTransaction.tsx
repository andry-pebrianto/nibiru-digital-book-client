import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

const fetchDetailTransaction = async (id: string) => {
  const response = await API.get(`/api/v1/customer/transaction/${id}`);

  return response.data;
};

export const useFetchDetailTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction-detail"],
    queryFn: () => fetchDetailTransaction(id),
    refetchOnWindowFocus: false,
  });
};
