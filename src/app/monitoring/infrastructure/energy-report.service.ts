import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EnergyReportItem } from '../domain/model/energy-report.model';

/**
 * @summary Infrastructure service implementing the API and Endpoint patterns for EnergyReportItem resources.
 * Handles HTTP communication with the json-server backend for energy report data.
 * @author Brianna Salinas Guzman
 */
@Injectable({
  providedIn: 'root'
})
export class EnergyReportService {
  private readonly http = inject(HttpClient);

  /** API endpoint URL for energy report items resource. */
  private readonly endpoint = `${environment.jsonServerApiUrl}/energy-report-items`;

  /**
   * Retrieves all energy report items from the backend.
   * @returns Observable array of EnergyReportItem.
   */
  getAll(): Observable<EnergyReportItem[]> {
    return this.http.get<EnergyReportItem[]>(this.endpoint);
  }

  /**
   * Persists a new energy report item to the backend.
   * @param item - The EnergyReportItem to create.
   * @returns Observable of the created EnergyReportItem with assigned id.
   */
  create(item: EnergyReportItem): Observable<EnergyReportItem> {
    return this.http.post<EnergyReportItem>(this.endpoint, item);
  }
}
