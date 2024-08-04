import { ApiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";
import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { _id: string };

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(
      error.statusCode || 401,
      error?.message || "Invalid access token"
    );
  }
});
