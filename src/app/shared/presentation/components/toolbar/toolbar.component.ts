import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageStore } from '../../../store/language.store';
import { environment } from '../../../../../environments/environment';

/**
 * @summary Shared Toolbar component rendered at the top of every view.
 * Displays the IEA logo, platform title, navigation links, and language switcher.
 * Consumes LanguageStore to synchronize language state reactively via Angular Signals.
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    TranslateModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  /** Injected language store providing reactive language state. */
  readonly state = inject(LanguageStore);

  /** Logo URL resolved from environment configuration via Logo.dev API. */
  readonly logoUrl = environment.logoApiUrl;

  /**
   * Handles language toggle button change events.
   * @param lang - The selected language code ('en' or 'es').
   */
  onLanguageChange(lang: string): void {
    if (lang) {
      this.state.changeLanguage(lang);
    }
  }
}
