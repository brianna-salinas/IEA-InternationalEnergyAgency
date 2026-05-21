import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { environment } from '../../../../../environments/environment';

/**
 * Shared header component containing the toolbar, navigation links, logo, and language switcher.
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LanguageSwitcher
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  /** IEA logo URL resolved from environment configuration. */
  readonly logoUrl = environment.logoApiUrl;
}
