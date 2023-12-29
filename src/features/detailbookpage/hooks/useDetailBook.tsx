import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

const fetchDetailBook = async (id: string) => {
  const response = await API.get(`/api/v1/customer/book/${id}`);

  return response.data;
};

export const useFetchDetailBook = (id: string) => {
  return useQuery({
    queryKey: ["book-detail"],
    queryFn: () => fetchDetailBook(id),
    refetchOnWindowFocus: false,
  });
};
