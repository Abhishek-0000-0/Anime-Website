import mongoose, { Document, Schema } from "mongoose";

// Interface
export interface SessionDocument extends Document {
	user: mongoose.Types.ObjectId;
	refreshToken: string;
	userAgent?: string;
	ip?: string;
	device: String;
	createdAt: Date;
	expiresAt: Date;
	valid: boolean;
}

const sessionSchema = new Schema<SessionDocument>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		refreshToken: {
			type: String,
			required: true,
		},
		userAgent: { type: String },
		ip: { type: String },
		device: {
			type: String,
			required: true,
			index: true, 
		},
		valid: { type: Boolean, default: true },
		expiresAt: { type: Date, required: true },
	},
	{
		timestamps: true, 
	}
);

const Session = mongoose.model<SessionDocument>("Session", sessionSchema);

export default Session;
