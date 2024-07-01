import { Component } from '@angular/core';
import { RouterLinkActive , RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  link: string;
  icon: string;
  text: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterLinkActive , RouterLink , CommonModule]
})
export class SidebarComponent {
  isSidebarOpen = false;

  navItems: NavItem[] = [
    {
      link: '/dashboard',
      icon: 'fas fa-home',
      text: 'Dashboard'
    },
    {
      link: '/patients',
      icon: 'fas fa-user-injured',
      text: 'Patients'
    }
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
