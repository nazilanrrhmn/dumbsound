// import { Request, Response } from "express";
// import * as userServices from "../services/user";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // Register a new user
// export const createUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   // Validate email and password
//   if (!email || !password) {
//     res.status(400).json({ message: "Email and password are required" });
//     return;
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await userServices.findUserByEmail(email);
//     if (existingUser) {
//       res.status(400).json({ message: "User already exists" });
//       return;
//     }

//     // Create user
//     const user = await userServices.createUser({ email, password });
//     res.status(201).json({
//       message: "User registered successfully",
//       user: { id: user.id, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // Login a user
// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   // Validate email and password
//   if (!email || !password) {
//     res.status(400).json({ message: "Email and password are required" });
//     return;
//   }

//   try {
//     const user = await userServices.findUserByEmail(email);
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     // Compare the password with the hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(400).json({ message: "Invalid credentials" });
//       return;
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET as string, // Ensure you have a JWT_SECRET in your .env file
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user.id, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
