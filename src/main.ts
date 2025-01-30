import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './app/components/workout-form/workout-form.component';
import { WorkoutListComponent } from './app/components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './app/components/workout-chart/workout-chart.component';
import { ThemeToggleComponent } from './app/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkoutFormComponent,
    WorkoutListComponent,
    WorkoutChartComponent,
    ThemeToggleComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <svg class="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4z"/>
            </svg>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Health Challenge Tracker
            </h1>
          </div>
          <app-theme-toggle></app-theme-toggle>
        </div>
      </header>

      <main class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <app-workout-form></app-workout-form>
          </div>
          <div class="lg:col-span-2 space-y-8">
            <app-workout-chart></app-workout-chart>
            <app-workout-list></app-workout-list>
          </div>
        </div>
      </main>

      <footer class="bg-white dark:bg-gray-800 shadow-lg mt-16">
        <div class="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Health Challenge Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `
})
export class App {
  name = 'Health Challenge Tracker';
}

bootstrapApplication(App);