import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import lang from "./langSlice";

export const store = configureStore({
  reducer: { user,lang },
});
