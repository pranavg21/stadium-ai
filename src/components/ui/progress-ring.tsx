/**
 * Circular progress ring SVG component.
 *
 * @module ProgressRing
 */

/** Props for the ProgressRing component. */
interface ProgressRingProps {
  /** Progress percentage (0-100). */
  readonly progress: number;
  /** Ring size in pixels. */
  readonly size?: number;
  /** Ring stroke width. */
  readonly strokeWidth?: number;
  /** Ring color. */
  readonly color?: string;
}

/** Default ring size. */
const DEFAULT_SIZE = 80;

/** Default stroke width. */
const DEFAULT_STROKE = 6;

/**
 * Renders a circular SVG progress ring.
 *
 * @param props - Progress ring properties
 * @returns The progress ring element
 */
export function ProgressRing({
  progress,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  color = 'var(--accent-blue)',
}: ProgressRingProps): React.JSX.Element {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-container" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}% progress`}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} className="progress-transition" />
      </svg>
      <div className="progress-ring-label">{progress}%</div>
    </div>
  );
}
