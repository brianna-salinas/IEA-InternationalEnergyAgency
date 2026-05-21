import { Injectable, signal, computed } from '@angular/core';
import { EnergyReportItem } from '../domain/model/energy-report.model';
import { EnergyCenter } from '../domain/model/energy-center.model';

/**
 * @summary Signal-based Store for Energy Monitoring state management.
 * Implements the Store pattern using Angular Signals to provide reactive,
 * centralized state for energy report items and monitoring centers.
 * @author Brianna Salinas Guzman
 */
@Injectable({
  providedIn: 'root'
})
export class MonitoringStore {
  /** Private writable signal holding the list of energy report items. */
  private readonly _reports = signal<EnergyReportItem[]>([]);

  /** Private writable signal holding the list of energy monitoring centers. */
  private readonly _centers = signal<EnergyCenter[]>([]);

  /** Private writable signal for loading state. */
  private readonly _loading = signal<boolean>(false);

  /** Read-only computed signal exposing all energy report items. */
  readonly reports = computed(() => this._reports());

  /** Read-only computed signal exposing all energy monitoring centers. */
  readonly centers = computed(() => this._centers());

  /** Read-only computed signal exposing loading state. */
  readonly loading = computed(() => this._loading());

  /**
   * Sets the list of energy report items in the store.
   * @param items - Array of EnergyReportItem to store.
   */
  setReports(items: EnergyReportItem[]): void {
    this._reports.set(items);
  }

  /**
   * Appends a newly created report to the existing list.
   * @param item - The new EnergyReportItem to append.
   */
  addReport(item: EnergyReportItem): void {
    this._reports.update(current => [...current, item]);
  }

  /**
   * Sets the list of energy monitoring centers in the store.
   * @param centers - Array of EnergyCenter to store.
   */
  setCenters(centers: EnergyCenter[]): void {
    this._centers.set(centers);
  }

  /**
   * Sets the loading state.
   * @param value - Boolean loading state value.
   */
  setLoading(value: boolean): void {
    this._loading.set(value);
  }
}
