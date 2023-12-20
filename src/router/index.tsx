import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainNav from "../components/MainNav/MainNav";
import HomePage from "../pages/HomePage";
import MainFoot from "../components/Footer/MainFoot";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <>
                  <MainNav />
                  <HomePage />
                  <MainFoot />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}