import { Schema, model, Types } from "mongoose";

interface IPost {
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  user: Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const PostModel = model<IPost>("Post", postSchema);
