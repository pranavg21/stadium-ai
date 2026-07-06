/**
 * Export button component for CSV/JSON data downloads.
 *
 * @module ExportButton
 */

import { useCallback } from 'react';
import { Download } from 'lucide-react';
import { exportAsJson, exportAsCsv } from '../../lib/export-helpers';
import { trackExport } from '../../lib/firebase-analytics';

/** Props for the ExportButton component. */
interface ExportButtonProps {
  /** The data to export. */
  readonly data: unknown;
  /** Export label for filename. */
  readonly label: string;
  /** Optional CSV headers (if provided, CSV export is available). */
  readonly csvHeaders?: readonly string[];
  /** Optional CSV rows. */
  readonly csvRows?: readonly (readonly string[])[];
}

/**
 * Renders an export button with JSON and optional CSV download.
 *
 * @param props - Export button properties
 * @returns The export button element
 */
export function ExportButton({ data, label, csvHeaders, csvRows }: ExportButtonProps): React.JSX.Element {
  const handleJsonExport = useCallback((): void => {
    exportAsJson(data, label);
    trackExport('json', label);
  }, [data, label]);

  const handleCsvExport = useCallback((): void => {
    if (csvHeaders !== undefined && csvRows !== undefined) {
      exportAsCsv(csvHeaders, csvRows, label);
      trackExport('csv', label);
    }
  }, [csvHeaders, csvRows, label]);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button className="btn btn-secondary" onClick={handleJsonExport} aria-label={`Export ${label} as JSON`}>
        <Download size={14} aria-hidden="true" />
        JSON
      </button>
      {csvHeaders !== undefined && csvRows !== undefined && (
        <button className="btn btn-secondary" onClick={handleCsvExport} aria-label={`Export ${label} as CSV`}>
          <Download size={14} aria-hidden="true" />
          CSV
        </button>
      )}
    </div>
  );
}
