import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterType={
    minPrice:string,
    maxPrice:string,
    startDate:string,
    endDate:string,
    status:string
}
const initialState:FilterType={
    minPrice: "",
    maxPrice: "",
    startDate:"",
    endDate:"",
    status:"",
  }

const filterSlice = createSlice({
    name:"filterCard",
    initialState,
    reducers:{
        setFilter:(state, action:PayloadAction<FilterType>)=>{
           return {...state,...action.payload}
        },
        resetFilter:()=> initialState
    }
})
export default filterSlice.reducer;
export const{setFilter,resetFilter}=filterSlice.actions;