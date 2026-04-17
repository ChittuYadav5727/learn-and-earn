import { Admin, Provider, User, Wallet } from '../models/index.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/appError.js';
import { signToken } from '../utils/jwt.js';

async function findAccountsByEmail(email) {
  const normalizedEmail = email.toLowerCase();
  const [user, provider, admin] = await Promise.all([
    User.findOne({ email: normalizedEmail }),
    Provider.findOne({ email: normalizedEmail }),
    Admin.findOne({ email: normalizedEmail }),
  ]);

  return { user, provider, admin };
}

function getAccountByRole(accounts, role) {
  if (role === 'provider') {
    return accounts.provider;
  }

  if (role === 'admin') {
    return accounts.admin;
  }

  return accounts.user;
}

async function assertEmailAvailable(email) {
  const accounts = await findAccountsByEmail(email);
  if (accounts.user || accounts.provider || accounts.admin) {
    throw new AppError('Email already exists', 409);
  }
}

async function buildAuthPayload(account) {
  return {
    token: signToken({ id: account._id.toString(), role: account.role }),
    user: account.toSafeObject(),
  };
}

export async function registerUser(payload) {
  await assertEmailAvailable(payload.email);

  const user = await User.create({
    name: payload.name,
    email: payload.email.toLowerCase(),
    password: payload.password,
    selectedMode: payload.selectedMode || 'learn',
    profile: {
      college: payload.college || '',
    },
  });

  await Wallet.create({
    user: user._id,
    balance: 100,
    totalEarned: 100,
    transactions: [
      {
        title: 'Welcome reward',
        type: 'credit',
        amount: 100,
      },
    ],
  });

  return buildAuthPayload(user);
}

export async function registerProvider(payload) {
  await assertEmailAvailable(payload.email);

  const provider = await Provider.create({
    companyName: payload.companyName,
    companyEmail: payload.companyEmail.toLowerCase(),
    email: payload.email.toLowerCase(),
    password: payload.password,
    companyDetails: {
      industry: payload.industry,
      companySize: payload.companySize,
      website: payload.website || '',
      headquarters: payload.headquarters || '',
      description: payload.description || '',
    },
    contactPerson: {
      name: payload.contactName || '',
      designation: payload.contactDesignation || '',
      phone: payload.contactPhone || '',
    },
  });

  return buildAuthPayload(provider);
}

export async function login(payload) {
  const email = payload.email.toLowerCase();
  const requestedRole = payload.role && payload.role !== 'auto' ? payload.role : null;
  const accounts = await findAccountsByEmail(email);
  const prioritizedAccounts = requestedRole
    ? [getAccountByRole(accounts, requestedRole)]
    : [accounts.user, accounts.provider, accounts.admin];
  const candidates = prioritizedAccounts.filter(Boolean);

  if (!candidates.length) {
    throw new AppError('Invalid email or password', 401);
  }

  let account = null;
  for (const candidate of candidates) {
    // Try each matching account for the email so overlapping user/provider emails still work.
    const isValid = await candidate.comparePassword(payload.password);
    if (isValid) {
      account = candidate;
      break;
    }
  }

  if (!account) {
    throw new AppError('Invalid email or password', 401);
  }

  account.lastLoginAt = new Date();
  if (typeof account.save === 'function') {
    await account.save();
  }

  return buildAuthPayload(account);
}

export async function getCurrentAccount(user) {
  if (user.role === 'admin') {
    const admin = await Admin.findById(user.id);
    if (!admin) {
      throw new AppError('Admin not found', 404);
    }
    return admin.toSafeObject();
  }

  if (user.role === 'provider') {
    const provider = await Provider.findById(user.id);
    if (!provider) {
      throw new AppError('Provider not found', 404);
    }
    return provider.toSafeObject();
  }

  const account = await User.findById(user.id);
  if (!account) {
    throw new AppError('User not found', 404);
  }

  return account.toSafeObject();
}

export function getSocialProviders() {
  return [
    {
      id: 'google',
      label: 'Continue with Google',
      isEnabled: Boolean(env.googleAuthUrl),
      authUrl: env.googleAuthUrl || null,
    },
    {
      id: 'github',
      label: 'Continue with GitHub',
      isEnabled: Boolean(env.githubAuthUrl),
      authUrl: env.githubAuthUrl || null,
    },
  ];
}

export function getSocialRedirect(provider) {
  const providers = {
    google: env.googleAuthUrl,
    github: env.githubAuthUrl,
  };

  const authUrl = providers[provider];
  if (!authUrl) {
    throw new AppError(`Social login for ${provider} is not configured`, 503);
  }

  return { provider, authUrl };
}
