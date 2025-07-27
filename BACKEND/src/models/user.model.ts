import mongoose, { Schema, Document } from "mongoose";
import { hashPassword } from "../utils/password"; 

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();

  user.password = await hashPassword(user.password);
  next();
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
