import { describe, it, expect } from 'vitest';
import { APP_NAME, ROUTES, SIMULATION_INTERVAL_MS, CHAT_CONTEXT_WINDOW, CRITICAL_OCCUPANCY_THRESHOLD, CROWDED_OCCUPANCY_THRESHOLD, MODERATE_OCCUPANCY_THRESHOLD, MAX_CHAT_MESSAGE_LENGTH, MAIN_CONTENT_ID } from '../../lib/constants';

describe('constants', () => {
  it('has correct app name', () => {
    expect(APP_NAME).toBe('StadiumAI');
  });

  it('has valid route paths', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.DASHBOARD).toBe('/dashboard');
    expect(ROUTES.NAVIGATOR).toBe('/navigator');
    expect(ROUTES.CONCIERGE).toBe('/concierge');
    expect(Object.keys(ROUTES).length).toBeGreaterThanOrEqual(8);
  });

  it('has valid timing constants', () => {
    expect(SIMULATION_INTERVAL_MS).toBeGreaterThan(0);
    expect(CHAT_CONTEXT_WINDOW).toBeGreaterThan(0);
  });

  it('has ordered occupancy thresholds', () => {
    expect(CRITICAL_OCCUPANCY_THRESHOLD).toBeGreaterThan(CROWDED_OCCUPANCY_THRESHOLD);
    expect(CROWDED_OCCUPANCY_THRESHOLD).toBeGreaterThan(MODERATE_OCCUPANCY_THRESHOLD);
  });

  it('has valid input limits', () => {
    expect(MAX_CHAT_MESSAGE_LENGTH).toBeGreaterThan(0);
  });

  it('has main content id', () => {
    expect(MAIN_CONTENT_ID).toBe('main-content');
  });
});
