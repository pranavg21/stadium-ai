/**
 * Accessibility Hub page for inclusive stadium navigation and services.
 *
 * @module AccessibilityPage
 */

import { Accessibility, MapPin, Ear, Eye } from 'lucide-react';

/** Accessible facility data. */
interface AccessibleFacility {
  readonly name: string;
  readonly zone: string;
  readonly features: readonly string[];
  readonly icon: React.JSX.Element;
}

/** List of accessible facilities in the stadium. */
const FACILITIES: readonly AccessibleFacility[] = [
  { name: 'Wheelchair Seating Section 100', zone: 'Zone B', features: ['Companion seating', 'Clear sightlines', 'Easy exit access'], icon: <Accessibility aria-hidden="true" size={20} /> },
  { name: 'Sensory Room', zone: 'Zone G', features: ['Quiet space', 'Dimmable lights', 'Live match feed'], icon: <Ear aria-hidden="true" size={20} /> },
  { name: 'Accessible Restrooms', zone: 'Zone D & L', features: ['Wide doors', 'Grab bars', 'Emergency pull cord'], icon: <MapPin aria-hidden="true" size={20} /> },
  { name: 'Audio Description Service', zone: 'Zone B & E', features: ['Live commentary', 'Multi-language', 'Free headsets'], icon: <Eye aria-hidden="true" size={20} /> },
];

/**
 * Renders the Accessibility Hub page.
 *
 * @returns The accessibility page element
 */
export function AccessibilityPage(): React.JSX.Element {
  return (
    <section>
      <div className="page-header">
        <h1>Accessibility Hub</h1>
        <p>Inclusive services and accessible navigation for all fans</p>
      </div>
      <div className="grid-2">
        {FACILITIES.map((facility: AccessibleFacility) => (
          <div key={facility.name} className="glass-card">
            <div className="util-style-4">
              <div className="accessibility-icon">{facility.icon}</div>
              <div>
                <h2 className="accessibility-name">{facility.name}</h2>
                <span className="accessibility-zone">{facility.zone}</span>
              </div>
            </div>
            <ul className="util-style-5">
              {facility.features.map((feat: string) => (
                <li key={feat} className="util-style-6">
                  <span className="accessibility-feat" aria-hidden="true">✓</span> {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="glass-card mt-24">
        <h2 className="util-style-7">Accessibility Assistance</h2>
        <p className="util-style-8">
          Need help? Our trained accessibility volunteers speak 20+ languages and are stationed at every entrance.
          Look for the blue accessibility badge or ask any steward for assistance.
        </p>
        <div className="util-style-9">
          <span className="status-badge low">Sign Language Available</span>
          <span className="status-badge moderate">Wheelchair Rentals at Gate A</span>
          <span className="status-badge low">Service Animals Welcome</span>
        </div>
      </div>
    </section>
  );
}
