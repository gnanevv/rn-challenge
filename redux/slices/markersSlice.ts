import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMarkersFromAPI } from "../../services/api";
import { Marker } from "../../types";

export const fetchMarkers = createAsyncThunk(
  "markers/fetchMarkers",
  async () => {
    const response = await fetchMarkersFromAPI();
    return response;
  }
);

interface MarkersState {
  markers: Marker[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MarkersState = {
  markers: [],
  status: "idle",
  error: null,
};

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMarkers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.markers = action.payload;
      })
      .addCase(fetchMarkers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default markersSlice.reducer;
