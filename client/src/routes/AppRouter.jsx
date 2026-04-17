import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import ProviderLayout from '../layouts/ProviderLayout';
import PublicLayout from '../layouts/PublicLayout';
import UserLayout from '../layouts/UserLayout';
import HomePage from '../features/public/pages/HomePage';
import LoginPage from '../features/public/pages/LoginPage';
import RegisterPage from '../features/public/pages/RegisterPage';
import DashboardPage from '../features/provider/pages/DashboardPage';
import CompanyProfilePage from '../features/provider/pages/CompanyProfilePage';
import GstVerificationPage from '../features/provider/pages/GstVerificationPage';
import ManagePostsPage from '../features/provider/pages/ManagePostsPage';
import PostOpportunitiesPage from '../features/provider/pages/PostOpportunitiesPage';
import ViewApplicantsPage from '../features/provider/pages/ViewApplicantsPage';
import CertificationPage from '../features/user/pages/CertificationPage';
import CompetitionsPage from '../features/user/pages/CompetitionsPage';
import InternshipsPage from '../features/user/pages/InternshipsPage';
import LeaderboardPage from '../features/user/pages/LeaderboardPage';
import LearnEarnPage from '../features/user/pages/LearnEarnPage';
import MyTasksPage from '../features/user/pages/MyTasksPage';
import ProfilePage from '../features/user/pages/ProfilePage';
import WalletPage from '../features/user/pages/WalletPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRole="user" />}>
        <Route element={<UserLayout />}>
          <Route path="/user/learn-earn" element={<LearnEarnPage />} />
          <Route path="/user/internships" element={<InternshipsPage />} />
          <Route path="/user/competitions" element={<CompetitionsPage />} />
          <Route path="/user/leaderboard" element={<LeaderboardPage />} />
          <Route path="/user/wallet" element={<WalletPage />} />
          <Route path="/user/tasks" element={<MyTasksPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/certification" element={<CertificationPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRole="provider" />}>
        <Route element={<ProviderLayout />}>
          <Route path="/provider/dashboard" element={<DashboardPage />} />
          <Route path="/provider/gst-verification" element={<GstVerificationPage />} />
          <Route path="/provider/post-opportunities" element={<PostOpportunitiesPage />} />
          <Route path="/provider/manage-posts" element={<ManagePostsPage />} />
          <Route path="/provider/applicants" element={<ViewApplicantsPage />} />
          <Route path="/provider/company-profile" element={<CompanyProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
