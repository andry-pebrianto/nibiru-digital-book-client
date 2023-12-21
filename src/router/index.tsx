import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainNav from "../components/MainNav/MainNav";
import MainFoot from "../components/Footer/MainFoot";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/customer/SearchPage";
import LoginPage from "../pages/admin/LoginPage";

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
          <Route path="/search">
            <Route
              index
              element={
                <>
                  <MainNav />
                  <SearchPage />
                  <MainFoot />
                </>
              }
            />
          </Route>
          <Route path="/admin/login">
            <Route
              index
              element={
                <>
                  <LoginPage />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}