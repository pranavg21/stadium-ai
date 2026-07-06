/**
 * Zod validation schemas for all data shapes in the application.
 * These schemas are the single source of truth for data validation.
 * Tests MUST import these real schemas — never recreate them.
 *
 * @module Schemas
 */

import { z } from 'zod';
import {
  MAX_CHAT_MESSAGE_LENGTH,
  MAX_INPUT_LENGTH,
} from './constants';

/** Schema for a chat message sent from the client. */
export const chatMessageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(MAX_CHAT_MESSAGE_LENGTH, 'Message too long'),
  language: z.string().length(2, 'Language code must be 2 characters').default('en'),
});

/** Schema for StadiumZone data from Firestore. */
export const stadiumZoneSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['seating', 'concession', 'entrance', 'restroom', 'vip', 'medical', 'parking', 'merchandise']),
  occupancy: z.number(),
  capacity: z.number(),
  currentCount: z.number(),
  status: z.enum(['critical', 'crowded', 'moderate', 'low']),
  coordinates: z.object({
    x: z.number(),
    y: z.number()
  })
});

/** Schema for OperationalAlert data from Firestore. */
export const operationalAlertSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  severity: z.enum(['info', 'warning', 'critical']),
  zoneId: z.string().optional(),
  createdAt: z.string(),
  acknowledged: z.boolean()
});

/** Schema for a navigation request. */
export const navigationRequestSchema = z.object({
  from: z.string().min(1, 'Origin zone required'),
  to: z.string().min(1, 'Destination zone required'),
  accessible: z.boolean().default(false),
});

/** Schema for zone occupancy update. */
export const zoneUpdateSchema = z.object({
  zoneId: z.string().min(1, 'Zone ID required'),
  occupancy: z.number().min(0).max(100),
});

/** Schema for volunteer assignment. */
export const volunteerAssignmentSchema = z.object({
  volunteerId: z.string().min(1, 'Volunteer ID required'),
  zoneId: z.string().min(1, 'Zone ID required'),
  task: z.string().max(MAX_INPUT_LENGTH).optional(),
});

/** Schema for alert creation. */
export const alertCreationSchema = z.object({
  title: z.string().min(1, 'Title required').max(MAX_INPUT_LENGTH),
  message: z.string().min(1, 'Message required').max(MAX_CHAT_MESSAGE_LENGTH),
  severity: z.enum(['info', 'warning', 'critical']),
  zoneId: z.string().optional(),
});

/** Schema for transport search query. */
export const transportSearchSchema = z.object({
  destination: z.string().min(1, 'Destination required'),
  mode: z
    .enum(['metro', 'bus', 'taxi', 'rideshare', 'walking', 'parking'])
    .optional(),
});

/** Schema for sanitized user input. */
export const sanitizedInputSchema = z
  .string()
  .max(MAX_INPUT_LENGTH)
  .transform((val) => val.trim());

/** Schema for feedback submission. */
export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(MAX_CHAT_MESSAGE_LENGTH).optional(),
  category: z.enum([
    'navigation',
    'crowd',
    'concierge',
    'accessibility',
    'transport',
    'sustainability',
    'operations',
    'general',
  ]),
});

/** Inferred types from schemas for use across the application. */
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;

/** Inferred type for navigation request. */
export type NavigationRequestInput = z.infer<typeof navigationRequestSchema>;

/** Inferred type for zone update. */
export type ZoneUpdateInput = z.infer<typeof zoneUpdateSchema>;

/** Inferred type for volunteer assignment. */
export type VolunteerAssignmentInput = z.infer<typeof volunteerAssignmentSchema>;

/** Inferred type for alert creation. */
export type AlertCreationInput = z.infer<typeof alertCreationSchema>;

/** Inferred type for transport search. */
export type TransportSearchInput = z.infer<typeof transportSearchSchema>;

/** Inferred type for feedback. */
export type FeedbackInput = z.infer<typeof feedbackSchema>;
