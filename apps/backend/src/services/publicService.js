import { Competition } from '../models/Competition.js';
import { chatbotPlaybook, earnCatalog, homeContent, learnCatalog, videoCatalog } from '../data/catalog.js';

export async function getHomePageData() {
  const competitions = await Competition.find({ isActive: true }).sort({ registrationDeadline: 1 }).limit(3).lean();

  return {
    ...homeContent,
    featuredLearn: learnCatalog.slice(0, 2),
    featuredEarn: earnCatalog.slice(0, 3),
    featuredCompetitions: competitions,
    videos: videoCatalog,
  };
}

export async function getVideoFeed() {
  return videoCatalog;
}

export async function getChatbotResponse(payload = {}) {
  const action = payload.action || inferActionFromMessage(payload.message || '');
  const preset = chatbotPlaybook[action] || chatbotPlaybook.help;

  return {
    action: action || 'help',
    message:
      preset.reply ||
      'You can ask me about courses, earning tracks, provider verification, or the best way to get started on Learn & Earn.',
    suggestions: preset.suggestions || homeContent.quickActions.map((item) => item.label),
  };
}

function inferActionFromMessage(message) {
  const normalized = message.toLowerCase();

  if (normalized.includes('course') || normalized.includes('learn')) {
    return 'browse-courses';
  }

  if (normalized.includes('earn') || normalized.includes('money') || normalized.includes('reward')) {
    return 'how-to-earn';
  }

  if (normalized.includes('roadmap') || normalized.includes('plan')) {
    return 'roadmap';
  }

  if (normalized.includes('reward') || normalized.includes('wallet') || normalized.includes('point')) {
    return 'rewards';
  }

  return 'help';
}
