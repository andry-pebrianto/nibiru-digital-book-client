import { useQuery } from "@tanstack/react-query";
import { API } from "../../../utils/api";

// fetch users search
const fetchListBookAdmin = async (
  search: string,
  genre: string,
  page: string
) => {
  const response = await API.get(
    `/api/v1/admin/book?search=${search}&genre=${genre}&page=${page}`
  );

  return response.data;
};

export const useFetchListBookAdmin = (
  search: string,
  genre: string,
  page: string
) => {
  return useQuery({
    queryKey: ["list-book-admin"],
    queryFn: () => fetchListBookAdmin(search, genre, page),
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};
// fetch users search
