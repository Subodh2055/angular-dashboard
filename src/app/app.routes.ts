import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserListComponent,
    title: 'Users - Dashboard'
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    title: 'User Details - Dashboard'
  },
  {
    path: 'showcase',
    loadComponent: () => import('./components/style-showcase/style-showcase.component').then(m => m.StyleShowcaseComponent),
    title: 'Design System - NexBodh'
  },
  {
    path: '**',
    redirectTo: '/users'
  }
];
