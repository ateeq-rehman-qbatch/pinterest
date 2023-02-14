import { configureStore } from "@reduxjs/toolkit";
import pinSlice from "../slices/pinSlice";
import authSlice from "../slices/authSlice";

export const store = configureStore({
    reducer: {
      pins: pinSlice,
      auth: authSlice
    },
  })
