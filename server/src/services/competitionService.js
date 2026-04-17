import { Competition } from '../models/Competition.js';
import { AppError } from '../utils/appError.js';

export async function listCompetitions() {
  return Competition.find({ isActive: true }).sort({ registrationDeadline: 1 }).lean();
}

export async function joinCompetition(userId, competitionId) {
  const competition = await Competition.findById(competitionId);
  if (!competition || !competition.isActive) {
    throw new AppError('Competition not found', 404);
  }

  if (!competition.participants.some((participant) => participant.toString() === userId)) {
    competition.participants.push(userId);
    await competition.save();
  }

  return competition;
}
