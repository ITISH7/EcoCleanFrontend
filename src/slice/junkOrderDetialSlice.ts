import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemDetailType } from "@/utils/types/types";

interface JunkOrderState {
  junkOrderDetails: ItemDetailType[];
}

const initialState: JunkOrderState = {
  junkOrderDetails: [],
};

const junkOrderSlice = createSlice({
  name: "junkOrder",
  initialState,
  reducers: {
    addJunkItem: (state, action: PayloadAction<ItemDetailType>) => {
      state.junkOrderDetails.push(action.payload);
    },
    removeJunkItem: (state, action: PayloadAction<string>) => {
      state.junkOrderDetails = state.junkOrderDetails.filter(
        (order) => order.junkType !== action.payload
      );
    },
    clearJunkOrders: (state) => {
      state.junkOrderDetails = [];
    },
  },
});

export const { addJunkItem, removeJunkItem, clearJunkOrders } = junkOrderSlice.actions;
export default junkOrderSlice.reducer;
