import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice( {
name: "authentictaion",
initialState: {
    isLoggedin:false,
    signup:true,
    idToken:'',
    ApiKey:"AIzaSyBe6G7AEDxn3R9AYIClfCDtJeEZfeSspIU",
} ,

reducers : {
    login(state ,action) {
        state.isLoggedin = true
    },
    logout(state ,action) {
        state.isLoggedin = false
    },
    signup( state ){
        state.signup = false
    }
}
})

export const authActions = authSlice.actions
export default authSlice.reducer;