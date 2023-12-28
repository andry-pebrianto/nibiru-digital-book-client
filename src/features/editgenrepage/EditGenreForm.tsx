import { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePutGenre } from "./hooks/usePutGenre";
import { showToastSuccess } from "../../utils/toast";
import { GenrePost } from "../../types";
import { DevTool } from "@hookform/devtools";
import { Button, Label, TextInput } from "flowbite-react";
import Validate from "../../components/Message/Validate";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFetchGenreDetail } from "./hooks/useGetGenre";
import { useUploadReactDropzone } from "../../hooks/useUploadReactDropzone";
import Dropzone from "react-dropzone";
import { Col, Image, Row, Spin } from "antd";
import { FaTrashAlt } from "react-icons/fa";

const schema = yup.object({
  title: yup
    .string()
    .max(50, "Genre title too long")
    .required("Genre Title is required"),
  photo: yup.string().required("Photo is required"),
});

export default function EditGenreForm() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    isLoading,
    isError,
    error,
    data: genre,
  } = useFetchGenreDetail(params.id || "");
  const { mutate, isPending } = usePutGenre(() => {
    navigate("/admin/genre");
    showToastSuccess("Edit Genre Success");
  });
  const { images, setImages, isLoading: isLoadingUpload, handleDrop, removeOne } = useUploadReactDropzone(1);

  const form = useForm<GenrePost>({
    defaultValues: {
      title: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { watch, trigger, setValue, register, control, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;

  useEffect(() => {
    setValue("title", genre?.data?.title);
    setImages([genre?.data?.photo]); // otomatis mentrigger useeffect di bawah
  }, [genre]);

  useEffect(() => {
    setValue("photo", images[0], { shouldDirty: true });
    if (isDirty) {
      trigger("photo");
    }
  }, [images]);

  const onSubmit = (data: GenrePost) => {
    if (params.id) mutate({ data, id: params.id });
  };

  return (
    <Fragment>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl mb-4 font-bold">Edit Genre</h1>
        <Link to={"/admin/genre"} className="text-sky-500">
          <span className="flex items-center mb-2">
            <IoMdArrowRoundBack /> Back
          </span>
        </Link>
        <hr />
        {isLoading ? (
          <div role="status" className="flex justify-center mt-5">
            <svg
              aria-hidden="true"
              className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {isError ? (
              <div className="text-center mt-5">{error.message}</div>
            ) : (
              <form
                className="flex w-full flex-col gap-2 mb-12 mt-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="title" value="Genre Title *" />
                  </div>
                  <TextInput
                    id="title"
                    type="text"
                    placeholder="Genre Title"
                    {...register("title")}
                    helperText={<Validate error={errors.title?.message} />}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="photos" value="Genre Photo *" />
                  </div>
                  <div className="mb-2">
                    <Dropzone
                      maxSize={2000000}
                      onDrop={handleDrop}
                      multiple={false}
                      disabled={
                        isLoadingUpload || isPending || images.length >= 1
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          <p>Drop files here or click to select files</p>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  {isLoadingUpload ? (
                    <div className="text-center">
                      <Spin />
                    </div>
                  ) : (
                    <Image.PreviewGroup
                      preview={{
                        onChange: (current, prev) =>
                          console.log(
                            `current index: ${current}, prev index: ${prev}`
                          ),
                      }}
                    >
                      <Row>
                        {watch("photo") && (
                          <Col xs={4}>
                            <Image
                              width={"100%"}
                              height={"100px"}
                              className="object-cover"
                              src={watch("photo")}
                            />
                            <p
                              className="text-red-600 text-sm flex justify-center cursor-pointer"
                              onClick={() => removeOne()}
                            >
                              <FaTrashAlt />{" "}
                              <span className="-mt-[2px] ml-1">DELETE</span>
                            </p>
                          </Col>
                        )}
                      </Row>
                    </Image.PreviewGroup>
                  )}
                  <Validate error={errors.photo?.message} />
                </div>
                <Button
                  disabled={!isDirty || isLoadingUpload || isPending}
                  className="mt-1 max-w-28"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            )}
          </>
        )}
      </div>

      <DevTool control={control} />
    </Fragment>
  );
}
