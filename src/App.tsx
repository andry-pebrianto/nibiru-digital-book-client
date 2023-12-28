import { Fragment } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { AxiosError } from "axios";
import Router from "./router";
import store from "./redux/store";
import { showToastError } from "./utils/toast";
import { getError } from "./utils/error";
import "react-toastify/dist/ReactToastify.css";

const queryCLient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.data?.code !== 401) showToastError(getError(error));
      }
    },
  }),
});

export default function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <QueryClientProvider client={queryCLient}>
          <GoogleOAuthProvider clientId="901151632118-i2kjppeplto5aded09fljgilvnhuneme.apps.googleusercontent.com">
            <Router />
          </GoogleOAuthProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </Provider>
      <ToastContainer />
    </Fragment>
  );
}
