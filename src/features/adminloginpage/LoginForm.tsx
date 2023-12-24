import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { API } from "../../utils/api";
import { encryptData } from "../../utils/encrypt";
import { showToastError, showToastSuccess } from "../../utils/toast";
import { useCheckAccessToken } from "../../hooks/auth/useCheck";
import { getError } from "../../utils/error";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "The password must consist of a minimum of 8 characters, at least one letter and one number"
    ),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { refetch: reCheckAccessToken } = useCheckAccessToken();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await API.post("/api/v1/admin/auth/login", {
        email: data.email,
        password: data.password,
      });

      // save refresh token & access token
      localStorage.setItem("refreshToken", encryptData(response.data.refreshToken));
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("accountType", encryptData("customer"));

      showToastSuccess(response.data.message);
      reCheckAccessToken();
      navigate("/admin/book");
    } catch (error) {
      showToastError(getError(error));
    }
  };

  return (
    <Fragment>
      <div className="max-w-xl mx-6 sm:mx-auto">
        <h1 className="mt-20 text-center text-3xl font-bold mb-6">
          Login As Admin
        </h1>
        <Link to={"/"} className="text-sky-500">
          <span className="flex items-center mb-2">
            <IoMdArrowRoundBack /> Back To Home
          </span>
        </Link>
        <Card className="max-w-full">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="adminEmail" value="Admin Email" />
              </div>
              <TextInput
                id="adminEmail"
                type="email"
                placeholder="example@mail.com"
                {...register("email")}
                helperText={
                  <>
                    {errors.email?.message && (
                      <span className="text-red-400">
                        {errors.email?.message}
                      </span>
                    )}
                  </>
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="adminPassword" value="Admin Password" />
              </div>
              <TextInput
                id="adminPassword"
                type="password"
                {...register("password")}
                helperText={
                  <>
                    {errors.password?.message && (
                      <span className="text-red-400">
                        {errors.password?.message}
                      </span>
                    )}
                  </>
                }
              />
            </div>
            <Button disabled={!isDirty} className="max-w-28" type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </div>

      <DevTool control={control} />
    </Fragment>
  );
}
