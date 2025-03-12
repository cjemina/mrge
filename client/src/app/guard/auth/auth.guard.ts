import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if auth_token exists in localStorage
    const token = localStorage.getItem('auth_token');

    // If token exists, redirect to the tasks page
    if (token) {
      this.router.navigate(['/jobs']);
      return false; // Prevent access to the login or register page
    }

    // Allow access to the login and register pages if token is not present
    return true;
  }
}
