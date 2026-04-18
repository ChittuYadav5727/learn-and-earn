import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema(
  {
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['internship', 'job', 'freelance', 'competition'],
      required: true,
    },
    workMode: { type: String, enum: ['remote', 'onsite', 'hybrid'], default: 'remote' },
    status: { type: String, enum: ['draft', 'open', 'closed'], default: 'open' },
    location: { type: String, trim: true, default: 'Remote' },
    skills: [{ type: String }],
    stipend: { type: String, trim: true, default: '' },
    duration: { type: String, trim: true, default: '' },
    deadline: { type: Date, required: true },
    seats: { type: Number, default: 1, min: 1 },
    applicantsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Opportunity = mongoose.model('Opportunity', opportunitySchema);
