import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  user: User = {
    name: '',
    email: '',
    password: '',
  }
  cfrmPassword: string = '';
  errorExists: boolean = false;
  errorLabel: string = '';

  constructor(private authService: AuthService) { }

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
