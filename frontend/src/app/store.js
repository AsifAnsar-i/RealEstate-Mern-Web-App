import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listingReducer from "../features/listing/listingSlice";
import userListingsReducer from "../features/userlistings/userListingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    create: listingReducer,
    listing: userListingsReducer,
  },
});
