/**
 * Application sidebar with navigation and user profile.
 * User profile is pulled from Firebase Auth — never hardcoded.
 *
 * @module AppSidebar
 */

import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Navigation, Users, MessageSquare, Accessibility, Bus, Leaf, Radio, UserCheck } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { ROUTES } from '../../lib/constants';

/** Navigation item definition. */
interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: React.JSX.Element;
}

/** Navigation items for the sidebar. */
const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: <LayoutDashboard aria-hidden="true" /> },
  { label: 'AI Navigator', path: ROUTES.NAVIGATOR, icon: <Navigation aria-hidden="true" /> },
  { label: 'Crowd Intelligence', path: ROUTES.CROWD, icon: <Users aria-hidden="true" /> },
  { label: 'AI Concierge', path: ROUTES.CONCIERGE, icon: <MessageSquare aria-hidden="true" /> },
  { label: 'Accessibility', path: ROUTES.ACCESSIBILITY, icon: <Accessibility aria-hidden="true" /> },
  { label: 'Transport', path: ROUTES.TRANSPORT, icon: <Bus aria-hidden="true" /> },
  { label: 'Sustainability', path: ROUTES.SUSTAINABILITY, icon: <Leaf aria-hidden="true" /> },
  { label: 'Operations', path: ROUTES.OPERATIONS, icon: <Radio aria-hidden="true" /> },
];

/**
 * Renders the application sidebar with navigation and auth user profile.
 *
 * @returns The sidebar component
 */
export function AppSidebar(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, handleSignIn, handleSignOut } = useAuth();

  const handleNav = useCallback((path: string): void => {
    navigate(path);
  }, [navigate]);

  const initials = user?.displayName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'G';

  return (
    <aside className="app-sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-logo">
        <span>StadiumAI</span>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={handleNav.bind(null, item.path)}
            aria-current={location.pathname === item.path ? 'page' : undefined}
            aria-label={`Navigate to ${item.label}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-user">
        {user !== null ? (
          <>
            <div className="sidebar-avatar" aria-hidden="true">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.displayName ?? 'User'}</div>
              <div className="sidebar-user-role">
                <button className="btn-text" onClick={handleSignOut} aria-label="Sign out">
                  Sign Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <button className="btn btn-secondary" onClick={handleSignIn} aria-label="Sign in with Google">
            <UserCheck aria-hidden="true" size={16} />
            Sign In
          </button>
        )}
      </div>
    </aside>
  );
}
