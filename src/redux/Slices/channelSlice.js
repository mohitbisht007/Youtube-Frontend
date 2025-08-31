import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helpers/axiosInterceptor";
import { subscribeChannel, unSubscribeChannel } from "./userSlice";

// Fetch single channel by handle
export const fetchChannel = createAsyncThunk(
  "channel/fetchChannel",
  async (handle) => {
    const res = await api.get(`/api/channel/${handle}`);
    return res.data.channelData;
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channel = action.payload;
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(subscribeChannel.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.subscriptions = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
        // update channel count too
        if (state.channel) {
          state.channel.subscribers += 1;
        }
      })
      .addCase(unSubscribeChannel.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.subscriptions = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
        if (state.channel) {
          state.channel.subscribers -= 1;
        }
      });
  },
});

export default channelSlice.reducer;
