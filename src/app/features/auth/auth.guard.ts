// src/app/features/auth/auth.guard.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = false; // Default to not logged in

    if (isPlatformBrowser(this.platformId)) {
      // Access localStorage only in the browser
      isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    }

    if (isLoggedIn) {
      return true;
    } else {
      // Redirect to the login page
      return this.router.parseUrl('/login');
    }
  }
}
