import { EventosService } from './../shared/services/eventos.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventosResolver implements Resolve<Event[]>{

  constructor(private eventsService: EventosService) { }


  resolve(route: ActivatedRouteSnapshot): Observable<Event[]> | Promise<Event[]> | Event []{
    
    return this.eventsService.getEvents()
  }
}
