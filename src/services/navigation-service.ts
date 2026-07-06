/**
 * Pathfinding service for stadium navigation.
 * Uses a weighted graph approach considering crowd congestion.
 *
 * @module NavigationService
 */

import type { StadiumZone, NavigationRoute } from '../lib/types';

/** Adjacency map for zone connections. */
const ZONE_ADJACENCY: Record<string, readonly string[]> = {
  'zone-a': ['zone-b', 'zone-d', 'zone-i'],
  'zone-b': ['zone-a', 'zone-c', 'zone-d', 'zone-e', 'zone-g'],
  'zone-c': ['zone-b', 'zone-d'],
  'zone-d': ['zone-a', 'zone-b', 'zone-c'],
  'zone-e': ['zone-b', 'zone-f', 'zone-g'],
  'zone-f': ['zone-e', 'zone-l'],
  'zone-g': ['zone-b', 'zone-e', 'zone-h'],
  'zone-h': ['zone-g', 'zone-j'],
  'zone-i': ['zone-a', 'zone-e'],
  'zone-j': ['zone-h', 'zone-k', 'zone-l'],
  'zone-k': ['zone-j'],
  'zone-l': ['zone-f', 'zone-j'],
};

/**
 * Finds the best route between two zones using BFS with congestion weighting.
 *
 * @param from - Starting zone ID
 * @param to - Destination zone ID
 * @param zones - Current zone data for congestion awareness
 * @returns The computed navigation route, or null if no path exists
 */
export function findRoute(
  from: string,
  to: string,
  zones: readonly StadiumZone[]
): NavigationRoute | null {
  if (from === to) {
    return createRoute(from, to, [from], zones);
  }

  const zoneMap = new Map(zones.map((z) => [z.id, z]));
  const visited = new Set<string>();
  const parent = new Map<string, string>();
  const queue: string[] = [from];
  visited.add(from);

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) {
      break;
    }
    const neighbors = ZONE_ADJACENCY[current] ?? [];

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue;
      }
      visited.add(neighbor);
      parent.set(neighbor, current);

      if (neighbor === to) {
        const path = reconstructPath(from, to, parent);
        return createRoute(from, to, path, zones);
      }

      const zone = zoneMap.get(neighbor);
      const congestion = zone?.occupancy ?? 50;
      if (congestion < 95) {
        queue.push(neighbor);
      }
    }
  }

  return null;
}

/**
 * Reconstructs the path from BFS parent map.
 *
 * @param from - Start zone
 * @param to - End zone
 * @param parent - Parent map from BFS
 * @returns Ordered array of zone IDs
 */
function reconstructPath(from: string, to: string, parent: Map<string, string>): string[] {
  const path: string[] = [to];
  let current = to;
  while (current !== from) {
    const prev = parent.get(current);
    if (prev === undefined) {
      break;
    }
    path.unshift(prev);
    current = prev;
  }
  return path;
}

/**
 * Creates a NavigationRoute from path data.
 *
 * @param from - Start zone
 * @param to - End zone
 * @param path - Zone ID path
 * @param zones - Zone data for congestion calculation
 * @returns The navigation route object
 */
function createRoute(
  from: string,
  to: string,
  path: readonly string[],
  zones: readonly StadiumZone[]
): NavigationRoute {
  const zoneMap = new Map(zones.map((z) => [z.id, z]));
  const avgCongestion = path.reduce((sum, id) => {
    const zone = zoneMap.get(id);
    return sum + (zone?.occupancy ?? 50);
  }, 0) / Math.max(path.length, 1);

  return {
    from,
    to,
    path,
    estimatedMinutes: path.length * 2,
    accessible: true,
    congestion: Math.round(avgCongestion),
  };
}
