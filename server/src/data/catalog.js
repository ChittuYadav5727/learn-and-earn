export const homeContent = {
  carousel: [
    {
      id: 'launch-career',
      eyebrow: 'Launch faster',
      title: 'Build skills that turn into verified income.',
      subtitle:
        'Structured learning paths, paid micro-tasks, and employer-ready proof of work in one experience.',
      ctaLabel: 'Start Learning',
      ctaHref: '/register',
      accent: 'sunrise',
    },
    {
      id: 'provider-pipeline',
      eyebrow: 'Hire with confidence',
      title: 'Source ambitious talent through tasks, cohorts, and challenges.',
      subtitle:
        'Give learners real assignments, review performance signals, and move the best candidates into your pipeline.',
      ctaLabel: 'For Providers',
      ctaHref: '/register',
      accent: 'ocean',
    },
    {
      id: 'earn-while-learning',
      eyebrow: 'Retention by design',
      title: 'Keep momentum with rewards, rankings, and project-based progress.',
      subtitle:
        'Every milestone pushes learners closer to certifications, wallet credits, and standout portfolios.',
      ctaLabel: 'See Dashboard',
      ctaHref: '/login',
      accent: 'aurora',
    },
  ],
  hero: {
    title: 'Learn skills. Earn outcomes.',
    subtitle:
      'A startup-grade learning and earning platform for ambitious students, verified employers, and measurable outcomes.',
  },
  stats: [
    { label: 'Verified providers', value: '180+' },
    { label: 'Active learners', value: '24k+' },
    { label: 'Tasks completed', value: '12.4k' },
    { label: 'Certificates issued', value: '3.1k' },
  ],
  highlights: [
    'Choose between Learn and Earn mode based on your current goal.',
    'Discover internships, jobs, freelance tasks, and competitions.',
    'Only GST-approved providers can publish opportunities.',
  ],
  quickActions: [
    { id: 'browse-courses', label: 'Browse Courses' },
    { id: 'how-to-earn', label: 'How to Earn' },
    { id: 'help', label: 'Help' },
  ],
  socialLinks: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { id: 'x', label: 'X', href: 'https://x.com' },
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com' },
  ],
  dashboardPreview: {
    streak: '18 day streak',
    progress: 76,
    points: 2480,
    wallet: 'INR 8,450',
    insights: ['2 mentor reviews pending', '1 reward unlock this week', 'Top 8% on leaderboard'],
  },
  testimonials: [
    {
      name: 'Maya Singh',
      role: 'Frontend Learner',
      quote: 'The mix of guided content and paid challenges made my portfolio feel real within weeks.',
    },
    {
      name: 'Northstar Labs',
      role: 'Hiring Partner',
      quote: 'We reduced noisy applications by giving shortlisted learners practical assignments first.',
    },
  ],
};

export const learnCatalog = [
  {
    id: 'frontend-track',
    title: 'Frontend Foundations',
    description: 'React, component architecture, responsive design, and UI polish.',
    level: 'Beginner',
    duration: '4 weeks',
    progress: 42,
  },
  {
    id: 'backend-track',
    title: 'Backend API Systems',
    description: 'Node.js, Express, MongoDB, and modular service design.',
    level: 'Intermediate',
    duration: '6 weeks',
    progress: 65,
  },
  {
    id: 'career-track',
    title: 'Interview Readiness',
    description: 'Aptitude, resume refinement, and practical communication drills.',
    level: 'All levels',
    duration: '2 weeks',
    progress: 18,
  },
];

export const earnCatalog = [
  {
    id: 'qa-task',
    title: 'QA Feedback Sprint',
    description: 'Review product flows and submit structured bug reports.',
    reward: 'INR 1,200',
    type: 'freelance',
  },
  {
    id: 'campus-outreach',
    title: 'Campus Outreach Ambassador',
    description: 'Promote curated opportunities in your college network.',
    reward: 'INR 2,500 + bonuses',
    type: 'freelance',
  },
  {
    id: 'content-moderation',
    title: 'Content Moderation Queue',
    description: 'Complete tagged moderation tasks with turnaround SLAs.',
    reward: 'INR 350 per batch',
    type: 'task',
  },
];

export const videoCatalog = [
  {
    id: 'ship-react-ui',
    title: 'Shipping a Production-Ready React UI',
    duration: '12:48',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    embedUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    category: 'Frontend',
  },
  {
    id: 'design-mongo-api',
    title: 'Designing Secure Node + Mongo APIs',
    duration: '16:22',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    embedUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
    category: 'Backend',
  },
  {
    id: 'earn-growth-tasks',
    title: 'How Learners Unlock Paid Task Opportunities',
    duration: '09:31',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    embedUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
    category: 'Earnings',
  },
  {
    id: 'provider-playbook',
    title: 'Provider Playbook for Better Candidate Funnels',
    duration: '11:05',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
    embedUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
    category: 'Hiring',
  },
];

export const chatbotPlaybook = {
  'browse-courses': {
    reply:
      'You can start with Frontend Foundations for UI work, Backend API Systems for full-stack depth, or Interview Readiness if you want faster placement support.',
    suggestions: ['Frontend Foundations', 'Backend API Systems', 'Interview Readiness'],
  },
  'how-to-earn': {
    reply:
      'Switch to Earn mode, complete your profile, apply for open tasks, and build up wallet rewards through verified provider assignments and challenge-based payouts.',
    suggestions: ['Show task flow', 'Open earning paths', 'Wallet rewards'],
  },
  help: {
    reply:
      'I can help you choose a learning track, understand earning rules, or explain how providers and GST verification work on the platform.',
    suggestions: ['Browse Courses', 'How to Earn', 'Provider verification'],
  },
  roadmap: {
    reply:
      'A strong roadmap is: finish one learning track, submit 2 project tasks, join 1 competition, then use your dashboard insights to improve your portfolio.',
    suggestions: ['Courses first', 'Task milestones', 'Competition prep'],
  },
  rewards: {
    reply:
      'Rewards stack through welcome credits, task payouts, leaderboard points, and certifications that improve your visibility to providers.',
    suggestions: ['Wallet overview', 'Leaderboard points', 'Certification value'],
  },
};

export const certificationQuestions = [
  {
    id: 'q1',
    question: 'Which hook is used to manage state inside a React component?',
    options: ['useState', 'useRoute', 'useExpress', 'useLayout'],
    answer: 'useState',
  },
  {
    id: 'q2',
    question: 'What does JWT stand for?',
    options: ['Java Web Token', 'JSON Web Token', 'JavaScript Widget Tool', 'Joined Web Template'],
    answer: 'JSON Web Token',
  },
  {
    id: 'q3',
    question: 'Which MongoDB library is used in this project backend?',
    options: ['Sequelize', 'Prisma', 'Mongoose', 'Knex'],
    answer: 'Mongoose',
  },
  {
    id: 'q4',
    question: 'Which HTTP verb is usually used to update a resource partially?',
    options: ['GET', 'PATCH', 'TRACE', 'HEAD'],
    answer: 'PATCH',
  },
  {
    id: 'q5',
    question: 'A provider can publish opportunities only after what condition is met?',
    options: ['Email signup', 'GST approval', 'Creating two posts', 'Uploading a logo'],
    answer: 'GST approval',
  },
];
