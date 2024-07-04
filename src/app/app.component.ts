// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './features/dr-easy/shared/sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dr-easy';
  showSidebar: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSidebarVisibility(event.url);
      }
    });
  }

  updateSidebarVisibility(url: string): void {
    const routesWithSidebar = ['/profile','/patients', '/appointments' ,'/lab-orders' , '/materials', ];
    this.showSidebar = routesWithSidebar.some(route => url.includes(route));
  }
}
