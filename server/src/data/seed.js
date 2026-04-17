import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDb } from '../config/db.js';
import { GST_STATUSES } from '../constants/roles.js';
import { Admin, Competition, Opportunity, Provider, User, Wallet } from '../models/index.js';

async function seed() {
  await connectDb();
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await User.findOneAndUpdate(
    { email: 'demo.user@learnandearn.com' },
    {
      name: 'Demo Learner',
      email: 'demo.user@learnandearn.com',
      password: hashedPassword,
      selectedMode: 'learn',
      profile: {
        college: 'National Tech University',
        degree: 'B.Tech CSE',
        skills: ['React', 'Node.js'],
      },
      stats: {
        points: 420,
        earnings: 1800,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await Wallet.findOneAndUpdate(
    { user: user._id },
    {
      user: user._id,
      balance: 1800,
      totalEarned: 1800,
      transactions: [
        { title: 'Welcome reward', type: 'credit', amount: 100 },
        { title: 'Task payout', type: 'credit', amount: 1700 },
      ],
    },
    { upsert: true, new: true }
  );

  const provider = await Provider.findOneAndUpdate(
    { email: 'demo.provider@learnandearn.com' },
    {
      companyName: 'Northstar Labs',
      companyEmail: 'careers@northstarlabs.com',
      email: 'demo.provider@learnandearn.com',
      password: hashedPassword,
      gstStatus: GST_STATUSES.APPROVED,
      verificationNotes: 'Seeded approved provider',
      companyDetails: {
        industry: 'EdTech',
        companySize: '11-50',
        website: 'https://northstarlabs.example',
        headquarters: 'Bengaluru',
        description: 'Building student-first workflows and assessment products.',
      },
      contactPerson: {
        name: 'Ritika Rao',
        designation: 'Talent Partner',
        phone: '+91 9876543210',
      },
      stats: {
        totalPosts: 1,
        activePosts: 1,
        totalApplicants: 0,
        acceptedApplicants: 0,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await Opportunity.findOneAndUpdate(
    { provider: provider._id, title: 'Frontend Internship - React' },
    {
      provider: provider._id,
      title: 'Frontend Internship - React',
      description: 'Collaborate on production React interfaces for student products.',
      type: 'internship',
      workMode: 'remote',
      location: 'Remote',
      skills: ['React', 'CSS', 'REST APIs'],
      stipend: 'INR 12,000 / month',
      duration: '3 months',
      deadline: new Date('2026-06-30'),
      seats: 3,
      status: 'open',
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await Competition.findOneAndUpdate(
    { title: 'Full Stack Sprint Challenge' },
    {
      title: 'Full Stack Sprint Challenge',
      description: 'Build a product-ready workflow in 48 hours and present execution quality.',
      theme: 'Product engineering',
      reward: 'INR 25,000',
      registrationDeadline: new Date('2026-05-20'),
      eventDate: new Date('2026-05-25'),
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await Admin.findOneAndUpdate(
    { email: 'demo.admin@learnandearn.com' },
    {
      name: 'Demo Admin',
      email: 'demo.admin@learnandearn.com',
      password: hashedPassword,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log('Seed completed');
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('Seed failed', error);
  await mongoose.disconnect();
  process.exit(1);
});
