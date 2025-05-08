import { configureStore } from "@reduxjs/toolkit";
import junkOrderReducer from "@/slice/junkOrderDetialSlice";
import addressReducer from "@/slice/selectedAddressDetailSlice";
import filterReducer from "@/slice/filterCardSclice";
import loginReducer from "@/slice/loginSlice";
 
export const store = configureStore({
  reducer: {
    junkOrder: junkOrderReducer,
    Addressdetails: addressReducer,
    filterCard: filterReducer,
    login: loginReducer,
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;