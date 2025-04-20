import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  // Form submission handler
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page if validation fails
    } else {
      this.doLogin(); // Proceed to login if all fields are provided
    }
  }

  // Login processing
  private doLogin(): void {
    let newUser = { 
      name: this.credentials.name, 
      email: this.credentials.email 
    } as User;

    // Call login method from AuthenticationService and handle the result
    this.authenticationService.login(newUser, this.credentials.password);

    if (this.authenticationService.isLoggedIn()) {
      // If the user is logged in, navigate to the home page
      this.router.navigate(['']);
    } else {
      // If login failed, wait for a short period and check again
      var timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          // If still logged in after delay, navigate to the home page
          this.router.navigate(['']);
        }
      }, 3000); // 3 seconds delay to handle asynchronous operation
    }
  }
}
