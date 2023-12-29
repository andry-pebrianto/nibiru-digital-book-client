/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BookAdmin } from "../../types";
import { API } from "../../utils/api";
import { getError } from "../../utils/error";

type initialStateT = {
  data: BookAdmin[];
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: initialStateT = {
  data: [],
  isLoading: true,
  isError: false,
  error: "",
};

export const getCart = createAsyncThunk(
  "cart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/v1/customer/profile/cart`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue({ errorMessage: getError(error) });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {}, // tidak diisi karena memakai extraReducers
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getCart.fulfilled,
      (state, action: PayloadAction<BookAdmin[]>) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      }
    );
    builder.addCase(getCart.rejected, (state, action: PayloadAction<any>) => {
      state.data = [];
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload?.errorMessage || "Unknown Error Occured";
    });
  },
});

export default cartSlice.reducer;
