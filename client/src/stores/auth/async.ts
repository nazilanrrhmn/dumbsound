import { api } from "../../libs/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import Cookies from "js-cookie";

export const getUserLogged = createAsyncThunk<IUser, undefined>(
  "user/getUserLogged",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      console.log("Token", token);

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }
      const res = await api.get("/auth/me");

      if (!res.data) {
        return thunkAPI.rejectWithValue("Invalid authorization header");
      }

      return res.data;
    } catch (error: any) {
      // Menangani error Axios
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue(
          "Unauthorized - Invalid or expired token"
        );
      }
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);
