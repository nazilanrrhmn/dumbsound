import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { IMusic } from "../../types/music";
import { api } from "../../libs/api";
import { AddMusicDTO } from "../../validations/music";

export const getMusic = createAsyncThunk<IMusic[], undefined>(
  "music/getMusic",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/music");
      console.log(res.data);

      return res.data;
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

export const addMusic = createAsyncThunk<IMusic, AddMusicDTO>(
  "music/addMusic",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "fileUrl" || key === "thumbnails") {
          if (value instanceof FileList) {
            Array.from(value).forEach((file) => formData.append(key, file));
          }
        } else {
          formData.append(key, String(value));
        }
      });

      const { data: response } = await api.post("/music/create", formData);

      // Show success notification using SweetAlert
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        background: "#181818",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1500,
      });

      return response.artist; // Return artist data
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        // Show error notification using SweetAlert
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

// export const addMusic = createAsyncThunk<IMusic, AddMusicDTO>(
//   "music/addMusic",
//   async (data, thunkAPI) => {
//     try {
//       const res = await api.post("/music/create", data);
//       Swal.fire({
//         icon: "success",
//         title: res.data.message,
//         showConfirmButton: false,
//         background: "#181818",
//         color: "#fff",
//         iconColor: "#04A51E",
//         timer: 1500,
//       });
//       return res.data.artist;
//     } catch (error) {
//       console.log(error);
//       if (error instanceof Error) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops..",
//           text: `${error.message}`,
//           background: "#181818",
//           color: "#fff",
//         });

//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   }
// );
