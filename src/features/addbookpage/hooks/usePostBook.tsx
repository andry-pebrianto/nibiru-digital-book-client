import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookPost } from "../../../types";
import { API } from "../../../utils/api";
import { showToastError } from "../../../utils/toast";
import { getError } from "../../../utils/error";

const postBook = ({ data }: { data: BookPost }) => {
  return API.post("/api/v1/admin/book", data);
};

export const usePostBook = (afterSuccess: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postBook,
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
