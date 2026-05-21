import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

/**
 * Presentation component that switches the active UI language between EN and ES.
 * @author Brianna Salinas Guzman
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  /** Currently selected language code. */
  currentLang = 'en';
  /** Supported language codes. */
  readonly languages = ['en', 'es'];

  /**
   * @param translate - Translation service for managing runtime locale state.
   */
  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang || 'en';
  }

  /**
   * Changes the active application language.
   * @param language - Locale code to activate (e.g., 'en' or 'es').
   */
  useLanguage(language: string): void {
    this.currentLang = language;
    this.translate.use(language);
  }
}
