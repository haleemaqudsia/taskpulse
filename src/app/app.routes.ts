import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'tasks/new',
    loadComponent: () =>
      import('./features/tasks/task-form/task-form')
        .then(m => m.TaskForm),
    canActivate: [authGuard]
  },

  {
    path: 'projects/new',
    loadComponent: () =>
      import('./features/projects/project-form/project-form')
        .then(m => m.ProjectForm),
    canActivate: [authGuard]
  },

  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./features/projects/project-board/project-board')
        .then(m => m.ProjectBoard),
    canActivate: [authGuard]
  },

  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/project-list/project-list')
        .then(m => m.ProjectList),
    canActivate: [authGuard]
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: '/dashboard'
  }
];