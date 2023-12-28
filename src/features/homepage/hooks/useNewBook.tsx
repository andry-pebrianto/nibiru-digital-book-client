import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

const fetchListNewBook = async () => {
  const response = await API.get(`/api/v1/customer/book/new`);

  return response.data;
};

export const useFetchListNewBook = () => {
  return useQuery({
    queryKey: ["list-new-book"],
    queryFn: () => fetchListNewBook(),
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};
