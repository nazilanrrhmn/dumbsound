import { createSlice } from "@reduxjs/toolkit";
import { IArtist } from "@/types/artist";
import { addArtist, getArtist } from "./async";

interface ArtistState {
  entities: IArtist[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ArtistState = {
  entities: [],
  loading: "idle",
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add artist
    builder.addCase(addArtist.fulfilled, (state, action) => {
      state.entities = [...(state.entities || []), action.payload];
      state.loading = "succeeded";
    });
    builder.addCase(addArtist.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addArtist.rejected, (state) => {
      state.loading = "failed";
    });

    // get all artist
    builder.addCase(getArtist.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getArtist.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getArtist.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export default artistSlice.reducer;
