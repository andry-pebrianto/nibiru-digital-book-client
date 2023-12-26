import { Fragment } from "react";

interface ValidateProps {
  error?: string;
}

export default function Validate(props: ValidateProps) {
  return (
    <Fragment>
      {props.error && <span className="text-red-400 text-sm">{props.error}</span>}
    </Fragment>
  );
}
