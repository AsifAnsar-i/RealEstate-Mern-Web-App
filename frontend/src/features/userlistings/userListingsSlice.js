import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userListingsService from "./userListingService";

const userlistings = JSON.parse(localStorage.getItem("userlistings"));

const initialState = {
  userlistings: userlistings ? userlistings : null,
  lloading: false,
  Eerror: false,
  Ssuccess: false,
  Mmessage: "",
};

//getUserListing
export const userListing = createAsyncThunk(
    "userListing/Listings",
    async ({ token, userId }, thunkAPI) => {
      try {
        return await userListingsService.userListing(token, userId);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.Mmessage) ||
          error.Mmessage ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



export const userlistingsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.Eerror = false;
      state.lloading = false;
      state.Ssuccess = false;
      state.Mmessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(userListing.pending, (state) => {
        state.lloading = true;
      })
      .addCase(userListing.fulfilled, (state, action) => {
        state.lloading = false;
        state.Ssuccess = true;
        state.userlistings = action.payload;
      })
      .addCase(userListing.rejected, (state, action) => {
        state.Eerror = true;
        state.lloading = false;
        state.Mmessage = action.payload;
        state.userlistings = null;
      });
      
  },
});

export const { reset } = userlistingsSlice.actions;
export default userlistingsSlice.reducer;

