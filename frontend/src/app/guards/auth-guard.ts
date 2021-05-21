import { AuthService } from './../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    

    return this.verifyAccess();
  }

  verifyAccess(): boolean{
    if(this.authService.isUserAuthenticated() == true){
      
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }


  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    
    return this.verifyAccess();
  }
}
