import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice.js";
import videosReducer from "./Slices/videoSlices.js";
import channelReducer from "./Slices/channelSlice.js";
import { setupInterceptors } from "../helpers/axiosInterceptor.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    videos: videosReducer,
    channel: channelReducer,
  },
});

// ✅ attach store to axios interceptor here
setupInterceptors(store);

export default store;
