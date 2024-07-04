// src\app\app.routes.ts
import { Routes } from '@angular/router';
import { LabOrdersComponent } from './features/dr-easy/components/lab-orders/lab-orders/lab-orders.component';
import { AppointmentComponent } from './features/dr-easy/components/appointment/appointment/appointment.component';
import { MaterialsComponent } from './features/dr-easy/components/materials/materials/materials.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { PatientsComponent } from './features/dr-easy/components/patients/patients/patients.component';
import { AuthGuard } from './features/auth/auth.guard';
import { ClinicProfileComponent } from './features/dr-easy/components/clinic-profile/clinic-profile/clinic-profile.component';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile'
  },
  {

    path: 'profile',
    component : ClinicProfileComponent
  },
  {
    path: 'patients',
    component: PatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lab-orders',
    component: LabOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'appointments',
    component: AppointmentComponent,
    canActivate: [AuthGuard] // Protect this route with AuthGuard
  },
  {
    path: 'materials',
    component: MaterialsComponent,
    canActivate: [AuthGuard] // Protect this route with AuthGuard
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
];
