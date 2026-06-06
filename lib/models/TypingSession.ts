import mongoose, { Document, Schema, Types } from "mongoose"

export interface ITypingSession extends Document {
  userId: Types.ObjectId
  wpm: number
  accuracy: number
  language?: string
  difficulty?: string
  createdAt: Date
}

const TypingSessionSchema = new Schema<ITypingSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    language: { type: String },
    difficulty: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

TypingSessionSchema.index({ createdAt: -1 })

export default mongoose.models.TypingSession ||
  mongoose.model<ITypingSession>("TypingSession", TypingSessionSchema)
