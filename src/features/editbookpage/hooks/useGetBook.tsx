import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

const fetchBookDetail = async (id: string) => {
  const response = await API.get(`/api/v1/admin/book/${id}`);

  return response.data;
};

export const useFetchBookDetail = (id: string) => {
  return useQuery({
    queryKey: ["book-detail"],
    queryFn: () => fetchBookDetail(id),
    refetchOnWindowFocus: false,
  });
};
