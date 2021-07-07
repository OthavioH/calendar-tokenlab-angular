import { UserLogin } from 'src/app/shared/models/UserLogin';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: UserLogin = new UserLogin;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm){
    this.authService.loginUser(this.user);
  }

  applyCssError(input){
    return {
      'is-valid': input.valid && input.touched,
      'is-invalid': input.invalid && input.touched
    }
  }
}
