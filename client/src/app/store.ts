import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "../stores/artist/slice";
import musicReducer from "../stores/music/slice";

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    music: musicReducer,
    // Add other reducers here as needed.
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
