import { createSlice} from "@reduxjs/toolkit";

interface LoginState {
    isLogin:boolean;
}

const initialState: LoginState = {
    isLogin: false,
}

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        setIsLogin:(state) => {
            state.isLogin = true;
        },
        setIsLogout:(state) => {
            state.isLogin = false;
        }
    }
})
export default loginSlice.reducer;
export const  {setIsLogin,setIsLogout} = loginSlice.actions;