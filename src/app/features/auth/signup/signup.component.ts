import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../../firebase.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule , RouterLink , CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  async signup() {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );

      console.log('User created:', userCredential.user);

      // Redirect to login or home page after successful signup
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Error creating user:');

      // Handle error

      this.errorMessage = 'Email or password is incorrect .';
    }
  }
}
