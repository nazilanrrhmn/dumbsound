import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { IArtist } from "@/types/artist";
import { api } from "../../libs/api";
import { AddArtistDTO } from "../../validations/artist";

export const getArtist = createAsyncThunk<IArtist[], undefined>(
  "artist/getArtist",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/artist");
      return res.data.artist;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
          background: "#181818",
          color: "#fff",
        });
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const addArtist = createAsyncThunk<IArtist, AddArtistDTO>(
  "artist/addArtist",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/artist/create", data);
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        background: "#181818",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1500,
      });
      return res.data.artist;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: `${error.message}`,
          background: "#181818",
          color: "#fff",
        });

        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
