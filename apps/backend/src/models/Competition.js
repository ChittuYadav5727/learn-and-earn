import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    theme: { type: String, trim: true, default: '' },
    reward: { type: String, trim: true, default: '' },
    registrationDeadline: { type: Date, required: true },
    eventDate: { type: Date, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Competition = mongoose.model('Competition', competitionSchema);
