import mongoose from 'mongoose';
import { TASK_STATUSES } from '../constants/roles.js';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
    title: { type: String, required: true, trim: true },
    instructions: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: Object.values(TASK_STATUSES),
      default: TASK_STATUSES.ASSIGNED,
    },
    submissionLink: { type: String, trim: true, default: '' },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
