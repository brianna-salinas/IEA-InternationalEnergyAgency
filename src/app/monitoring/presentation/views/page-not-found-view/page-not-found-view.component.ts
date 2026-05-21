import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

/**
 * @summary Page Not Found view displayed when an unsupported route is accessed.
 * Shows the attempted route path and provides a button to return to Home.
 * Route: ** (wildcard catch-all)
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-page-not-found-view',
  standalone: true,
  imports: [MatButtonModule, TranslateModule],
  templateUrl: './page-not-found-view.component.html',
  styleUrls: ['./page-not-found-view.component.css']
})
export class PageNotFoundViewComponent implements OnInit {
  private readonly router = inject(Router);

  /** Signal holding the current URL that was not found. */
  readonly deadRoute = signal<string>('');

  /**
   * Captures the current URL on initialization to display it in the error message.
   */
  ngOnInit(): void {
    this.deadRoute.set(this.router.url);
  }

  /**
   * Navigates the user back to the Home view.
   */
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
