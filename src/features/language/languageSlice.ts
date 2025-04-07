import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { LanguageState } from "@/utils/interfaces/typeLanguage";


const initialState: LanguageState = {
  current: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
