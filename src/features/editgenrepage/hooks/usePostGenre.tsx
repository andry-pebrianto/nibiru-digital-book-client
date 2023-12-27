import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GenrePost } from "../../../types";
import { API } from "../../../utils/api";
import { showToastError } from "../../../utils/toast";
import { getError } from "../../../utils/error";

const postGenre = ({ data }: { data: GenrePost }) => {
  return API.post("/api/v1/admin/genre", data);
};

export const usePostGenre = (afterSuccess: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postGenre,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["list-genre"],
      });
      afterSuccess();
    },
    onError: (error) => {
      showToastError(getError(error));
    },
  });
};
