import crypto from 'crypto';
import { certificationQuestions } from '../data/catalog.js';
import { CERTIFICATION_PASS_THRESHOLD } from '../constants/certification.js';
import { Certification, User } from '../models/index.js';

export function getCertificationExam() {
  return certificationQuestions.map(({ answer, ...question }) => question);
}

export async function submitCertificationExam(userId, answers = []) {
  const total = certificationQuestions.length;
  const correctAnswers = certificationQuestions.reduce((count, question) => {
    const selected = answers.find((item) => item.questionId === question.id)?.selectedOption;
    return selected === question.answer ? count + 1 : count;
  }, 0);

  const score = Math.round((correctAnswers / total) * 100);
  const isCertified = score > CERTIFICATION_PASS_THRESHOLD;

  const certification = await Certification.create({
    user: userId,
    examTitle: 'Learn & Earn Skill Assessment',
    score,
    passThreshold: CERTIFICATION_PASS_THRESHOLD,
    isCertified,
    result: isCertified ? 'passed' : 'failed',
    certificateId: isCertified ? `LE-${crypto.randomBytes(4).toString('hex').toUpperCase()}` : '',
  });

  if (isCertified) {
    await User.findByIdAndUpdate(userId, { $inc: { 'stats.certificateCount': 1 } });
  }

  return certification.toObject();
}

export async function listCertificationHistory(userId) {
  return Certification.find({ user: userId }).sort({ attemptedAt: -1 }).lean();
}
