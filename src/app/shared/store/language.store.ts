import { Injectable, signal, computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * @summary Global state management store handling regionalization switching using Angular Signals.
 * @author Brianna Salinas Guzman
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageStore {
  private translateService = inject(TranslateService);

  private currentLangSignal = signal<string>('en');
  public currentLang = computed(() => this.currentLangSignal());

  constructor() {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  public changeLanguage(lang: string): void {
    this.currentLangSignal.set(lang);
    this.translateService.use(lang);
  }
}
