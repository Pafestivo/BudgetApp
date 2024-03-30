import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTransaction: null,
};

const selectedTransactionSlice = createSlice({
  name: "selectedTransaction",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedTransaction = action.payload;
    },
  },
});

export const { setSelectedItem } = selectedTransactionSlice.actions;
export default selectedTransactionSlice.reducer;
