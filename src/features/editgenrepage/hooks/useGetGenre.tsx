import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

const fetchGenreDetail = async (id: string) => {
  const response = await API.get(`/api/v1/admin/genre/${id}`);

  return response.data;
};

export const useFetchGenreDetail = (id: string) => {
  return useQuery({
    queryKey: ["genre-detail"],
    queryFn: () => fetchGenreDetail(id),
  });
};
