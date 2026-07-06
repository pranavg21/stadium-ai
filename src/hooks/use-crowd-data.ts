/**
 * React hook for real-time crowd density data with simulation support.
 *
 * @module UseCrowdData
 */

import { useState, useEffect, useCallback } from 'react';
import { STADIUM_ZONES } from '../lib/stadium-data';
import { simulateTick } from '../lib/simulation';
import { SIMULATION_INTERVAL_MS } from '../lib/constants';
import type { StadiumZone } from '../lib/types';

/** Return type for the useCrowdData hook. */
interface UseCrowdDataReturn {
  /** Current zone data array. */
  readonly zones: readonly StadiumZone[];
  /** Whether simulation is running. */
  readonly isSimulating: boolean;
  /** Toggles simulation on/off. */
  readonly toggleSimulation: () => void;
  /** Manually refreshes zone data. */
  readonly refreshData: () => void;
}

/**
 * Hook for managing crowd density data with optional real-time simulation.
 *
 * @returns Crowd data state and controls
 */
export function useCrowdData(): UseCrowdDataReturn {
  const [zones, setZones] = useState<StadiumZone[]>([...STADIUM_ZONES]);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (!isSimulating) {
      return;
    }
    const interval = setInterval(() => {
      setZones((prev) => simulateTick(prev));
    }, SIMULATION_INTERVAL_MS);

    return (): void => {
      clearInterval(interval);
    };
  }, [isSimulating]);

  const toggleSimulation = useCallback((): void => {
    setIsSimulating((prev) => !prev);
  }, []);

  const refreshData = useCallback((): void => {
    setZones(simulateTick([...STADIUM_ZONES]));
  }, []);

  return { zones, isSimulating, toggleSimulation, refreshData };
}
