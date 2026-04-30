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
    path: 'showcase/tailwind',
    loadComponent: () => import('./components/showcase-frameworks/tailwind-showcase.component').then(m => m.TailwindShowcaseComponent),
    title: 'Tailwind CSS - Showcase'
  },
  {
    path: 'showcase/material',
    loadComponent: () => import('./components/showcase-frameworks/material-showcase.component').then(m => m.MaterialShowcaseComponent),
    title: 'Angular Material - Showcase'
  },
  {
    path: 'showcase/zardui',
    loadComponent: () => import('./components/showcase-frameworks/zard-ui-showcase.component').then(m => m.ZardUIShowcaseComponent),
    title: 'ZardUI - Showcase'
  },
  {
    path: 'showcase/icons',
    loadComponent: () => import('./components/showcase-frameworks/icons-showcase.component').then(m => m.IconsShowcaseComponent),
    title: 'Icons - Showcase'
  },
  {
    path: 'showcase/forms',
    loadComponent: () => import('./components/showcase-frameworks/forms-showcase.component').then(m => m.FormsShowcaseComponent),
    title: 'Forms - Showcase'
  },
  {
    path: '**',
    redirectTo: '/users'
  }
];
