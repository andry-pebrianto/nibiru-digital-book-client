import { Fragment } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type FormValues = {
  title: string;
  author: string;
  price: string;
  synopsis: string;
};

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
});

export default function AddBoookForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      author: "",
      price: "",
      synopsis: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    setValue,
    watch,
    trigger,
  } = form;
  const { errors, isDirty } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <Fragment>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl mb-4 font-bold">Add Book</h1>
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
              helperText={
                <>
                  {errors.title?.message && (
                    <span className="text-red-400">
                      {errors.title?.message}
                    </span>
                  )}
                </>
              }
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
              helperText={
                <>
                  {errors.author?.message && (
                    <span className="text-red-400">
                      {errors.author?.message}
                    </span>
                  )}
                </>
              }
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
              helperText={
                <>
                  {errors.price?.message && (
                    <span className="text-red-400">
                      {errors.price?.message}
                    </span>
                  )}
                </>
              }
            />
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
                setValue("synopsis", value);
                trigger("synopsis");
              }}
              className="h-48 mb-12"
            />
            {errors.synopsis?.message && (
              <p className="text-red-400 text-sm">{errors.synopsis?.message}</p>
            )}
          </div>
          <Button disabled={!isDirty} className="mt-2 max-w-28" type="submit">
            Submit
          </Button>
        </form>
      </div>

      <DevTool control={control} />
    </Fragment>
  );
}
