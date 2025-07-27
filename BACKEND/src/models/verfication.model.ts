import mongoose, { Document, Schema } from "mongoose";

export type VerificationType = "EMAIL" | "PASSWORD_RESET";

export interface VerificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationType;
  code: string;
  expiredAt: Date;
  createdAt: Date;
}

const verificationSchema = new Schema<VerificationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["EMAIL", "PASSWORD_RESET"],
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Verification = mongoose.model<VerificationDocument>(
  "Verification",
  verificationSchema
);

export default Verification;
