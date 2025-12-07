import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'app_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme$ = new BehaviorSubject<Theme>(this.initialTheme());
  readonly theme$ = this._theme$.asObservable();

  private initialTheme(): Theme {
    // 1) saved value
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;

    // 2) system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3) default
    return 'light';
  }

  current(): Theme {
    return this._theme$.value;
  }

  set(theme: Theme) {
    this._theme$.next(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    this.applyToDocument(theme);
  }

  toggle() {
    this.set(this.current() === 'light' ? 'dark' : 'light');
  }

  applyToDocument(theme: Theme) {
    const body = document.body;
    if (theme === 'dark') body.classList.add('theme-dark');
    else body.classList.remove('theme-dark');
  }

  // Call on app startup
  init() {
    this.applyToDocument(this.current());
  }
}
