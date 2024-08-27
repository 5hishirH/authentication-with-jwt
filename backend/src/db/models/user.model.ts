import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  fullName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  refreshToken: { type: String },
});

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // Check if the password has been modified
  if (!this.isModified("password")) {
    // If not, skip the rest of the function
    return next();
  }

  // Hash the password using bcrypt with a salt factor of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Call the next middleware function
  next();
});

// Custom function to modify the JSON serialization process
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password; // Remove the password property
    delete ret.refreshToken; // Remove the refreshToken property
    return ret;
  },
});

userSchema.set("toObject", {
  transform: function (doc, ret, options) {
    delete ret.password; // Remove the password property
    delete ret.refreshToken; // Remove the refreshToken property
    return ret;
  },
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
    }
  );
};

export const User = model<IUser>("User", userSchema);
