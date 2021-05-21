import { Event } from './../../../shared/models/Event';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EventosService } from '../shared/services/eventos.service';

@Injectable({ providedIn: 'root' })
export class EventoFormResolver implements Resolve<Event> {

    constructor(private eventosService: EventosService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Event> | Promise<Event> | Event {
        const id = route.params["id"];
        
        return this.eventosService.getEvent(id);
    }
}