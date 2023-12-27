import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../utils/api";
import { showToastError } from "../../../utils/toast";
import { getError } from "../../../utils/error";

const deleteGenre = ({ id }: { id: string }) => {
  return API.delete(`/api/v1/admin/genre/${id}`);
};

export const useDeleteGenre = (afterSuccess: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: deleteGenre,
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
