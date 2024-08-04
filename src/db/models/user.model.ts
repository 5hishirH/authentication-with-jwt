import { Schema, model, Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  fullName: string;
  password: string;
  avatar: {
    url: string;
    public_id: string;
  };
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;
  posts: Types.ObjectId[];

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  refreshToken: String,
  posts: [{ type: Types.ObjectId, ref: "Post" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
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

// Custom function to modify the JSON serialization process
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;       // Remove the password property
    delete ret.refreshToken;   // Remove the refreshToken property
    return ret;
  }
});

export const User = model<IUser>("User", userSchema);
