import { useState } from "react";
import { FileRejection } from "react-dropzone";
import { API } from "../../utils/api";
import { showToastError } from "../../utils/toast";
import { getError } from "../../utils/error";

export const useUploadReactDropzone = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    const fileAccept = acceptedFiles;
    const fileReject = rejectedFiles;

    if (fileAccept.length + images.length > 6) {
      showToastError("Each book can only have max 6 photo");
    } else {
      if (!fileReject.length) {
        setIsLoading(true);

        const formData = new FormData();
        fileAccept.forEach((image) => formData.append("image", image));

        API.post("/api/v1/upload", formData)
          .then((response) => {
            setImages(images.concat(response.data.data.images));
          })
          .catch((error) => {
            showToastError(getError(error));
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        showToastError(fileReject[0]?.errors[0]?.message);
      }
    }
  };

  const removeOne = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return {
    images,
    isLoading,
    handleDrop,
    removeOne,
  };
};
