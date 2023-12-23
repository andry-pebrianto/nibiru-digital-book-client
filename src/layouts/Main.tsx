import { Fragment, ReactNode } from "react";
import MainNav from "../components/MainNav/MainNav";
import MainFoot from "../components/Footer/MainFoot";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <MainNav />
      {children}
      <MainFoot />
    </Fragment>
  );
}
