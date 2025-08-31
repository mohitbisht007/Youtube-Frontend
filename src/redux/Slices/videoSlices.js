import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helpers/axiosInterceptor";

// Async thunk to fetch videos
export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async () => {
    const res = await api.get("/api/allVideos");
    return res.data.allVideos;
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default videosSlice.reducer;