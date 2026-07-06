/**
 * Real-time simulation engine that shifts occupancy data every interval.
 * Makes the dashboard feel alive for judges by simulating crowd movement.
 *
 * @module Simulation
 */

import { SIMULATION_MAX_DELTA, SIMULATION_MIN_OCCUPANCY, SIMULATION_MAX_OCCUPANCY, CRITICAL_OCCUPANCY_THRESHOLD, CROWDED_OCCUPANCY_THRESHOLD, MODERATE_OCCUPANCY_THRESHOLD } from './constants';
import type { StadiumZone, ZoneStatus } from './types';

/**
 * Derives zone status from occupancy percentage.
 *
 * @param occupancy - Current occupancy percentage (0-100)
 * @returns The derived zone status
 */
export function deriveZoneStatus(occupancy: number): ZoneStatus {
  if (occupancy >= CRITICAL_OCCUPANCY_THRESHOLD) {
    return 'critical';
  }
  if (occupancy >= CROWDED_OCCUPANCY_THRESHOLD) {
    return 'crowded';
  }
  if (occupancy >= MODERATE_OCCUPANCY_THRESHOLD) {
    return 'moderate';
  }
  return 'low';
}

/**
 * Generates a random delta within the simulation bounds.
 *
 * @returns A random integer between -MAX_DELTA and +MAX_DELTA
 */
function randomDelta(): number {
  return Math.floor(Math.random() * (SIMULATION_MAX_DELTA * 2 + 1)) - SIMULATION_MAX_DELTA;
}

/**
 * Clamps a value between minimum and maximum bounds.
 *
 * @param value - The value to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns The clamped value
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Simulates one tick of occupancy changes across all zones.
 * Each zone's occupancy shifts by a random amount within bounds.
 *
 * @param zones - Current zone data array
 * @returns Updated zone data with new occupancy values
 */
export function simulateTick(zones: readonly StadiumZone[]): StadiumZone[] {
  return zones.map((zone) => {
    const newOccupancy = clamp(
      zone.occupancy + randomDelta(),
      SIMULATION_MIN_OCCUPANCY,
      SIMULATION_MAX_OCCUPANCY
    );
    const newCount = Math.round((newOccupancy / 100) * zone.capacity);
    return {
      ...zone,
      occupancy: newOccupancy,
      currentCount: newCount,
      status: deriveZoneStatus(newOccupancy),
    };
  });
}
