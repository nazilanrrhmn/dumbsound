import { createSlice } from "@reduxjs/toolkit";
import { getUserLogged } from "./async";
import { IUser } from "@/types/user";

interface AuthState {
  entities: IUser | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

const initialState: AuthState = {
  entities: null,
  loading: "idle",
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserLogged.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getUserLogged.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getUserLogged.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
