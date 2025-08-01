import mongoose, { Schema, Document, model } from "mongoose";
import { hashPassword } from "../utils/password";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
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

userSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await hashPassword(this.password);
	next();
});

const User = model<IUser>("User", userSchema);
export default User;