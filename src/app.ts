import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Types } from "mongoose";

const app = express();

interface IUser {
  _id: Types.ObjectId;
  email: string;
  fullName: string;
  avatar: {
    url: string;
    public_id: string;
  };
  createdAt: Date;
  updatedAt: Date;
  posts: Types.ObjectId[];

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add the 'user' property here
    }
  }
}

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes imports

import userRouter from "./routes/user.routes";

app.use("/api/v1/user", userRouter);

export default app;
