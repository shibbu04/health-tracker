import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="toggleTheme()"
      class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      [attr.aria-label]="(isDark$ | async) ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <svg
        *ngIf="!(isDark$ | async)"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      <svg
        *ngIf="isDark$ | async"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
        />
      </svg>
    </button>
  `
})
export class ThemeToggleComponent implements OnInit {
  isDark$ = this.themeService.isDark();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize theme
    this.isDark$.subscribe(isDark => {
      document.documentElement.classList.toggle('dark', isDark);
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}