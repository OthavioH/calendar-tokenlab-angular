import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.verifyAccess();
    }

    verifyAccess(): boolean {
      if(this.authService.isUserAuthenticated() === false){
        console.log('verificando acesso');
        
        return true;
      }
      
      this.router.navigate(['/eventos']);
      return false;
    }
}