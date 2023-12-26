import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/api";

const fetchListGenre = async () => {
  const response = await API.get(`/api/v1/admin/genre`);

  return response.data;
};

export const useFetchListGenre = () => {
  return useQuery({
    queryKey: ["list-genre"],
    queryFn: () => fetchListGenre(),
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};
