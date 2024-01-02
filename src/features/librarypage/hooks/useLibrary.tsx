import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

const fetchListLibrary = async () => {
  const response = await API.get(`/api/v1/customer/book/collection`);

  return response.data;
};

export const useFetchListLibrary = () => {
  return useQuery({
    queryKey: ["list-library"],
    queryFn: () => fetchListLibrary(),
    staleTime: 10000,
  });
};
