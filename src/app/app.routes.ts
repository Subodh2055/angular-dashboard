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
    path: '**',
    redirectTo: '/users'
  }
];
