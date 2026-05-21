import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MonitoringFacade } from '../../../application/monitoring.facade';
import { RegionalOperatorService } from '../../../../energy/application/regional-operator.service';
import { RegionalOperator } from '../../../../energy/domain/model/regional-operator.model';
import { EnergyReportItem } from '../../../domain/model/energy-report.model';

/**
 * @summary View component providing a form to register a new EnergyReportItem.
 * Allows the user to select an energy type and a regional operator, then auto-populates
 * countryCode, countryName, centerId and registeredAt before persisting the record.
 * Route: /energy-reports/new
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-new-report-view',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
    UpperCasePipe
  ],
  templateUrl: './new-report-view.component.html',
  styleUrls: ['./new-report-view.component.css']
})
export class NewReportViewComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly facade = inject(MonitoringFacade);
  private readonly operatorService = inject(RegionalOperatorService);

  /** Reactive form group for the energy report creation form. */
  reportForm!: FormGroup;

  /** Signal holding all regional operators fetched from DummyJSON. */
  private readonly allOperators = signal<RegionalOperator[]>([]);

  /** Available energy type options. */
  readonly energyTypes = ['solar', 'wind', 'hydro', 'nuclear', 'gas', 'oil'];

  /** Signal tracking the currently selected energy type. */
  readonly selectedEnergyType = signal<string>('');

  /**
   * Computed signal returning the world region associated with the selected energy type.
   */
  readonly computedRegion = computed(() => {
    const type = this.selectedEnergyType();
    return type ? this.facade.getStaticRegionMapping(type) : '';
  });

  /**
   * Computed signal returning the available operators.
   * Re-evaluates reactively whenever the selected energy type changes,
   * ensuring the operator dropdown resets correctly on energy type selection.
   */
  readonly filteredOperators = computed(() => {
    const _type = this.selectedEnergyType(); // tracked for reactivity
    return this.allOperators();
  });

  ngOnInit(): void {
    this.facade.loadAllData();
    this.loadOperators();
    this.initForm();
  }

  /**
   * Initializes the reactive form with validators.
   * Production must be greater than 0 per business rules.
   */
  private initForm(): void {
    this.reportForm = this.fb.group({
      energyType: ['', [Validators.required]],
      operatorId: ['', [Validators.required]],
      consumption: [0, [Validators.required, Validators.min(0)]],
      production: [0, [Validators.required, Validators.min(1)]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]]
    });

    this.reportForm.get('energyType')?.valueChanges.subscribe(value => {
      this.selectedEnergyType.set(value ?? '');
      // Reset operator when energy type changes
      this.reportForm.get('operatorId')?.reset('');
    });
  }

  /**
   * Fetches regional operators from DummyJSON API and stores them in the signal.
   */
  private loadOperators(): void {
    this.operatorService.getRegionalOperators().subscribe(data => {
      this.allOperators.set(data);
    });
  }

  /**
   * Handles the Create action. Validates the form, resolves operator and center,
   * auto-populates derived fields, and persists the report via the facade.
   */
  onCreateReport(): void {
    if (this.reportForm.invalid) return;

    const formValues = this.reportForm.value;
    const matchedOperator = this.allOperators().find(o => o.id === formValues.operatorId);
    const matchedCenter = this.facade.centers().find(c => c.energyType === formValues.energyType);

    if (!matchedOperator || !matchedCenter) return;

    const newReport: EnergyReportItem = {
      centerId: matchedCenter.id,
      energyType: formValues.energyType,
      countryCode: matchedOperator.countryCode,
      countryName: matchedOperator.countryName,
      consumption: Number(formValues.consumption),
      production: Number(formValues.production),
      year: Number(formValues.year),
      registeredAt: new Date().toISOString()
    };

    this.facade.addReport(newReport).subscribe({
      next: () => this.router.navigate(['/home'])
    });
  }

  /**
   * Handles the Cancel action, discarding the form and navigating back to Home.
   */
  onCancel(): void {
    this.router.navigate(['/home']);
  }
}
