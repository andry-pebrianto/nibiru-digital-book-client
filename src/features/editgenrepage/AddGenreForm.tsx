import { Fragment } from "react";
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

const schema = yup.object({
  title: yup
    .string()
    .max(50, "Genre title too long")
    .required("Genre Title is required"),
});

export default function AddGenreForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostGenre(() => {
    navigate("/admin/genre");
    showToastSuccess("Add Genre Success");
  });

  const form = useForm<GenrePost>({
    defaultValues: {
      title: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;

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
          <Button
            disabled={!isDirty || isPending}
            className="mt-1 max-w-28"
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
