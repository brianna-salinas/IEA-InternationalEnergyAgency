import { RegionalOperator } from './../domain/model/regional-operator.model';

/**
 * @summary Maps non-standard external DummyJSON structures into strict, clean Domain Entities.
 * @author Brianna Salinas Guzman
 */
export class RegionalOperatorAssembler {
  public static toDomainModel(externalUser: any): RegionalOperator {
    const stateCode = externalUser.address?.stateCode || 'XX';
    const country = externalUser.address?.country || 'Unknown';

    return {
      id: externalUser.id,
      fullName: `${externalUser.firstName} ${externalUser.lastName}`,
      countryCode: `US-${stateCode}`,
      countryName: country
    };
  }

  public static toDomainList(externalUsers: any[]): RegionalOperator[] {
    if (!externalUsers) return [];
    return externalUsers.map(user => this.toDomainModel(user));
  }
}
