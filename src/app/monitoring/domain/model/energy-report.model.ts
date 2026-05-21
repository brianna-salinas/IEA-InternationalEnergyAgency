/**
 * @summary Domain entity representing an energy report item linked to an Energy Monitoring Center.
 * Contains metrics for energy consumption and production for a specific country and year.
 * @author Brianna Salinas Guzman
 */
export interface EnergyReportItem {
  /** Optional auto-generated identifier assigned by the backend. */
  id?: number | string;
  /** Foreign key linking this report to an EnergyMonitoringCenter. */
  centerId: number | string;
  /** Type of energy (solar, wind, hydro, nuclear, gas, oil). */
  energyType: string;
  /** Regional country code built as 'US-{stateCode}'. */
  countryCode: string;
  /** Full country name obtained from DummyJSON API. */
  countryName: string;
  /** Energy consumption in MWh. */
  consumption: number;
  /** Energy production in MWh. Must be greater than zero. */
  production: number;
  /** The reporting year. */
  year: number;
  /** ISO 8601 timestamp of when the report was registered. */
  registeredAt: string;
}
