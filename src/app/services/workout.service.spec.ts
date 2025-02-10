import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User, Workout } from '../models/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    }
  ];

  beforeEach(() => {
    const store: { [key: string]: string } = {};
    localStorageSpy = jasmine.createSpyObj('Storage', ['getItem', 'setItem']);
    localStorageSpy.getItem.and.callFake((key: string): string | null => {
          return store[key] || null;
        });
    localStorageSpy.setItem.and.callFake((key: string, value: string): void => {
      store[key] = value;
    });
    
    spyOn(localStorage, 'getItem').and.callFake(localStorageSpy.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageSpy.setItem);
    
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    expect(service).toBeTruthy();
  });

  it('should load initial data from localStorage', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    let users: User[] = [];
    service.getUsers().subscribe(data => users = data);
    
    expect(users).toEqual(mockUsers);
    expect(localStorage.getItem).toHaveBeenCalledWith('health_tracker_users');
  });

  it('should load initial users when localStorage is empty', () => {
    localStorageSpy.getItem.and.returnValue(null);
    service = TestBed.inject(WorkoutService);
    
    let users: User[] = [];
    service.getUsers().subscribe(data => users = data);
    
    expect(users.length).toBeGreaterThan(0);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'health_tracker_users',
      jasmine.any(String)
    );
  });

  it('should add workout for existing user', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const newWorkout: Workout = { type: 'Yoga', minutes: 40 };
    service.addWorkout('John Doe', newWorkout);
    
    let users: User[] = [];
    service.getUsers().subscribe(data => users = data);
    
    const user = users.find(u => u.name === 'John Doe');
    expect(user?.workouts).toContain(newWorkout);
  });

  it('should create new user when adding workout for non-existing user', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const newWorkout: Workout = { type: 'Yoga', minutes: 40 };
    service.addWorkout('New User', newWorkout);
    
    let users: User[] = [];
    service.getUsers().subscribe(data => users = data);
    
    const newUser = users.find(u => u.name === 'New User');
    expect(newUser).toBeTruthy();
    expect(newUser?.workouts).toContain(newWorkout);
  });

  it('should search users by name case-insensitive', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const results = service.searchUsers('john');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('John Doe');
  });

  it('should return empty array when no users match search', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const results = service.searchUsers('NonExistent');
    expect(results.length).toBe(0);
  });

  it('should filter users by workout type', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const results = service.filterByWorkoutType('Running');
    expect(results.length).toBe(2);
  });

  it('should return all users when filtering by "All" type', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const results = service.filterByWorkoutType('All');
    expect(results.length).toBe(mockUsers.length);
  });

  it('should return all users when filtering by empty type', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const results = service.filterByWorkoutType('');
    expect(results.length).toBe(mockUsers.length);
  });

  it('should save to localStorage when adding workout', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const newWorkout: Workout = { type: 'Yoga', minutes: 40 };
    service.addWorkout('New User', newWorkout);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'health_tracker_users',
      jasmine.any(String)
    );
  });

  it('should generate correct new user ID', () => {
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));
    service = TestBed.inject(WorkoutService);
    
    const newWorkout: Workout = { type: 'Yoga', minutes: 40 };
    service.addWorkout('New User', newWorkout);
    
    let users: User[] = [];
    service.getUsers().subscribe(data => users = data);
    
    const newUser = users.find(u => u.name === 'New User');
    expect(newUser?.id).toBe(3); // Since max ID in mock data is 2
  });
});