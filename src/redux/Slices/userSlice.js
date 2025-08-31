import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helpers/axiosInterceptor";

// --- Async Thunks ---

// Subscribe to channel
export const subscribeChannel = createAsyncThunk(
  "auth/subscribeChannel",
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const res = await api.put(
        "/api/channel/subscribe",
        { channelId },
        { headers: { Authorization: `JWT ${token}` } }
      );
      return res.data.subscriptions;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to subscribe"
      );
    }
  }
);

// Unsubscribe from channel
export const unSubscribeChannel = createAsyncThunk(
  "auth/unSubscribeChannel",
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const res = await api.put(
        "/channel/unsubscribe",
        { channelId },
        { headers: { Authorization: `JWT ${token}` } }
      );
      return res.data.subscriptions;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to unsubscribe"
      );
    }
  }
);

export const likeVideo = createAsyncThunk(
  "auth/likeVideo",
  async (videoId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      await api.put(
        `/api/like/${videoId}`,
        { videoId },
        { headers: { Authorization: `JWT ${token}` } }
      );
      return videoId; // return the liked video id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to like video"
      );
    }
  }
);

export const dislikeVideo = createAsyncThunk(
  "auth/dislikeVideo",
  async (videoId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      await api.put(
        `/api/dislike/${videoId}`,
        { videoId },
        { headers: { Authorization: `JWT ${token}` } }
      );
      return videoId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to unlike video"
      );
    }
  }
);

// --- Slice ---

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState = {
  token: storedToken || "",
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuth: !!storedToken,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      console.log("👉 Saving new user to Redux + LocalStorage:", user.username);
      state.token = token;
      state.user = user;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      console.log("👉 Logging out, clearing storage");
      state.token = "";
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeChannel.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.subscriptions = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user)); // update storage
        }
      })
      .addCase(subscribeChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unSubscribeChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unSubscribeChannel.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.subscriptions = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(unSubscribeChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        if (state.user) {
          if (!state.user.likedVideos) state.user.likedVideos = [];
          if (!state.user.likedVideos.includes(action.payload)) {
            state.user.likedVideos.push(action.payload);
          }
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      // --- Unlike video ---
      .addCase(dislikeVideo.fulfilled, (state, action) => {
        if (state.user && state.user.likedVideos) {
          state.user.likedVideos = state.user.likedVideos.filter(
            (id) => id !== action.payload
          );
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
