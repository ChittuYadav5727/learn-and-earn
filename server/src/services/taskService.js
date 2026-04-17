import { Task } from '../models/Task.js';
import { AppError } from '../utils/appError.js';

export async function listUserTasks(userId) {
  return Task.find({ user: userId })
    .populate('provider', 'companyName')
    .populate('opportunity', 'type')
    .sort({ createdAt: -1 })
    .lean();
}

export async function submitTask(userId, taskId, submissionLink) {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }

  task.submissionLink = submissionLink;
  task.status = 'submitted';
  await task.save();

  return task;
}
