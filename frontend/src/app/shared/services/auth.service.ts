import { map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '../models/User';
import { UserLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hideMenuEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router,) {}

  isUserAuthenticated(): boolean {
    
    return (localStorage.getItem('isUserAuth') != null);
  }

  loginUser(user: UserLogin){
    this.http.post(`${environment.apiURL}/user/sign_in`, user).pipe(map((response)=> response))
    .subscribe((dados)=>{
      if(dados['error']){
        console.log(localStorage.removeItem('isUserAuth'));
        localStorage.removeItem('email');
        this.hideMenuEmitter.emit(this.isUserAuthenticated());
      }
      else {
        localStorage.setItem('token',dados['token']);
        localStorage.setItem('email',dados['user'].email);
        if(!dados['user'].image) localStorage.setItem('userImage', 'default');
        else localStorage.setItem('userImage',dados['user'].image);
        localStorage.setItem('isUserAuth', 'true');
        this.hideMenuEmitter.emit(this.isUserAuthenticated());
        this.router.navigate(['/eventos']);
      }
    });
  }

  getToken() : string{
    
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('isUserAuth');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.setItem('userImage', 'default');
    
    
    this.hideMenuEmitter.emit(this.isUserAuthenticated());
    this.router.navigate(['/login']);
  }

  getLoggedUserEmail() {
    return localStorage.getItem('email');
  }

  registerUser(user: User){
    console.log(JSON.stringify(user));

    this.http.post(`${environment.apiURL}/user/register`, user).pipe(map((response)=> response))
      .subscribe((dados)=>{
        if(!dados['error']){
          
          localStorage.setItem('token',dados['token']);
          localStorage.setItem('email',dados['user'].email);
          localStorage.setItem('isUserAuth', 'true');
          this.hideMenuEmitter.emit(this.isUserAuthenticated());
          this.router.navigate(['/eventos']);
        }
      });
  }
}
