import { ApiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";
import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model";
import { Types } from "mongoose";

// Middleware to verify JWT in the Authorization header of incoming requests
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Extract the access token from the Authorization header and remove the 'Bearer ' prefix
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // If no token is provided, throw an unauthorized error
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    // Verify the token using the secret key and decode it to extract user details
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { _id: Types.ObjectId };

    // Find the user by the _id obtained from the decoded token while excluding sensitive information
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // If no user is found, it indicates an invalid token
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach the user object to the request object for use in subsequent middleware or route handlers
    req.user = user;
    next(); // Continue to the next middleware
  } catch (error: any) {
    // Handle specific JWT errors based on their type
    switch (error.name) {
      case "TokenExpiredError": // Token has expired
        throw new ApiError(401, "Access token expired");
      case "JsonWebTokenError": // Token is malformed or invalid
        throw new ApiError(400, "Invalid access token");
      default: // Handle other types of errors
        const statusCode = error.statusCode || 500;
        const message =
          error.message || "An error occurred during authentication";
        throw new ApiError(statusCode, message);
    }
  }
});
