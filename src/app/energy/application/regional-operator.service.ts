import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegionalOperator } from '../domain/model/regional-operator.model';
import { RegionalOperatorAssembler } from '../infrastructure/regional-operator.assembler';

/**
 * @summary Application service for retrieving Regional Operators from DummyJSON API.
 * Applies the Assembler pattern to map external API responses to domain entities.
 * @author Brianna Salinas Guzman
 */
@Injectable({
  providedIn: 'root'
})
export class RegionalOperatorService {
  private readonly http = inject(HttpClient);

  /** Base URL for the DummyJSON external API. */
  private readonly baseUrl = environment.dummyJsonApiUrl;

  /**
   * Fetches all regional operators from DummyJSON users endpoint.
   * Maps raw API response objects to RegionalOperator domain entities via the Assembler.
   * @returns Observable array of RegionalOperator domain entities.
   */
  getRegionalOperators(): Observable<RegionalOperator[]> {
    return this.http.get<{ users: any[] }>(`${this.baseUrl}/users?limit=100`).pipe(
      map(response => RegionalOperatorAssembler.toDomainList(response.users))
    );
  }
}
