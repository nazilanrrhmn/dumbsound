import { z } from "zod";

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const registerSchema = z
  .object({
    fullname: z.string().min(6, "Fullname must be at least 6 characters"),
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        regexPassword,
        "Password must contain at least one uppercase letter, one lowercase letter and one number"
      ),
    gender: z.string(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string(),
  })
  .required();

export type RegisterSchema = z.infer<typeof registerSchema>;
