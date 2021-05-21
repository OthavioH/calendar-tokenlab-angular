import { User } from './../../shared/models/User';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: '',
  }
  cfrmPassword: String = '';
  errorExists: boolean = false;
  errorLabel: String = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.authService.registerUser(this.user);
    }
  }

  applyCssError(input){
    return {
      'is-valid': input.valid && input.touched,
      'is-invalid': input.invalid && input.touched
    }
  }
}
