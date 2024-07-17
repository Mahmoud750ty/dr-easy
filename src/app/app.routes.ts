// src\app\app.routes.ts
import { Routes } from '@angular/router';
import { LabOrdersComponent } from './features/dr-easy/components/lab-orders/lab-orders/lab-orders.component';
import { AppointmentComponent } from './features/dr-easy/components/appointment/appointment/appointment.component';
import { MaterialsComponent } from './features/dr-easy/components/materials/materials/materials.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { PatientsComponent } from './features/dr-easy/components/patients/patients/patients.component';

import { ClinicProfileComponent } from './features/dr-easy/components/clinic-profile/clinic-profile/clinic-profile.component';
import { SidebarComponent } from './features/dr-easy/shared/sidebar/sidebar/sidebar.component';
export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
},
{
    path:'login',
    component:LoginComponent
},
{
    path: 'signup',
    component: SignupComponent,
  },
{
  path:'',
  component:SidebarComponent,
  children: [
      {
          path:'profile',
          component:ClinicProfileComponent
      },
      {
        path : 'patients',
        component : PatientsComponent
      },
      {
        path : 'materials',
        component : MaterialsComponent
      },
      {
        path : 'appointments',
        component : AppointmentComponent
      },
      {
        path : 'appointments',
        component : AppointmentComponent
      },
      {
        path: 'lab-orders',
        component: LabOrdersComponent,
      }




  ]
}
];
