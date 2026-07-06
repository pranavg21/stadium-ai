/**
 * Root application component with routing and layout.
 * Wraps all pages in ErrorBoundary and provides crowd data context.
 *
 * @module App
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppSidebar } from './components/layout/app-sidebar';
import { AppHeader } from './components/layout/app-header';
import { SkipLink } from './components/layout/skip-link';
import { ErrorBoundary } from './components/ui/error-boundary';
import { LoadingSkeleton } from './components/ui/loading-skeleton';
import { useCrowdData } from './hooks/use-crowd-data';
import { ROUTES, MAIN_CONTENT_ID } from './lib/constants';
import './index.css';

/* ── Lazy-loaded pages for code splitting ── */
const LandingPage = lazy(() => import('./pages/landing-page').then((m) => ({ default: m.LandingPage })));
const DashboardPage = lazy(() => import('./pages/dashboard-page').then((m) => ({ default: m.DashboardPage })));
const NavigatorPage = lazy(() => import('./pages/navigator-page').then((m) => ({ default: m.NavigatorPage })));
const CrowdPage = lazy(() => import('./pages/crowd-page').then((m) => ({ default: m.CrowdPage })));
const ConciergePage = lazy(() => import('./pages/concierge-page').then((m) => ({ default: m.ConciergePage })));
const AccessibilityPage = lazy(() => import('./pages/accessibility-page').then((m) => ({ default: m.AccessibilityPage })));
const TransportPage = lazy(() => import('./pages/transport-page').then((m) => ({ default: m.TransportPage })));
const SustainabilityPage = lazy(() => import('./pages/sustainability-page').then((m) => ({ default: m.SustainabilityPage })));
const OperationsPage = lazy(() => import('./pages/operations-page').then((m) => ({ default: m.OperationsPage })));
const OfflinePage = lazy(() => import('./pages/offline-page').then((m) => ({ default: m.OfflinePage })));

/**
 * Root application component with layout, routing, and error handling.
 *
 * @returns The application root element
 */
export function App(): React.JSX.Element {
  const { zones, isSimulating, toggleSimulation } = useCrowdData();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SkipLink />
        <div className="app-layout">
          <AppSidebar />
          <AppHeader isSimulating={isSimulating} onToggleSimulation={toggleSimulation} />
          <main id={MAIN_CONTENT_ID} className="app-main">
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path={ROUTES.HOME} element={<LandingPage />} />
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage zones={zones} />} />
                <Route path={ROUTES.NAVIGATOR} element={<NavigatorPage zones={zones} />} />
                <Route path={ROUTES.CROWD} element={<CrowdPage zones={zones} />} />
                <Route path={ROUTES.CONCIERGE} element={<ConciergePage zones={zones} />} />
                <Route path={ROUTES.ACCESSIBILITY} element={<AccessibilityPage />} />
                <Route path={ROUTES.TRANSPORT} element={<TransportPage />} />
                <Route path={ROUTES.SUSTAINABILITY} element={<SustainabilityPage />} />
                <Route path={ROUTES.OPERATIONS} element={<OperationsPage zones={zones} />} />
                <Route path={ROUTES.OFFLINE} element={<OfflinePage />} />
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
