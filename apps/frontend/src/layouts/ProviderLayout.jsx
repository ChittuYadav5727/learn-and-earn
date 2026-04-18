import { Outlet } from 'react-router-dom';
import AppShell from '../components/shell/AppShell';

const navItems = [
  { to: '/provider/dashboard', label: 'Dashboard' },
  { to: '/provider/gst-verification', label: 'GST Verification' },
  { to: '/provider/post-opportunities', label: 'Post Opportunities' },
  { to: '/provider/manage-posts', label: 'Manage Posts' },
  { to: '/provider/applicants', label: 'View Applicants' },
  { to: '/provider/company-profile', label: 'Company Profile' },
];

export default function ProviderLayout() {
  return (
    <AppShell theme="provider-theme" title="Provider Console" navItems={navItems}>
      <Outlet />
    </AppShell>
  );
}
