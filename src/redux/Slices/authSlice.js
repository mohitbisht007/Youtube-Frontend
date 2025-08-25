import {createSlice} from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user")

const initialState = {
    token: storedToken || "",
    user: JSON.parse(storedUser) || null,
    isAuth : storedToken ? true : false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const {token, user} = action.payload
            state.token = token
            state.user = user;
            state.isAuth = true;
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        },
        logout : (state) => {
            state.token = ""
            state.user = null
            state.isAuth = false
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer