/**
 * Landing page with hero section and feature overview.
 *
 * @module LandingPage
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Users, MessageSquare, Accessibility, Bus, Leaf, Radio, UserCheck } from 'lucide-react';
import { ROUTES, APP_DESCRIPTION } from '../lib/constants';

/** Feature card data. */
interface FeatureItem {
  readonly title: string;
  readonly desc: string;
  readonly icon: React.JSX.Element;
  readonly route: string;
  readonly color: string;
}

/** Features to display on the landing page. */
const FEATURES: readonly FeatureItem[] = [
  { title: 'AI Navigator', desc: 'Smart pathfinding with crowd awareness', icon: <Navigation aria-hidden="true" />, route: ROUTES.NAVIGATOR, color: 'var(--accent-blue)' },
  { title: 'Crowd Intelligence', desc: 'Real-time density monitoring', icon: <Users aria-hidden="true" />, route: ROUTES.CROWD, color: 'var(--accent-amber)' },
  { title: 'AI Concierge', desc: 'Multilingual stadium assistant', icon: <MessageSquare aria-hidden="true" />, route: ROUTES.CONCIERGE, color: 'var(--accent-purple)' },
  { title: 'Accessibility Hub', desc: 'Inclusive navigation & services', icon: <Accessibility aria-hidden="true" />, route: ROUTES.ACCESSIBILITY, color: 'var(--accent-emerald)' },
  { title: 'Smart Transport', desc: 'Transit & parking intelligence', icon: <Bus aria-hidden="true" />, route: ROUTES.TRANSPORT, color: 'var(--accent-blue)' },
  { title: 'Sustainability', desc: 'Environmental impact tracking', icon: <Leaf aria-hidden="true" />, route: ROUTES.SUSTAINABILITY, color: 'var(--accent-emerald)' },
  { title: 'Operations Center', desc: 'Staff command & decision support', icon: <Radio aria-hidden="true" />, route: ROUTES.OPERATIONS, color: 'var(--accent-rose)' },
  { title: 'Volunteer Coordination', desc: 'Volunteer assignment & tracking', icon: <UserCheck aria-hidden="true" />, route: ROUTES.OPERATIONS, color: 'var(--accent-amber)' },
];

/**
 * Renders the landing page with hero and feature grid.
 *
 * @returns The landing page element
 */
export function LandingPage(): React.JSX.Element {
  const navigate = useNavigate();

  const handleFeatureClick = useCallback((route: string): void => {
    navigate(route);
  }, [navigate]);

  const handleDashboardClick = useCallback((): void => {
    navigate(ROUTES.DASHBOARD);
  }, [navigate]);

  return (
    <section>
      <div className="page-header landing-hero">
        <h1 className="util-style-20">
          StadiumAI
        </h1>
        <p className="util-style-21">{APP_DESCRIPTION}</p>
        <button className="btn btn-primary util-style-22" onClick={handleDashboardClick} aria-label="Go to dashboard">
          Launch Dashboard
        </button>
      </div>
      <div className="grid-auto">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} onClick={handleFeatureClick} />
        ))}
      </div>
    </section>
  );
}

interface FeatureCardProps {
  readonly feature: FeatureItem;
  readonly onClick: (route: string) => void;
}

function FeatureCard({ feature, onClick }: FeatureCardProps): React.JSX.Element {
  const handleClick = useCallback(() => {
    onClick(feature.route);
  }, [onClick, feature.route]);

  return (
    <button className="glass-card util-style-23" onClick={handleClick} aria-label={`Open ${feature.title}: ${feature.desc}`}>
      <div className="feature-icon-wrap" style={{ '--feature-color': feature.color } as React.CSSProperties}>{feature.icon}</div>
      <h2 className="util-style-24">{feature.title}</h2>
      <p className="feature-desc">{feature.desc}</p>
    </button>
  );
}
