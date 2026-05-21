/**
 * @summary Domain entity representing an Energy Monitoring Center.
 * Each center is associated with a specific type of energy source.
 * @author Brianna Salinas Guzman
 */
export interface EnergyCenter {
  /** Unique identifier of the monitoring center. */
  id: string | number;
  /** Human-readable name of the energy monitoring center. */
  name: string;
  /** The energy type this center is responsible for monitoring. */
  energyType: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'gas' | 'oil';
}
