import { AuthService } from './../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Event } from './../../shared/models/Event';
import { EventosService } from './shared/services/eventos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  subscribe: Subscription;
  eventUpdate: Subscription;
  isThereAnyEvent: boolean;
  eventsList: any;
  usersList: any;
  participantsList: any;
  loggedUserEmail = this.authService.getLoggedUserEmail();

  constructor(private activatedRoute: ActivatedRoute, private eventosService: EventosService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscribe = this.activatedRoute.data.subscribe((info: { events: Event[] })=>{
      this.eventsList = info.events;
      this.isThereAnyEvent = (this.eventsList.length > 0);
    });

    this.eventUpdate = EventosService.updateEvent.subscribe((events)=>{
      this.eventsList = events;
      this.isThereAnyEvent = (this.eventsList.length > 0);
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
    this.eventUpdate.unsubscribe();
  }

  deleteEvent(id: string) {
    this.eventosService.deleteEvent(id);
  }

  async loadUsersList(eventId: string) {
    for (const event of this.eventsList) {
      if(event._id == eventId) {
        this.participantsList = event.participants;
        console.log(this.participantsList);
      }
    }
    // this.usersList = await this.eventosService.getUsersList();
  }
}
