/**
 * Data export utilities for CSV and JSON file downloads.
 * Shared utility to prevent the export-logic duplication
 * that was found in CarbonTrack (Header.tsx + SettingsPage.tsx).
 *
 * @module ExportHelpers
 */

import { EXPORT_FILENAME_PREFIX, MIME_TYPE_JSON, MIME_TYPE_CSV } from './constants';

/**
 * Triggers a file download in the browser.
 *
 * @param content - The file content as a string
 * @param filename - The download filename
 * @param mimeType - The MIME type for the file
 */
function triggerDownload(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Exports data as a JSON file download.
 *
 * @param data - The data object to export
 * @param label - Optional label for the filename
 */
export function exportAsJson(data: unknown, label: string = 'data'): void {
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `${EXPORT_FILENAME_PREFIX}-${label}-${timestamp}.json`;
  const content = JSON.stringify(data, null, 2);
  triggerDownload(content, filename, MIME_TYPE_JSON);
}

/**
 * Exports tabular data as a CSV file download.
 *
 * @param headers - Column header names
 * @param rows - Array of row data arrays
 * @param label - Optional label for the filename
 */
export function exportAsCsv(
  headers: readonly string[],
  rows: readonly (readonly string[])[],
  label: string = 'data'
): void {
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `${EXPORT_FILENAME_PREFIX}-${label}-${timestamp}.csv`;
  const headerLine = headers.join(',');
  const dataLines = rows.map((row) => row.map(escapeCsvField).join(','));
  const content = [headerLine, ...dataLines].join('\n');
  triggerDownload(content, filename, MIME_TYPE_CSV);
}

/**
 * Escapes a CSV field value by wrapping in quotes if necessary.
 *
 * @param field - The field value to escape
 * @returns The escaped field value
 */
function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}
