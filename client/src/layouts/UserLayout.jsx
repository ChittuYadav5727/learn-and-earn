import { Outlet } from 'react-router-dom';
import AppShell from '../components/shell/AppShell';

const navItems = [
  { to: '/user/learn-earn', label: 'Learn / Earn' },
  { to: '/user/internships', label: 'Internships' },
  { to: '/user/competitions', label: 'Competitions' },
  { to: '/user/leaderboard', label: 'Leaderboard' },
  { to: '/user/wallet', label: 'Wallet' },
  { to: '/user/tasks', label: 'My Task' },
  { to: '/user/profile', label: 'Profile' },
  { to: '/user/certification', label: 'Certification' },
];

export default function UserLayout() {
  return (
    <AppShell theme="user-theme" title="Learner Space" navItems={navItems}>
      <Outlet />
    </AppShell>
  );
}
