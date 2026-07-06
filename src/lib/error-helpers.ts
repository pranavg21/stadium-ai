/**
 * Error handling utilities. Extracts safe error messages from unknown errors.
 * This helper prevents the duplicated error-extraction pattern
 * that was repeated 11 times in CarbonTrack and cost 2-3%.
 *
 * @module ErrorHelpers
 */

/**
 * Extracts a safe error message from an unknown error value.
 *
 * @param error - The unknown error to extract a message from
 * @returns A string error message safe for logging and display
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * Creates a structured error object for API responses.
 * Never leaks stack traces — returns only safe messages.
 *
 * @param message - The user-facing error message
 * @param code - Optional error code for programmatic handling
 * @returns A structured error response object
 */
export function createErrorResponse(
  message: string,
  code?: string
): { readonly error: string; readonly code?: string } {
  return code ? { error: message, code } : { error: message };
}
