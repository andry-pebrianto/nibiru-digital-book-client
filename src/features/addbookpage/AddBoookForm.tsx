import { Fragment, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Col, Image, Row, Select, Spin } from "antd";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import "react-quill/dist/quill.snow.css";
import { useFetchListGenre } from "../../hooks/useListGenre";
import { BookPost, Genre } from "../../types";
import { usePostBook } from "./hooks/usePostBook";
import { useUploadReactDropzone } from "../../hooks/useUploadReactDropzone";
import Validate from "../../components/Message/Validate";
import { showToastSuccess } from "../../utils/toast";

const schema = yup.object({
  title: yup.string().max(100, "Title too long").required("Title is required"),
  author: yup
    .string()
    .max(100, "Author too long")
    .required("Author is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Price not valid"),
  synopsis: yup
    .string()
    .required("Synopsis is required")
    .notOneOf(["<p><br></p>"], "Synopsis is required"),
  genre: yup
    .string()
    .required("Genre is required")
    .notOneOf(["Book Genre"], "Genre is required"),
  photos: yup.array().min(1, "Photos is required"),
  file_url: yup.string().required("File url is required"),
});

export default function AddBoookForm() {
  const navigate = useNavigate();
  const { isLoading: isLoadingGenre, data: genres } = useFetchListGenre();
  const { mutate, isPending } = usePostBook(() => {
    navigate("/admin/book");
    showToastSuccess("Add Book Success");
  });
  const { images, isLoading: isLoadingUpload, handleDrop, removeOne } = useUploadReactDropzone(6);

  const form = useForm<BookPost>({
    defaultValues: {
      title: "",
      author: "",
      price: "",
      synopsis: "",
      genre: "Book Genre",
      photos: [],
      file_url: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, setValue, watch, trigger} = form;
  const { errors, isDirty } = formState;

  const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    setValue("photos", images, { shouldDirty: true });
    if (isDirty) {
      trigger("photos");
    }
  }, [images]);

  const onSubmit = (data: BookPost) => {
    mutate({ data });
  };

  return (
    <Fragment>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl mb-4 font-bold">Add Book</h1>
        <Link to={"/admin/book"} className="text-sky-500">
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
              <Label htmlFor="title" value="Book Title *" />
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="Book Title"
              {...register("title")}
              helperText={<Validate error={errors.title?.message} />}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="author" value="Book Author *" />
            </div>
            <TextInput
              id="author"
              type="text"
              placeholder="Book Author"
              {...register("author")}
              helperText={<Validate error={errors.author?.message} />}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="genre" value="Book Genre *" />
            </div>
            <Select
              className="w-full h-10"
              showSearch
              placeholder="Book Genre"
              optionFilterProp="children"
              filterOption={filterOption}
              value={watch("genre")}
              onChange={(value) => {
                setValue("genre", value, { shouldDirty: true });
                trigger("genre");
              }}
              loading={isLoadingGenre}
              options={
                genres
                  ? genres.data.map((genre: Genre) => ({
                      label: genre.title,
                      value: genre.id,
                    }))
                  : []
              }
            />
            <Validate error={errors.genre?.message} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file_url" value="Book Pdf *" />
            </div>
            <TextInput
              id="file_url"
              type="text"
              placeholder="Book Pdf"
              {...register("file_url")}
              helperText={<Validate error={errors.file_url?.message} />}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Book Price (IDR) *" />
            </div>
            <TextInput
              id="price"
              type="string"
              placeholder="Book Price"
              {...register("price")}
              helperText={<Validate error={errors.price?.message} />}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="photos" value="Book Photos *" />
            </div>
            <div className="mb-2">
              <Dropzone
                maxSize={2000000}
                onDrop={handleDrop}
                multiple={true}
                disabled={isLoadingUpload || isPending || images.length >= 6}
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
                  {watch("photos")?.map((photo, index) => (
                    <Col key={index} xs={4}>
                      <Image
                        width={"100%"}
                        height={"100px"}
                        className="object-cover"
                        src={photo}
                      />
                      <p
                        className="text-red-600 text-sm flex justify-center cursor-pointer"
                        onClick={() => removeOne(index)}
                      >
                        <FaTrashAlt />{" "}
                        <span className="-mt-[2px] ml-1">DELETE</span>
                      </p>
                    </Col>
                  ))}
                </Row>
              </Image.PreviewGroup>
            )}
            <Validate error={errors.photos?.message} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="synopsis" value="Synopsis *" />
            </div>
            <ReactQuill
              id="synopsis"
              theme="snow"
              value={watch("synopsis")}
              onChange={(value) => {
                setValue("synopsis", value, { shouldDirty: true });
                trigger("synopsis");
              }}
              className="h-48 mb-12"
            />
            <Validate error={errors.synopsis?.message} />
          </div>
          <Button
            disabled={!isDirty || isLoadingUpload || isPending}
            className="mt-2 max-w-28"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>

      <DevTool control={control} />
    </Fragment>
  );
}
