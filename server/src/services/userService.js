import { earnCatalog, learnCatalog } from '../data/catalog.js';
import { Application, Certification, Competition, Opportunity, Task, User, Wallet } from '../models/index.js';

export async function getUserDashboard(userId) {
  const [user, wallet, tasks, certifications, openOpportunities, competitions] = await Promise.all([
    User.findById(userId).select('-password').lean(),
    Wallet.findOne({ user: userId }).lean(),
    Task.countDocuments({ user: userId }),
    Certification.countDocuments({ user: userId, isCertified: true }),
    Opportunity.countDocuments({ status: 'open' }),
    Competition.countDocuments({ isActive: true }),
  ]);

  return {
    user,
    summary: {
      selectedMode: user?.selectedMode || 'learn',
      walletBalance: wallet?.balance || 0,
      activeTasks: tasks,
      certificatesEarned: certifications,
      openOpportunities,
      activeCompetitions: competitions,
    },
    progress: {
      weeklyGoal: 80,
      completionRate: user?.selectedMode === 'earn' ? 61 : 76,
      streakDays: 18,
      nextReward: 'Design Sprint bonus unlock',
    },
    rewards: {
      points: user?.stats?.points || 2480,
      earnings: wallet?.totalEarned || 8450,
      badges: ['Fast learner', 'Top contributor', 'Provider approved'],
    },
    recommendedTracks: learnCatalog.slice(0, 2),
    earningTracks: earnCatalog.slice(0, 2),
  };
}

export async function getUserProfile(userId) {
  return User.findById(userId).select('-password').lean();
}

export async function updateUserProfile(userId, payload) {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name: payload.name,
        'profile.phone': payload.phone || '',
        'profile.college': payload.college || '',
        'profile.degree': payload.degree || '',
        'profile.graduationYear': payload.graduationYear || null,
        'profile.location': payload.location || '',
        'profile.bio': payload.bio || '',
        'profile.skills': payload.skills || [],
      },
    },
    { new: true }
  )
    .select('-password')
    .lean();
}

export async function updateUserMode(userId, selectedMode) {
  return User.findByIdAndUpdate(userId, { $set: { selectedMode } }, { new: true })
    .select('-password')
    .lean();
}

export async function getLearnEarnFeed(mode) {
  return mode === 'earn' ? earnCatalog : learnCatalog;
}

export async function getLeaderboard() {
  const users = await User.find()
    .sort({ 'stats.points': -1, 'stats.earnings': -1, createdAt: 1 })
    .limit(10)
    .select('name stats selectedMode profile.college')
    .lean();

  return users.map((user, index) => ({
    rank: index + 1,
    ...user,
  }));
}

export async function getUserActivity(userId) {
  const [applications, tasks, certifications] = await Promise.all([
    Application.countDocuments({ user: userId }),
    Task.countDocuments({ user: userId }),
    Certification.countDocuments({ user: userId }),
  ]);

  return { applications, tasks, certifications };
}
