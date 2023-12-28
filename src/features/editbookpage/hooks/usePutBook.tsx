import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookPost } from "../../../types";
import { API } from "../../../utils/api";
import { showToastError } from "../../../utils/toast";
import { getError } from "../../../utils/error";

const putBook = ({ data, id }: { data: BookPost; id: string }) => {
  return API.put(`/api/v1/admin/book/${id}`, data);
};

export const usePutBook = (afterSuccess: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: putBook,
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
