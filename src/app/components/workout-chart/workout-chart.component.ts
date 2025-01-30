import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { WorkoutService } from '../../services/workout.service';
import { User, WORKOUT_TYPES } from '../../models/workout.model';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [NgChartsModule],
  template: `
    <div class="card">
      <h2 class="text-xl font-semibold mb-4">Workout Statistics</h2>
      <canvas
        baseChart
        [data]="chartData"
        [options]="chartOptions"
        [type]="'bar'"
      >
      </canvas>
    </div>
  `
})
export class WorkoutChartComponent implements OnInit {
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.updateChartData(users);
    });
  }

  private updateChartData(users: User[]): void {
    const workoutTypeMinutes = new Map<string, number>();
    const workoutTypeCounts = new Map<string, number>();

    WORKOUT_TYPES.forEach(type => {
      workoutTypeMinutes.set(type, 0);
      workoutTypeCounts.set(type, 0);
    });

    users.forEach(user => {
      user.workouts.forEach(workout => {
        const currentMinutes = workoutTypeMinutes.get(workout.type) || 0;
        const currentCount = workoutTypeCounts.get(workout.type) || 0;
        workoutTypeMinutes.set(workout.type, currentMinutes + workout.minutes);
        workoutTypeCounts.set(workout.type, currentCount + 1);
      });
    });

    this.chartData = {
      labels: Array.from(WORKOUT_TYPES),
      datasets: [
        {
          label: 'Total Minutes',
          data: Array.from(WORKOUT_TYPES).map(type => workoutTypeMinutes.get(type) || 0),
          backgroundColor: 'rgba(14, 165, 233, 0.5)',
          borderColor: 'rgb(14, 165, 233)',
          borderWidth: 1
        },
        {
          label: 'Number of Workouts',
          data: Array.from(WORKOUT_TYPES).map(type => workoutTypeCounts.get(type) || 0),
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1
        }
      ]
    };
  }
}