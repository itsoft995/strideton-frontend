// src/features/counter/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = "ru";

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (_, { payload }) => payload,
  },
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;
