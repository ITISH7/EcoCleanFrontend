import { Address } from "@/utils/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
  selectedAddressDetails: Address|null;
}

const initialState: AddressState = {
  selectedAddressDetails:null,
};

const addressSlice = createSlice({
    name: "selectedAddressDetails",
    initialState,
    reducers: {
        setSelectedAddressDetails: (state, action: PayloadAction<Address>) => {
        state.selectedAddressDetails = action.payload;
        },
        clearSelectedAddressDetails: (state) => {
        state.selectedAddressDetails = null;
        }
    },
})

export const { setSelectedAddressDetails,clearSelectedAddressDetails } = addressSlice.actions;
export default addressSlice.reducer;