import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MonitoringFacade } from '../../../application/monitoring.facade';
import { ReportSummaryCardComponent } from '../../components/report-summary-card/report-summary-card.component';

/**
 * @summary Home view component displaying the energy reports dashboard.
 * Presents the list of registered EnergyReportItems in a two-column grid layout.
 * Route: /home
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [TranslateModule, ReportSummaryCardComponent],
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  /** Facade providing access to monitoring state and use cases. */
  readonly facade = inject(MonitoringFacade);

  /**
   * Lifecycle hook that triggers data loading when the component initializes.
   */
  ngOnInit(): void {
    this.facade.loadAllData();
  }
}
