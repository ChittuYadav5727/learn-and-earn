import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStoredTheme, saveStoredTheme } from '../utils/storage';

function ThemeIcon({ theme }) {
  return theme === 'dark' ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5a1 1 0 0 1 1 1v1.07a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-4.5a1 1 0 0 1 0 2h-1.07a1 1 0 0 1 0-2h1.07ZM6.57 12a1 1 0 0 1-1 1H4.5a1 1 0 0 1 0-2h1.07a1 1 0 0 1 1 1Zm9.42 5.35a1 1 0 0 1 1.41 0l.76.76a1 1 0 0 1-1.42 1.41l-.75-.75a1 1 0 0 1 0-1.42ZM6.6 6.6A1 1 0 0 1 8 6.6l.76.76A1 1 0 1 1 7.34 8.8l-.75-.76a1 1 0 0 1 0-1.41Zm11.56 0a1 1 0 0 1 0 1.41l-.76.76A1 1 0 0 1 16 7.34l.75-.75a1 1 0 0 1 1.41 0ZM8.8 16a1 1 0 0 1 0 1.4l-.76.76a1 1 0 0 1-1.41-1.41l.75-.75A1 1 0 0 1 8.8 16Z" />
    </svg>
  );
}

export default function PublicLayout() {
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveStoredTheme(theme);
  }, [theme]);

  return (
    <div className="public-shell">
      <header className="public-header">
        <Link className="logo-link" to="/">
          <span className="logo-mark">L</span>
          Learn & Earn
        </Link>
        <nav className="public-nav">
          <a href="/#platform">Platform</a>
          <a href="/#videos">Videos</a>
          <a href="/#community">Community</a>
          <button className="theme-toggle" type="button" onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} aria-label="Toggle theme">
            <ThemeIcon theme={theme} />
          </button>
          <Link to="/login">Login</Link>
          <Link className="nav-cta" to="/register">
            Get Started
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
