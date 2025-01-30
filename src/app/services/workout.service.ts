import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'health_tracker_users';
  private usersSubject = new BehaviorSubject<User[]>(this.getInitialUsers());
  
  constructor() {
    this.loadFromStorage();
  }

  private getInitialUsers(): User[] {
    return [
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
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.usersSubject.next(JSON.parse(stored));
    } else {
      const initial = this.getInitialUsers();
      this.saveToStorage(initial);
      this.usersSubject.next(initial);
    }
  }

  private saveToStorage(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addWorkout(name: string, workout: Workout): void {
    const users = this.usersSubject.value;
    const existingUser = users.find(u => u.name.toLowerCase() === name.toLowerCase());

    if (existingUser) {
      existingUser.workouts.push(workout);
    } else {
      users.push({
        id: Math.max(...users.map(u => u.id)) + 1,
        name,
        workouts: [workout]
      });
    }

    this.saveToStorage(users);
    this.usersSubject.next(users);
  }

  searchUsers(query: string): User[] {
    return this.usersSubject.value.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  filterByWorkoutType(type: string): User[] {
    if (!type || type === 'All') return this.usersSubject.value;
    return this.usersSubject.value.filter(user =>
      user.workouts.some(workout => workout.type === type)
    );
  }
}