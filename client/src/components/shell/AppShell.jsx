import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AppShell({ theme, title, navItems, children }) {
  const { user, logout } = useAuth();

  return (
    <div className={`app-shell ${theme}`}>
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">Learn & Earn</p>
          <h1>{title}</h1>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div>
            <strong>{user?.name || user?.companyName}</strong>
            <p>{user?.email}</p>
          </div>
          <button className="secondary-button" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="app-content">{children}</main>
    </div>
  );
}
