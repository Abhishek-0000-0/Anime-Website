import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
	compatePassword: (data: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		name: { type: string, required: true },
		email: { type: string, unique: true, required: true },
		password: { type: string, required: true },
		verified: { type: boolean, required: true, default: false }
	}, {
		timestramps: true
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) { return next(); }

	this.password = await hashPassword(this.password, 7);
	next();
})

userSchema.methods.checkPassword = async function (val: string) {
	return comparePassword(val, this.password);
}

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;