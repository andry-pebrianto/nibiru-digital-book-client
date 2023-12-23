import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/customer/SearchPage";
import DetailBookPage from "../pages/customer/DetailBookPage";
import LoginPage from "../pages/admin/LoginPage";
import ListBookPage from "../pages/admin/ListBookPage";
import EditBookPage from "../pages/admin/EditBookPage";
import AddBookPage from "../pages/admin/AddBookPage";

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
                  <Main>
                    <HomePage />
                  </Main>
                </>
              }
            />
          </Route>
          <Route path="/search">
            <Route
              index
              element={
                <>
                  <Main>
                    <SearchPage />
                  </Main>
                </>
              }
            />
          </Route>
          <Route path="/book/:id">
            <Route
              index
              element={
                <>
                  <Main>
                    <DetailBookPage />
                  </Main>
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
          <Route path="/admin/book">
            <Route
              index
              element={
                <>
                  <Main>
                    <ListBookPage />
                  </Main>
                </>
              }
            />
          </Route>
          <Route path="/admin/book/add">
            <Route
              index
              element={
                <>
                  <Main>
                    <AddBookPage />
                  </Main>
                </>
              }
            />
          </Route>
          <Route path="/admin/book/:id/edit">
            <Route
              index
              element={
                <>
                  <Main>
                    <EditBookPage />
                  </Main>
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
