import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice.js";
import videosReducer from "./Slices/videoSlices.js"
import channelReducer from "./Slices/channelSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
        videos: videosReducer,
        channel: channelReducer,
    }
})

export default store