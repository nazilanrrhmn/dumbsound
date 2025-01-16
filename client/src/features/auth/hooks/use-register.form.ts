import { useAppDispatch } from "../../../hooks/use-store";
import { api } from "../../../libs/api";
import { getUserLogged } from "../../../stores/auth/async";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { RegisterSchema, registerSchema } from "../../../validations/register";

export function useRegisterForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit({
    email,
    password,
    fullname,
    gender,
    phone,
    address,
  }: RegisterSchema) {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        fullname,
        gender,
        phone,
        address,
      });

      const { accessToken } = res.data;
      Cookies.set("token", accessToken, { expires: 1 });
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1000,
      });
      dispatch(getUserLogged());
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: `${error.response.data.message}`,
          background: "#1D1D1D",
          color: "#fff",
        });
      } else {
        console.error("Unexpected error", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred",
          background: "#1D1D1D",
          color: "#fff",
        });
      }
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
