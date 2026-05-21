import { inject, Injectable, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EnergyReportService } from '../infrastructure/energy-report.service';
import { EnergyCenterService } from '../infrastructure/energy-center.service';
import { EnergyReportItem } from '../domain/model/energy-report.model';
import { MonitoringStore } from './monitoring.store';

/**
 * @summary Application Facade orchestrating use cases for energy monitoring.
 * Delegates state management to MonitoringStore and coordinates infrastructure services.
 * Implements the Facade pattern to provide a simplified interface for presentation components.
 * @author Brianna Salinas Guzman
 */
@Injectable({
  providedIn: 'root'
})
export class MonitoringFacade {
  private readonly reportService = inject(EnergyReportService);
  private readonly centerService = inject(EnergyCenterService);
  private readonly store = inject(MonitoringStore);

  /** Exposes the reactive reports signal from the store. */
  readonly reports = computed(() => this.store.reports());

  /** Exposes the reactive centers signal from the store. */
  readonly centers = computed(() => this.store.centers());

  /** Exposes the loading state signal from the store. */
  readonly loading = computed(() => this.store.loading());

  /** Static mapping of energy types to their associated world regions. */
  private static readonly REGION_MAP: Record<string, string> = {
    solar: 'Africa',
    wind: 'Europe',
    hydro: 'South America',
    nuclear: 'North America',
    gas: 'Middle East',
    oil: 'Asia'
  };

  /**
   * Loads all energy report items and monitoring centers from the backend
   * and pushes them into the store signals.
   */
  loadAllData(): void {
    this.store.setLoading(true);
    this.reportService.getAll().subscribe(data => {
      this.store.setReports(data);
      this.store.setLoading(false);
    });
    this.centerService.getAllCenters().subscribe(data => {
      this.store.setCenters(data);
    });
  }

  /**
   * Creates a new energy report item via the backend and adds it to the store.
   * @param report - The EnergyReportItem to persist.
   * @returns Observable of the created EnergyReportItem.
   */
  addReport(report: EnergyReportItem): Observable<EnergyReportItem> {
    return this.reportService.create(report).pipe(
      tap(newRecord => this.store.addReport(newRecord))
    );
  }

  /**
   * Returns the world region associated with a given energy type.
   * @param energyType - The energy type string (e.g. 'solar', 'wind').
   * @returns The associated region name string.
   */
  getStaticRegionMapping(energyType: string): string {
    return MonitoringFacade.REGION_MAP[energyType.toLowerCase()] ?? 'Global';
  }
}
