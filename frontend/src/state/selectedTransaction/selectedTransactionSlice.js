import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const selectedTransactionSlice = createSlice({
  name: "selectedTransaction",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSelectedItem } = selectedTransactionSlice.actions;
export default selectedTransactionSlice.reducer;
``;
