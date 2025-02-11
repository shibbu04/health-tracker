import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { User, WORKOUT_TYPES } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="applyFilters()"
            placeholder="Search by name..."
            class="input"
          />
        </div>
        <div class="md:w-64">
          <select
            [(ngModel)]="selectedType"
            (ngModelChange)="applyFilters()"
            class="select"
          >
            <option value="All">All Workout Types</option>
            <option *ngFor="let type of workoutTypes" [value]="type">
              {{type}}
            </option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Workouts</th>
              <th>Number of Workouts</th>
              <th>Total Minutes</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of displayedUsers">
              <td>{{user.name}}</td>
              <td>{{getWorkoutTypes(user)}}</td>
              <td>{{user.workouts.length}}</td>
              <td>{{getTotalMinutes(user)}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <button
            class="pagination-btn"
            [disabled]="currentPage === 1"
            (click)="setPage(currentPage - 1)"
          >
            Previous
          </button>
          <button
            *ngFor="let page of getPageNumbers()"
            class="pagination-btn"
            [class.active]="page === currentPage"
            (click)="setPage(page)"
          >
            {{page}}
          </button>
          <button
            class="pagination-btn"
            [disabled]="currentPage === totalPages"
            (click)="setPage(currentPage + 1)"
          >
            Next
          </button>
        </div>
        <div>
          <select
            [(ngModel)]="itemsPerPage"
            (ngModelChange)="onItemsPerPageChange($event)"
            class="select w-20"
          >
            <option [value]="5">5</option>
            <option [value]="10">10</option>
            <option [value]="20">20</option>
          </select>
        </div>
      </div>
    </div>
  `
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  workoutTypes = WORKOUT_TYPES;
  
  searchQuery = '';
  selectedType = 'All';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  getWorkoutTypes(user: User): string {
    return user.workouts.map(w => w.type).join(', ');
  }

  getTotalMinutes(user: User): number {
    return user.workouts.reduce((total, w) => total + w.minutes, 0);
  }

  applyFilters(): void {
    let filtered = [...this.users];

    // Apply name search filter
    if (this.searchQuery.trim()) {
      const searchLower = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply workout type filter
    if (this.selectedType !== 'All') {
      filtered = filtered.filter(user =>
        user.workouts.some(workout => workout.type === this.selectedType)
      );
    }

    this.filteredUsers = filtered;
    this.currentPage = 1; // Reset to first page when filters change
    this.updateDisplayedUsers();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  onItemsPerPageChange(items: number): void {
    this.itemsPerPage = items;
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }

  private updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedUsers = this.filteredUsers.slice(start, end);
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}