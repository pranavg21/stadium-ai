/**
 * Emergency and Safety page with critical information for stadium visitors.
 * Displays medical stations, evacuation routes, and emergency contacts.
 *
 * @module EmergencyPage
 */

import { AlertTriangle, Phone, MapPin, Shield } from 'lucide-react';
import { STADIUM_ZONES } from '../lib/stadium-data';
import type { StadiumZone } from '../lib/types';

/** Emergency contact entry. */
interface EmergencyContact {
  readonly label: string;
  readonly number: string;
  readonly description: string;
}

/** Emergency contacts list. */
const EMERGENCY_CONTACTS: readonly EmergencyContact[] = [
  { label: 'Stadium Emergency Line', number: '1-800-STADIUM', description: 'For all stadium emergencies' },
  { label: 'Local Emergency Services', number: '911', description: 'Police, fire, and ambulance' },
  { label: 'Medical Assistance', number: '1-800-MED-HELP', description: 'Non-urgent medical needs' },
  { label: 'Lost & Found', number: '1-800-LOST-FND', description: 'Report or claim lost items' },
];

/** Evacuation procedure step. */
interface EvacuationStep {
  readonly step: number;
  readonly instruction: string;
}

/** Evacuation procedure steps. */
const EVACUATION_STEPS: readonly EvacuationStep[] = [
  { step: 1, instruction: 'Stay calm and listen for announcements on the PA system.' },
  { step: 2, instruction: 'Follow the illuminated exit signs to your nearest exit.' },
  { step: 3, instruction: 'Do NOT use elevators. Use stairways and ramps.' },
  { step: 4, instruction: 'Assist those with mobility needs or direct them to stewards.' },
  { step: 5, instruction: 'Proceed to the designated assembly point outside the stadium.' },
  { step: 6, instruction: 'Do not re-enter the stadium until authorized by officials.' },
];

/**
 * Renders the Emergency & Safety page.
 *
 * @returns The emergency page element
 */
export function EmergencyPage(): React.JSX.Element {
  const medicalZones = STADIUM_ZONES.filter((z: StadiumZone) => z.category === 'medical');

  return (
    <section>
      <div className="page-header">
        <h1>Emergency & Safety</h1>
        <p>Critical safety information and emergency contacts</p>
      </div>
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="emergency-section-heading">
            <Phone aria-hidden="true" size={18} /> Emergency Contacts
          </h2>
          <div className="emergency-contacts-list">
            {EMERGENCY_CONTACTS.map((contact) => (
              <div key={contact.label} className="emergency-contact-item">
                <div className="emergency-contact-label">{contact.label}</div>
                <div className="emergency-contact-number">{contact.number}</div>
                <div className="emergency-contact-desc">{contact.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card">
          <h2 className="emergency-section-heading">
            <MapPin aria-hidden="true" size={18} /> Medical Stations
          </h2>
          {medicalZones.map((zone: StadiumZone) => (
            <div key={zone.id} className="emergency-medical-station">
              <span className="status-badge low">Open</span>
              <span className="emergency-medical-name">{zone.name}</span>
              <span className="emergency-medical-capacity">
                {zone.currentCount} / {zone.capacity} capacity
              </span>
            </div>
          ))}
          <p className="emergency-medical-note">
            First-aid volunteers are stationed at every entrance gate with blue badges.
          </p>
        </div>
      </div>
      <div className="glass-card mt-24">
        <h2 className="emergency-section-heading">
          <AlertTriangle aria-hidden="true" size={18} /> Evacuation Procedures
        </h2>
        <ol className="evacuation-steps">
          {EVACUATION_STEPS.map((item) => (
            <li key={item.step} className="evacuation-step-item">
              {item.instruction}
            </li>
          ))}
        </ol>
      </div>
      <div className="glass-card mt-24">
        <h2 className="emergency-section-heading">
          <Shield aria-hidden="true" size={18} /> Safety Tips
        </h2>
        <ul className="safety-tips-list">
          <li className="offline-list-item">
            <span aria-hidden="true">📍</span> Note your nearest exit when you arrive
          </li>
          <li className="offline-list-item">
            <span aria-hidden="true">🔋</span> Keep your phone charged for emergency updates
          </li>
          <li className="offline-list-item">
            <span aria-hidden="true">💧</span> Stay hydrated — free water stations at every gate
          </li>
          <li className="offline-list-item">
            <span aria-hidden="true">👮</span> Report suspicious activity to any steward immediately
          </li>
        </ul>
      </div>
    </section>
  );
}
