/**
 * @summary Domain entity representing a Regional Operator obtained from DummyJSON API.
 * Used to associate a country region with an energy report item.
 * @author Brianna Salinas Guzman
 */
export interface RegionalOperator {
  /** Unique identifier from the DummyJSON users API. */
  id: number;
  /** Full name composed of firstName and lastName from the API. */
  fullName: string;
  /** Regional code built as 'US-{stateCode}' from the address data. */
  countryCode: string;
  /** Country name obtained from address.country field. */
  countryName: string;
}
