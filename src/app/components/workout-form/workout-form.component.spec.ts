import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { WORKOUT_TYPES } from '../../models/workout.model';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);
    spy.addWorkout.and.returnValue(undefined);
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule],
      providers: [
        FormBuilder,
        { provide: WorkoutService, useValue: spy }
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.workoutForm.get('name')?.value).toBe('');
    expect(component.workoutForm.get('type')?.value).toBe('');
    expect(component.workoutForm.get('minutes')?.value).toBe('');
  });

  it('should expose WORKOUT_TYPES', () => {
    expect(component.workoutTypes).toEqual(WORKOUT_TYPES);
  });

  it('should validate required fields', () => {
    const form = component.workoutForm;
    expect(form.valid).toBeFalsy();
    
    form.controls['name'].setValue('John');
    form.controls['type'].setValue('Running');
    form.controls['minutes'].setValue(30);
    
    expect(form.valid).toBeTruthy();
  });

  it('should validate minutes greater than 0', () => {
    const minutesControl = component.workoutForm.controls['minutes'];
    
    minutesControl.setValue(0);
    expect(minutesControl.errors?.['min']).toBeTruthy();
    
    minutesControl.setValue(30);
    expect(minutesControl.errors).toBeFalsy();
  });

  it('should call workoutService.addWorkout on valid form submission', () => {
    const workoutData = {
      name: 'John',
      type: 'Running',
      minutes: 30
    };
    
    component.workoutForm.setValue(workoutData);
    component.onSubmit();
    
    expect(workoutService.addWorkout).toHaveBeenCalledWith(
      workoutData.name,
      { type: workoutData.type, minutes: workoutData.minutes }
    );
  });

  it('should not call workoutService.addWorkout on invalid form submission', () => {
    component.onSubmit();
    expect(workoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should reset form after successful submission', () => {
    const workoutData = {
      name: 'John',
      type: 'Running',
      minutes: 30
    };
    
    component.workoutForm.setValue(workoutData);
    component.onSubmit();
    
    expect(component.workoutForm.get('name')?.value).toBe('');
    expect(component.workoutForm.get('type')?.value).toBe('');
    expect(component.workoutForm.get('minutes')?.value).toBe('');
  });

  it('should mark fields as touched on invalid submission', () => {
    component.onSubmit();
    
    expect(component.workoutForm.get('name')?.touched).toBeTruthy();
    expect(component.workoutForm.get('type')?.touched).toBeTruthy();
    expect(component.workoutForm.get('minutes')?.touched).toBeTruthy();
  });

  it('should correctly identify invalid fields', () => {
    const nameControl = component.workoutForm.get('name');
    nameControl?.markAsTouched();
    
    expect(component.isFieldInvalid('name')).toBeTruthy();
    
    nameControl?.setValue('John');
    expect(component.isFieldInvalid('name')).toBeFalsy();
  });

  it('should correctly identify invalid fields when dirty', () => {
    const nameControl = component.workoutForm.get('name');
    nameControl?.markAsDirty();
    
    expect(component.isFieldInvalid('name')).toBeTruthy();
    
    nameControl?.setValue('John');
    expect(component.isFieldInvalid('name')).toBeFalsy();
  });
});