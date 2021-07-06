import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventsList: any;
  private event: any;

  static updateEvent = new EventEmitter<Object>();

  constructor(private http: HttpClient, private route: Router) {}

  getEvents() {
    const response = this.http.get(`${environment.apiURL}/events`, { headers: this.getHeaders() }).toPromise();
    
    this.eventsList = response;
    return this.eventsList;
  }

  getEvent(id: string) {
    const response = this.http.get(`${environment.apiURL}/events/event?id=${id}`, { headers: this.getHeaders() }).toPromise();
    
    this.event = response;
    
    return this.event;
    
  }

  createEvent(formValues: Object) {
    const response = this.http.post(`${environment.apiURL}/events/create`,formValues, { headers: this.getHeaders() }).toPromise();
    
    this.route.navigate['/eventos'];
    
  }

  updateEvent(formValues: Object, eventId: string, eventParticipants) {
    const response = this.http.put(`${environment.apiURL}/events/update?id=${eventId}`,{form: formValues, participants: eventParticipants}, { headers: this.getHeaders() }).toPromise();
  }

  async deleteEvent(id: string) {
    const response = this.http.delete(`${environment.apiURL}/events/delete?id=${id}`, { headers: this.getHeaders() }).toPromise();

    const updateEventsList = await this.getEvents();
    EventosService.updateEvent.emit(updateEventsList);
  }

  private getHeaders(): HttpHeaders{
    return new HttpHeaders().set('Authorization', localStorage.getItem("token"));
  }

  async getUsersList() {
    const response = this.http.get(`${environment.apiURL}/users`, { headers: this.getHeaders() }).toPromise();

    let usersList;

    usersList = await response.then((res)=>{
      
      return res['users'];
    });

    return usersList;
    
  }
}
