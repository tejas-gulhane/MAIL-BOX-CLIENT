import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authentication",
    initialState:{
        useremail: localStorage.getItem('useremail') || "",
        cleanemail:localStorage.getItem('cleanemail') || "",
        isloggedin:false,
        idtoken:localStorage.getItem('useremail') ? true : false,
        signup:false
    },
    reducers:{
        setuseremail(state , action){
            state.useremail=action.payload;
            localStorage.setItem('useremail', action.payload);
        },
        setcleanemail(state , action){
            state.useremail=action.payload;
            localStorage.setItem('cleanemail', action.payload);
        },
        login(state ,action){
            state.isloggedin =!state.isloggedin;
            state.idtoken=action.payload;
            localStorage.setItem("idtoken", action.payload)
        },
        logout(state ,action){
            state.isloggedin=!state.isloggedin;
            state.idtoken="",
            state.useremail=""
            state.cleanemail=""
            localStorage.clear();
        },
        signup(state){
            state.signup=!state.signup
        },

    }
})

export const authActions =authSlice.actions;
export default authSlice.reducer;