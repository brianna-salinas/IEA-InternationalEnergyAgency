import { Routes } from '@angular/router';

/**
 * @summary Main application routing configuration with semantic child routes per bounded context.
 * @author Brianna Salinas Guzman
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./monitoring/presentation/views/home-view/home-view.component')
        .then(m => m.HomeViewComponent)
  },
  {
    /** Child routes for the energy-reports bounded context */
    path: 'energy-reports',
    children: [
      {
        path: 'new',
        loadComponent: () =>
          import('./monitoring/presentation/views/new-report-view/new-report-view.component')
            .then(m => m.NewReportViewComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./monitoring/presentation/views/page-not-found-view/page-not-found-view.component')
        .then(m => m.PageNotFoundViewComponent)
  }
];
