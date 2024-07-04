import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../../firebase.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage: any = '';

  constructor(private router: Router) {}

  async login() {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );

      const user = userCredential.user;

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email
      }));

      // Set userLogin to true
      localStorage.setItem('userLoggedIn', 'true');

      // Redirect to home page after successful login
      this.router.navigate(['/profile']);

    } catch (error: any) {
      console.error('Error logging in:', error.message);
      this.errorMessage = error.message;
    }
  }
}
