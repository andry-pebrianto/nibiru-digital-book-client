import { Fragment, ReactNode } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Spin } from "antd";
import Main from "../layouts/Main";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/customer/SearchPage";
import DetailBookPage from "../pages/customer/DetailBookPage";
import LoginPage from "../pages/admin/LoginPage";
import ListBookPage from "../pages/admin/ListBookPage";
import AddBookPage from "../pages/admin/AddBookPage";
import EditBookPage from "../pages/admin/EditBookPage";
import ListGenrePage from "../pages/admin/ListGenrePage";
import AddGenrePage from "../pages/admin/AddGenrePage";
import EditGenrePage from "../pages/admin/EditGenrePage";
import TransactionDetailPage from "../pages/customer/TransactionDetailPage";
import TransactionListPage from "../pages/customer/TransactionListPage";
import CollectionListPage from "../pages/customer/CollectionListPage";
import { useCheckAccessToken } from "../hooks/useCheck";
import { decryptData } from "../utils/encrypt";

export default function Router() {
  const { isFetchedAfterMount } = useCheckAccessToken();

  function OnlyLoggedAndCustomer({ children }: { children: ReactNode }) {
    if (!localStorage.getItem("refreshToken")) {
      return <Navigate to={"/"} />;
    }
    if (decryptData(localStorage.getItem("accountType") || "") === "admin") {
      return <Navigate to={"/admin/book"} />;
    }

    return children;
  }

  function OnlyLoggedAndAdmin({ children }: { children: ReactNode }) {
    if (!localStorage.getItem("refreshToken")) {
      return <Navigate to={"/"} />;
    }
    if (decryptData(localStorage.getItem("accountType") || "") === "customer") {
      return <Navigate to={"/"} />;
    }

    return children;
  }

  function OnlyGuestAndCustomer({ children }: { children: ReactNode }) {
    if (decryptData(localStorage.getItem("accountType") || "") === "admin") {
      return <Navigate to={"/admin/book"} />;
    }

    return children;
  }

  function OnlyGuest({ children }: { children: ReactNode }) {
    if (localStorage.getItem("refreshToken")) {
      return <Navigate to={"/"} />;
    }

    return children;
  }

  return (
    <Fragment>
      {!isFetchedAfterMount && (
        <div className="w-screen h-screen flex justify-center items-center bg-[#D8D9DA]">
          <Spin size="large" className="w-96 scale-150" />
        </div>
      )}

      {isFetchedAfterMount && (
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <OnlyGuestAndCustomer>
                    <Main>
                      <HomePage />
                    </Main>
                  </OnlyGuestAndCustomer>
                }
              />
            </Route>
            <Route path="/search">
              <Route
                index
                element={
                  <OnlyLoggedAndCustomer>
                    <Main>
                      <SearchPage />
                    </Main>
                  </OnlyLoggedAndCustomer>
                }
              />
            </Route>
            <Route path="/book/:id">
              <Route
                index
                element={
                  <OnlyLoggedAndCustomer>
                    <Main>
                      <DetailBookPage />
                    </Main>
                  </OnlyLoggedAndCustomer>
                }
              />
            </Route>
            <Route path="/transaction/:id">
              <Route
                index
                element={
                  <OnlyLoggedAndCustomer>
                    <Main>
                      <TransactionDetailPage />
                    </Main>
                  </OnlyLoggedAndCustomer>
                }
              />
            </Route>
            <Route path="/transaction">
              <Route
                index
                element={
                  <OnlyLoggedAndCustomer>
                    <Main>
                      <TransactionListPage />
                    </Main>
                  </OnlyLoggedAndCustomer>
                }
              />
            </Route>
            <Route path="/library">
              <Route
                index
                element={
                  <OnlyLoggedAndCustomer>
                    <Main>
                      <CollectionListPage />
                    </Main>
                  </OnlyLoggedAndCustomer>
                }
              />
            </Route>
            <Route path="/admin/login">
              <Route
                index
                element={
                  <OnlyGuest>
                    <LoginPage />
                  </OnlyGuest>
                }
              />
            </Route>
            <Route path="/admin/book">
              <Route
                index
                element={
                  <OnlyLoggedAndAdmin>
                    <Main>
                      <ListBookPage />
                    </Main>
                  </OnlyLoggedAndAdmin>
                }
              />
            </Route>
            <Route path="/admin/book/add">
              <Route
                index
                element={
                  <OnlyLoggedAndAdmin>
                    <Main>
                      <AddBookPage />
                    </Main>
                  </OnlyLoggedAndAdmin>
                }
              />
            </Route>
            <Route path="/admin/book/:id/edit">
              <Route
                index
                element={
                  <OnlyLoggedAndAdmin>
                    <Main>
                      <EditBookPage />
                    </Main>
                  </OnlyLoggedAndAdmin>
                }
              />
            </Route>
            <Route path="/admin/genre">
              <Route
                index
                element={
                  <OnlyLoggedAndAdmin>
                    <Main>
                      <ListGenrePage />
                    </Main>
                  </OnlyLoggedAndAdmin>
                }
              />
            </Route>
            <Route path="/admin/genre/add">
              <Route
                index
                element={
                  <OnlyLoggedAndAdmin>
                    <Main>
                      <AddGenrePage />
                    </Main>
                  </OnlyLoggedAndAdmin>
                }
              />
            </Route>
            <Route path="/admin/genre/:id/edit">
              <Route
                index
                element={
                  <OnlyLoggedAndAdmin>
                    <Main>
                      <EditGenrePage />
                    </Main>
                  </OnlyLoggedAndAdmin>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </Fragment>
  );
}
