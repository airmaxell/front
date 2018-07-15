import { Routes } from '@angular/router';

import { LoginRoutes } from './login/login.routes';
//import { SignupRoutes } from './signup/signup.routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  ...LoginRoutes,
  ...DashboardRoutes,
  { path: '**', component: LoginComponent }
];
