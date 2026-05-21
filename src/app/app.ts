import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/presentation/components/toolbar/toolbar.component';

/**
 * @summary Root application component that bootstraps the IEA Energy Monitoring Platform.
 * Hosts the shared Toolbar and the router outlet for view navigation.
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
