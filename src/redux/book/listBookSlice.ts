/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BookCustomer } from "../../types";
import { API } from "../../utils/api";
import { getError } from "../../utils/error";

type initialStateT = {
  data: BookCustomer[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  total: number;
};

const initialState: initialStateT = {
  data: [],
  isLoading: true,
  isError: false,
  error: "",
  total: 0,
};

export const getListBook = createAsyncThunk(
  "list-book",
  async (
    { search, genre, page }: { search: string; genre: string; page: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.get(
        `/api/v1/customer/book?search=${search}&genre=${genre}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ errorMessage: getError(error) });
    }
  }
);

const listBookSlice = createSlice({
  name: "suggested",
  initialState,
  reducers: {}, // tidak diisi karena memakai extraReducers
  extraReducers: (builder) => {
    builder.addCase(getListBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getListBook.fulfilled,
      (
        state,
        action: PayloadAction<{ data: BookCustomer[]; total: number }>
      ) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.total = action.payload.total;
      }
    );
    builder.addCase(
      getListBook.rejected,
      (state, action: PayloadAction<any>) => {
        state.data = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.errorMessage || "Unknown Error Occured";
        state.total = 0;
      }
    );
  },
});

export default listBookSlice.reducer;
