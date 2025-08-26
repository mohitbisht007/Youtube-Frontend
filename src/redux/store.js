import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js";
import videosReducer from "./Slices/videoSlices.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        videos: videosReducer,
    }
})

export default store