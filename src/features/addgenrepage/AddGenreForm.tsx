import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostGenre } from "./hooks/usePostGenre";
import { showToastSuccess } from "../../utils/toast";
import { GenrePost } from "../../types";
import { DevTool } from "@hookform/devtools";
import { Button, Label, TextInput } from "flowbite-react";
import Validate from "../../components/Message/Validate";
import { IoMdArrowRoundBack } from "react-icons/io";
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

export default function AddGenreForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostGenre(() => {
    navigate("/admin/genre");
    showToastSuccess("Add Genre Success");
  });
  const { images, isLoading: isLoadingUpload, handleDrop, removeOne } = useUploadReactDropzone(1);

  const form = useForm<GenrePost>({
    defaultValues: {
      title: "",
      photo: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { watch, setValue, trigger, register, control, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;

  useEffect(() => {
    setValue("photo", images[0], { shouldDirty: true });
    if (isDirty) {
      trigger("photo");
    }
  }, [images]);

  const onSubmit = (data: GenrePost) => {
    mutate({ data });
  };

  return (
    <Fragment>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl mb-4 font-bold">Add Genre</h1>
        <Link to={"/admin/genre"} className="text-sky-500">
          <span className="flex items-center mb-2">
            <IoMdArrowRoundBack /> Back
          </span>
        </Link>
        <hr />
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
                disabled={isLoadingUpload || isPending || images.length >= 1}
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
      </div>

      {process.env.NODE_ENV !== "prod" && <DevTool control={control} />}
    </Fragment>
  );
}
