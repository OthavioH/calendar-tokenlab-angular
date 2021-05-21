import { environment } from './../../../environments/environment';
import { User } from './../models/User';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
