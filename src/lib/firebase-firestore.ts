/**
 * Firebase Firestore operations for typed data persistence.
 * Provides CRUD helpers for stadium zone data and chat history.
 *
 * @module FirebaseFirestore
 */

import { getFirestore, collection, doc, setDoc, getDocs, onSnapshot, type Firestore, type Unsubscribe } from 'firebase/firestore';
import { getFirebaseApp } from './firebase-config';
import { logger } from './logger';
import { extractErrorMessage } from './error-helpers';
import type { StadiumZone, OperationalAlert } from './types';
import { stadiumZoneSchema, operationalAlertSchema } from './schemas';

/** Singleton Firestore instance. */
let firestoreInstance: Firestore | null = null;

/**
 * Returns the Firestore instance.
 *
 * @returns The Firestore instance
 */
export function getFirestoreInstance(): Firestore {
  if (firestoreInstance === null) {
    firestoreInstance = getFirestore(getFirebaseApp());
  }
  return firestoreInstance;
}

/**
 * Saves zone data to Firestore.
 *
 * @param zone - The zone data to persist
 */
export async function saveZoneData(zone: StadiumZone): Promise<void> {
  try {
    const db = getFirestoreInstance();
    await setDoc(doc(db, 'zones', zone.id), zone);
  } catch (error: unknown) {
    logger.error('Failed to save zone', { error: extractErrorMessage(error), zoneId: zone.id });
  }
}

/**
 * Fetches all zone data from Firestore.
 *
 * @returns Array of stadium zones
 */
export async function fetchAllZones(): Promise<StadiumZone[]> {
  try {
    const db = getFirestoreInstance();
    const snapshot = await getDocs(collection(db, 'zones'));
    return snapshot.docs.map((d) => stadiumZoneSchema.parse(d.data()));
  } catch (error: unknown) {
    logger.error('Failed to fetch zones', { error: extractErrorMessage(error) });
    return [];
  }
}

/**
 * Subscribes to real-time zone updates from Firestore.
 *
 * @param callback - Function called with updated zones array
 * @returns Unsubscribe function
 */
export function subscribeToZones(callback: (zones: StadiumZone[]) => void): Unsubscribe {
  const db = getFirestoreInstance();
  return onSnapshot(collection(db, 'zones'), (snapshot) => {
    const zones = snapshot.docs.map((d) => stadiumZoneSchema.parse(d.data()));
    callback(zones);
  });
}

/**
 * Subscribes to real-time alert updates from Firestore.
 *
 * @param callback - Function called with updated alerts array
 * @returns Unsubscribe function
 */
export function subscribeToAlerts(callback: (alerts: OperationalAlert[]) => void): Unsubscribe {
  const db = getFirestoreInstance();
  return onSnapshot(collection(db, 'alerts'), (snapshot) => {
    const alerts = snapshot.docs.map((d) => operationalAlertSchema.parse(d.data()));
    callback(alerts);
  });
}
