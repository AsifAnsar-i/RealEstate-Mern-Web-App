import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import listingService from "./listingService";

const listing = JSON.parse(localStorage.getItem("listing"));

const initialState = {
  listing: listing ? listing : null,
  ifLoading: false,
  ifError: false,
  ifSuccess: false,
  ifMessage: "",
};

export const create = createAsyncThunk(
  "create/listing",
  async ({ userData, token }, thunkAPI) => {
    try {
      return await listingService.create(userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    reset: (state) => {
      state.ifError = false;
      state.ifLoading = false;
      state.ifSuccess = false;
      state.ifMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.ifLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.ifSuccess = true;
        state.listing = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
        state.ifError = true;
        state.ifLoading = false;
        state.ifMessage = action.payload;
        state.listing = null;
      });
  },
});

export const { reset } = listingSlice.actions;
export default listingSlice.reducer;
