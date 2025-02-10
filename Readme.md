# Health Challenge Tracker

A modern web application for tracking workout activities and health challenges. Built with Angular and featuring a beautiful, responsive UI with dark mode support.

## 🌐 Live Demo

Check out the live demo: [Health Tracker](https://health-trackerz-app.vercel.app)

## 🌟 Features

- ✨ Beautiful, responsive UI with dark mode support
- 📊 Interactive workout statistics charts
- 🔍 Search and filter workout records
- 📱 Mobile-friendly design
- 💾 Local storage persistence
- 📝 Form validation
- 🎨 Theme customization

## 🛠️ Tech Stack

- **Frontend Framework**: Angular 18
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with ng2-charts
- **State Management**: RxJS
- **Form Handling**: Angular Reactive Forms
- **Type Safety**: TypeScript
- **Storage**: Local Storage API
- **Deployment**: Vercel
- **Testing**: Jasmine & Karma

## 🧪 Testing Overview

### Testing Stack
- **Framework**: Jasmine (Testing Framework)
- **Test Runner**: Karma (Test Runner)
- **Coverage Tool**: Istanbul (Code Coverage)

### Testing Strategy

#### 1. Component Testing (WorkoutFormComponent)
We use Angular's TestBed for component testing, focusing on:
- Form initialization and validation
- User interactions
- Error states
- Component lifecycle
- Input/Output behavior

Example of component test:
```typescript
it('should validate required fields', () => {
  const form = component.workoutForm;
  expect(form.valid).toBeFalsy();
  
  form.controls['name'].setValue('John');
  form.controls['type'].setValue('Running');
  form.controls['minutes'].setValue(30);
  
  expect(form.valid).toBeTruthy();
});
```

#### 2. Service Testing (WorkoutService)
Service tests focus on:
- Data management
- Business logic
- State management
- LocalStorage integration
- Error handling

Example of service test:
```typescript
it('should add workout for existing user', () => {
  const newWorkout = { type: 'Yoga', minutes: 40 };
  service.addWorkout('John Doe', newWorkout);
  
  let users: User[] = [];
  service.getUsers().subscribe(data => users = data);
  
  const user = users.find(u => u.name === 'John Doe');
  expect(user?.workouts).toContain(newWorkout);
});
```

### Test Coverage Report

#### WorkoutFormComponent
- **Statements**: 100% (47/47)
- **Branches**: 100% (13/13)
- **Functions**: 100% (19/19)
- **Lines**: 100% (44/44)

Key areas tested:
- Form initialization and validation
- User input handling
- Error state management
- Form submission logic
- Field state tracking
- Reset functionality
- Edge cases handling

#### WorkoutService
- **Statements**: 100% (47/47)
- **Branches**: 100% (13/13)
- **Functions**: 100% (19/19)
- **Lines**: 100% (44/44)

Key areas tested:
- Data initialization and persistence
- LocalStorage integration
- CRUD operations
- Search functionality
- Filtering logic
- Error handling
- Edge cases
- State management

### Testing Best Practices Used
1. **Isolation**: Each test is independent and doesn't affect others
2. **Mocking**: External dependencies are properly mocked
3. **Coverage**: Comprehensive coverage of all code paths
4. **Readability**: Clear test descriptions and organized structure
5. **Maintenance**: Tests are easy to maintain and update

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── workout-form/
│   │   │   ├── workout-form.component.ts
│   │   │   └── workout-form.component.spec.ts
│   │   ├── workout-list/
│   │   │   └── workout-list.component.ts
│   │   ├── workout-chart/
│   │   │   └── workout-chart.component.ts
│   │   └── theme-toggle/
│   │       └── theme-toggle.component.ts
│   ├── services/
│   │   ├── workout.service.ts
│   │   ├── workout.service.spec.ts
│   │   └── theme.service.ts
│   └── models/
│       └── workout.model.ts
├── assets/
└── styles/
    └── global_styles.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shibbu04/health-tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd health-tracker
   ```

3. Install dependencies:
   ```bash
   npm install 

   or (if version issue)

   npm install --legacy-peer-deps
   ```

### Development Mode

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and visit `http://localhost:4200`

3. The app will automatically reload if you change any source files

### Production Mode

1. Build the application:
   ```bash
   npm run build
   ```

2. The build artifacts will be stored in the `dist/` directory

3. To serve the production build locally:
   ```bash
   npm install -g http-server
   http-server dist/demo
   ```

## 🧪 Testing

### Running Unit Tests

1. Execute all tests:
   ```bash
   npm test
   ```

2. Run tests in watch mode (for development):
   ```bash
   npm test -- --watch
   ```

### Code Coverage

1. Generate coverage report:
   ```bash
   npm run test:coverage
   ```

2. View the coverage report:
   - Open `coverage/index.html` in your browser

### Test Structure

- **Component Tests**: `src/app/components/**/*.spec.ts`
  - WorkoutFormComponent tests cover:
    - Form initialization
    - Validation
    - Form submission
    - Error handling
    - Edge cases

- **Service Tests**: `src/app/services/**/*.spec.ts`
  - WorkoutService tests cover:
    - Data loading
    - CRUD operations
    - Search functionality
    - Filtering
    - LocalStorage integration

## 📱 Screenshots

### Light Mode
![image](https://github.com/user-attachments/assets/c9fe5c09-a4d2-4834-bc40-7e0d49791cd3)

### Dark Mode
![image](https://github.com/user-attachments/assets/97b80306-5892-4259-865d-8b8067547b84)

### List
![image](https://github.com/user-attachments/assets/c2570841-bbb3-4319-858a-24ac625b9e2e)

## 🔗 Connect with Me

- [LinkedIn](https://linkedin.com/in/shivamsingh57680/)
- [GitHub](https://github.com/shibbu04/)
- [Portfolio](https://shivam04.tech/)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Chart.js team for the charting library