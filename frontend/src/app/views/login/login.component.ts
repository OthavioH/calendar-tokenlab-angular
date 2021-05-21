import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLogin } from 'src/app/shared/models/UserLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserLogin = new UserLogin;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
    this.authService.loginUser(this.user);
  }

  applyCssError(input){
    return {
      'is-valid': input.valid && input.touched,
      'is-invalid': input.invalid && input.touched
    }
  }
}
