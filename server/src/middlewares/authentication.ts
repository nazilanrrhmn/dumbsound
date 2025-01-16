import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define interface for decoded token
interface DecodedToken {
  id: number;
  email: string;
  username: string;
  role: Role; // Add role property to handle authorization
}

// Extend Request to include user data
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Access denied." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as DecodedToken;
    console.log(decoded);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// export function authentication(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void {
//   try {
//     const authorizationHeader = req.header("Authorization");

//     // Validasi keberadaan header Authorization
//     if (!authorizationHeader) {
//       res.status(401).json({ message: "Authorization header is missing" });
//       return;
//     }

//     // Validasi format Bearer token
//     const tokenParts = authorizationHeader.split(" ");
//     if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
//       res
//         .status(401)
//         .json({ message: "Authorization header format is invalid" });
//       return;
//     }

//     const token = tokenParts[1];

//     // Validasi keberadaan secret key di environment
//     const secretKey = process.env.JWT_SECRET_KEY;
//     if (!secretKey) {
//       console.error("JWT_SECRET_KEY is missing in the environment variables");
//       res.status(500).json({ message: "Server error: missing secret key" });
//       return;
//     }

//     // Verifikasi token menggunakan JWT
//     const decoded = jwt.verify(token, secretKey) as JwtPayload;

//     // Simpan informasi user di res.locals untuk digunakan di middleware atau handler berikutnya
//     res.locals.user = decoded;

//     next(); // Lanjutkan ke middleware atau route handler berikutnya
//   } catch (error) {
//     console.error("Authentication error:", error);

//     // Tangani error yang dihasilkan oleh JWT
//     if (error instanceof jwt.JsonWebTokenError) {
//       res.status(401).json({ message: "Invalid or malformed token" });
//       return;
//     }

//     if (error instanceof jwt.TokenExpiredError) {
//       res.status(401).json({ message: "Token has expired" });
//       return;
//     }

//     // Error lainnya
//     res.status(500).json({ message: "Authentication failed" });
//   }
// }
