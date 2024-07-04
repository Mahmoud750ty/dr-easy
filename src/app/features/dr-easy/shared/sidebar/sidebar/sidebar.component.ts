import { Component } from '@angular/core';
import {
  faClinicMedical,
  faUserFriends,
  faCalendarCheck,
  faToolbox,
  faTruck,
  faArrowsToCircle,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

interface NavItem {
  link: string;
  icon: any;
  text: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    FontAwesomeModule,
  ],
})
export class SidebarComponent {
  isSidebarCollapsed = false;

  // Declare the icons as component properties
  faArrowsToCircle = faArrowsToCircle;
  faRightFromBracket = faRightFromBracket;

  navItems: NavItem[] = [
    { link: '/profile', icon: faClinicMedical, text: 'CLINIC PROFILE' },
    { link: '/patients', icon: faUserFriends, text: 'PATIENTS' },
    { link: '/appointments', icon: faCalendarCheck, text: 'APPOINTMENTS' },
    { link: '/lab-orders', icon: faTruck, text: 'LAB ORDERS' },
    { link: '/materials', icon: faToolbox, text: 'MATERIALS' },
  ];

  constructor(private router: Router){}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  signOut() {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userLoggedIn');
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
