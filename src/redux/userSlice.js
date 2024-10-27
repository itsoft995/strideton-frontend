// src/features/counter/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, { payload }) => payload,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
