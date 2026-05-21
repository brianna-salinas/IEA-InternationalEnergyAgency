import { Component, input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { EnergyReportItem } from '../../../domain/model/energy-report.model';

/**
 * @summary Presentation component rendering a summary card for a single EnergyReportItem.
 * Displays country name, energy type, consumption, production, year, and registration date.
 * Included inside the Home view grid list. Not directly associated with a navigation route.
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-report-summary-card',
  standalone: true,
  imports: [MatCardModule, DatePipe, UpperCasePipe, TranslateModule],
  templateUrl: './report-summary-card.component.html',
  styleUrls: ['./report-summary-card.component.css']
})
export class ReportSummaryCardComponent {
  /** The energy report item to display, passed as a required input signal. */
  readonly reportItem = input.required<EnergyReportItem>();
}
