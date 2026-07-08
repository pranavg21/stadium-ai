/**
 * FIFA World Cup 2026 stadium seed data with realistic zone configurations.
 * Provides initial data for the MetLife Stadium venue.
 *
 * @module StadiumData
 */

import type { StadiumZone, MatchInfo, TransportOption, Volunteer, SustainabilityMetric, OperationalAlert } from './types';

/** Seed data for stadium zones at MetLife Stadium. */
export const STADIUM_ZONES: readonly StadiumZone[] = [
  { id: 'zone-a', name: 'Gate A - Main Entrance', category: 'entrance', occupancy: 72, capacity: 5000, currentCount: 3600, status: 'crowded', coordinates: { x: 50, y: 6 } },
  { id: 'zone-b', name: 'Section 100 - Lower Bowl', category: 'seating', occupancy: 85, capacity: 8000, currentCount: 6800, status: 'crowded', coordinates: { x: 30, y: 18 } },
  { id: 'zone-c', name: 'Concession West', category: 'concession', occupancy: 91, capacity: 2000, currentCount: 1820, status: 'critical', coordinates: { x: 8, y: 50 } },
  { id: 'zone-d', name: 'Restrooms North', category: 'restroom', occupancy: 65, capacity: 800, currentCount: 520, status: 'moderate', coordinates: { x: 68, y: 15 } },
  { id: 'zone-e', name: 'Section 200 - Upper Bowl', category: 'seating', occupancy: 45, capacity: 10000, currentCount: 4500, status: 'moderate', coordinates: { x: 75, y: 22 } },
  { id: 'zone-f', name: 'Concession East', category: 'concession', occupancy: 38, capacity: 2000, currentCount: 760, status: 'low', coordinates: { x: 92, y: 50 } },
  { id: 'zone-g', name: 'VIP Lounge', category: 'vip', occupancy: 55, capacity: 500, currentCount: 275, status: 'moderate', coordinates: { x: 50, y: 80 } },
  { id: 'zone-h', name: 'Medical Station', category: 'medical', occupancy: 20, capacity: 100, currentCount: 20, status: 'low', coordinates: { x: 18, y: 30 } },
  { id: 'zone-i', name: 'Merchandise Store', category: 'merchandise', occupancy: 78, capacity: 1500, currentCount: 1170, status: 'crowded', coordinates: { x: 82, y: 30 } },
  { id: 'zone-j', name: 'Gate B - South Entrance', category: 'entrance', occupancy: 42, capacity: 4000, currentCount: 1680, status: 'moderate', coordinates: { x: 50, y: 94 } },
  { id: 'zone-k', name: 'Parking Lot A', category: 'parking', occupancy: 88, capacity: 3000, currentCount: 2640, status: 'crowded', coordinates: { x: 18, y: 75 } },
  { id: 'zone-l', name: 'Restrooms South', category: 'restroom', occupancy: 30, capacity: 600, currentCount: 180, status: 'low', coordinates: { x: 82, y: 75 } },
] as const;

/** Current match information. */
export const CURRENT_MATCH: MatchInfo = {
  id: 'match-sf1',
  homeTeam: 'Brazil',
  awayTeam: 'France',
  venue: 'MetLife Stadium, New Jersey',
  startTime: '2026-07-10T20:00:00Z',
  status: 'live',
} as const;

/** Available transport options. */
export const TRANSPORT_OPTIONS: readonly TransportOption[] = [
  { id: 'tr-1', mode: 'metro', name: 'NJ Transit Line 3', estimatedMinutes: 25, available: true, congestion: 65 },
  { id: 'tr-2', mode: 'bus', name: 'Shuttle Bus A', estimatedMinutes: 15, available: true, congestion: 80 },
  { id: 'tr-3', mode: 'bus', name: 'Shuttle Bus B', estimatedMinutes: 20, available: true, congestion: 45 },
  { id: 'tr-4', mode: 'rideshare', name: 'Rideshare Pickup Zone', estimatedMinutes: 10, available: true, congestion: 70 },
  { id: 'tr-5', mode: 'taxi', name: 'Taxi Stand Gate 7', estimatedMinutes: 12, available: true, congestion: 55 },
  { id: 'tr-6', mode: 'parking', name: 'Parking Lot A (North)', estimatedMinutes: 8, available: true, congestion: 88 },
] as const;

/** Volunteer roster data. */
export const VOLUNTEERS: readonly Volunteer[] = [
  { id: 'vol-1', name: 'Maria Garcia', status: 'assigned', assignedZone: 'zone-a', languages: ['en', 'es'], currentTask: 'Gate assistance' },
  { id: 'vol-2', name: 'Yuki Tanaka', status: 'assigned', assignedZone: 'zone-c', languages: ['en', 'ja'], currentTask: 'Queue management' },
  { id: 'vol-3', name: 'Ahmed Hassan', status: 'available', languages: ['en', 'ar', 'fr'] },
  { id: 'vol-4', name: 'Sophie Martin', status: 'assigned', assignedZone: 'zone-b', languages: ['en', 'fr', 'de'], currentTask: 'Seating guidance' },
  { id: 'vol-5', name: 'Raj Patel', status: 'on-break', languages: ['en', 'hi'] },
  { id: 'vol-6', name: 'Li Wei', status: 'assigned', assignedZone: 'zone-i', languages: ['en', 'zh'], currentTask: 'Merchandise help' },
] as const;

/** Sustainability metrics. */
export const SUSTAINABILITY_METRICS: readonly SustainabilityMetric[] = [
  { category: 'waste', current: 78, target: 85, unit: '% diverted', trend: 'up' },
  { category: 'energy', current: 24, target: 30, unit: '% reduction', trend: 'up' },
  { category: 'water', current: 35, target: 40, unit: '% conserved', trend: 'stable' },
  { category: 'carbon', current: 42, target: 50, unit: 'tons offset', trend: 'up' },
] as const;

/** Demo operational alerts for when Firestore is unavailable. */
export const DEMO_ALERTS: readonly OperationalAlert[] = [
  { id: 'alert-1', title: 'High Crowd Density — Zone C', message: 'Concession West has exceeded 90% capacity. Consider redirecting fans to Zone F.', severity: 'critical', zoneId: 'zone-c', createdAt: new Date().toISOString(), acknowledged: false },
  { id: 'alert-2', title: 'Medical Request — Zone B', message: 'A fan has requested medical assistance in Section 100, Row 12.', severity: 'warning', zoneId: 'zone-b', createdAt: new Date().toISOString(), acknowledged: false },
  { id: 'alert-3', title: 'Parking Lot A Near Capacity', message: 'Parking Lot A is at 88% capacity. Shuttles are being rerouted to Lot C.', severity: 'info', zoneId: 'zone-k', createdAt: new Date().toISOString(), acknowledged: false },
] as const;
