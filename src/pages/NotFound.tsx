import { Button } from "flowbite-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Fragment>
      <div className="flex justify-center items-center w-screen h-screen flex-col">
        <h1 className="mb-6 text-center text-4xl">404 Page Not Found</h1>
        <Link to="/">
          <Button>Back To Home</Button>
        </Link>
      </div>
    </Fragment>
  );
}
