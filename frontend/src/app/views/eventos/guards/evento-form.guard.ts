import { EventosService } from './../shared/services/eventos.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventoFormGuard implements CanActivate {

    constructor(private authService: AuthService, private eventosService: EventosService){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        
        

        return this.validateAccess(route);
    }

    async validateAccess(route){
        const id = route.params["id"];

        const loggerUserEmail = this.authService.getLoggedUserEmail();
        let eventRequested = await this.getEvent(id);
        
        if(loggerUserEmail === eventRequested.author){
            return true;
        }
        return false;
    }

    async getEvent(id: string) {
        
        return await this.eventosService.getEvent(id).then((data)=>{return data});
    }
}