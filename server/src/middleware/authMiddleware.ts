import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface jwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //we had saved the token data in header so now we extract if from header.
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // console.log("recieved token: ", token);

  //if no token was found.
  if (!token) {
    res.status(401).json({
      success: false,
      message: "No valid token is provided! Authorization failed",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, "JWT_SECRET") as jwtPayload;
    // console.log("decoded: ", decoded);
    req.userId = decoded.userId;
    // console.log("Extracted userId:", req.userId);
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({
      success: false,
      message: "Token is not a valid token, try again.",
    });
  }
};
