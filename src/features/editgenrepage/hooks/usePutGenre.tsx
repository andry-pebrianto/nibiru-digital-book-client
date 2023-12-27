import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GenrePost } from "../../../types";
import { API } from "../../../utils/api";
import { showToastError } from "../../../utils/toast";
import { getError } from "../../../utils/error";

const putGenre = ({ data, id }: { data: GenrePost; id: string }) => {
  return API.put(`/api/v1/admin/genre/${id}`, data);
};

export const usePutGenre = (afterSuccess: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: putGenre,
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
