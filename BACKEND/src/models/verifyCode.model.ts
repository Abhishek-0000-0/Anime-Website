import mongoose from "mongoose";
import verifactionType from "../constants/verifaction";

export interface VerificationCodeDocument extends mongoose.Document {
	userId: mongoose.Types.ObjectId;
	type: verifactionType;
	expiredAt: Date;
	createdAt: Date;
}

const VerficationCodeSchema = new mongoose.Schema<VerificationCodeDocument>(
{
	
})