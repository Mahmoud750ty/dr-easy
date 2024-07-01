import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {

}
