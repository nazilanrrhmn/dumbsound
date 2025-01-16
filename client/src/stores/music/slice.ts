import { createSlice } from "@reduxjs/toolkit";
import { IMusic } from "@/types/music";
import { getMusic, addMusic } from "./async";

interface MusicState {
  entities: IMusic[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MusicState = {
  entities: [],
  loading: "idle",
  error: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMusic.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getMusic.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getMusic.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(addMusic.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addMusic.fulfilled, (state, action) => {
        state.entities.push(action.payload);
        state.loading = "succeeded";
      })
      .addCase(addMusic.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default musicSlice.reducer;
