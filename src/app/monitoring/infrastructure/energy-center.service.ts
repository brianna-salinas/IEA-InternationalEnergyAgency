import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EnergyCenter } from '../domain/model/energy-center.model';

/**
 * @summary Infrastructure service implementing the API and Endpoint patterns for EnergyCenter resources.
 * Handles HTTP communication with the json-server backend for energy monitoring center data.
 * @author Brianna Salinas Guzman
 */
@Injectable({
  providedIn: 'root'
})
export class EnergyCenterService {
  private readonly http = inject(HttpClient);

  /** API endpoint URL for energy monitoring centers resource. */
  private readonly endpoint = `${environment.jsonServerApiUrl}/energy-monitoring-centers`;

  /**
   * Retrieves all energy monitoring centers from the backend.
   * @returns Observable array of EnergyCenter.
   */
  getAllCenters(): Observable<EnergyCenter[]> {
    return this.http.get<EnergyCenter[]>(this.endpoint);
  }
}
