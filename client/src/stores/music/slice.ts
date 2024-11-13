import { createSlice } from "@reduxjs/toolkit";
import { IMusic } from "@/types/music";
import { getMusic, addMusic } from "./async";

interface MusicState {
  entities: IMusic[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: MusicState = {
  entities: [],
  loading: "idle",
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add music
    builder.addCase(addMusic.fulfilled, (state, action) => {
      state.entities = [...(state.entities || []), action.payload];
      state.loading = "succeeded";
    });
    builder.addCase(addMusic.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addMusic.rejected, (state) => {
      state.loading = "failed";
    });

    // get all music
    builder.addCase(getMusic.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getMusic.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMusic.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export default musicSlice.reducer;
