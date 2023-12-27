import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../utils/api";
import { showToastError } from "../../../utils/toast";
import { getError } from "../../../utils/error";

const deleteBook = ({ id }: { id: string }) => {
  return API.delete(`/api/v1/admin/book/${id}`);
};

export const useDeleteBook = (afterSuccess: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["list-book-admin"],
      });
      afterSuccess();
    },
    onError: (error) => {
      showToastError(getError(error));
    },
  });
};
