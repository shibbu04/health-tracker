import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { WORKOUT_TYPES } from '../../models/workout.model';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()" class="card space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium mb-1">User Name*</label>
        <input
          id="name"
          type="text"
          formControlName="name"
          class="input"
          [class.border-red-500]="isFieldInvalid('name')"
        />
        <p *ngIf="isFieldInvalid('name')" class="text-red-500 text-sm mt-1">
          Name is required
        </p>
      </div>

      <div>
        <label for="type" class="block text-sm font-medium mb-1">Workout Type*</label>
        <select
          id="type"
          formControlName="type"
          class="select"
          [class.border-red-500]="isFieldInvalid('type')"
        >
          <option value="">Select a workout type</option>
          <option *ngFor="let type of workoutTypes" [value]="type">
            {{type}}
          </option>
        </select>
        <p *ngIf="isFieldInvalid('type')" class="text-red-500 text-sm mt-1">
          Workout type is required
        </p>
      </div>

      <div>
        <label for="minutes" class="block text-sm font-medium mb-1">Workout Minutes*</label>
        <input
          id="minutes"
          type="number"
          formControlName="minutes"
          class="input"
          [class.border-red-500]="isFieldInvalid('minutes')"
          min="1"
        />
        <p *ngIf="isFieldInvalid('minutes')" class="text-red-500 text-sm mt-1">
          Minutes must be greater than 0
        </p>
      </div>

      <button type="submit" class="btn btn-primary w-full">
        Add Workout
      </button>
    </form>
  `
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  workoutTypes = WORKOUT_TYPES;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.workoutForm.get(field);
    return formControl!.invalid && (formControl!.dirty || formControl!.touched);
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const { name, type, minutes } = this.workoutForm.value;
      this.workoutService.addWorkout(name, { type, minutes });
      this.workoutForm.reset();
    } else {
      Object.keys(this.workoutForm.controls).forEach(key => {
        const control = this.workoutForm.get(key);
        if (control!.invalid) {
          control!.markAsTouched();
        }
      });
    }
  }
}