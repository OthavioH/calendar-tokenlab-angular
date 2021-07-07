import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Event } from '../../../shared/models/Event';
import { EventosService } from '../shared/services/eventos.service';

@Component({
  selector: 'app-eventos-form',
  templateUrl: './eventos-form.component.html',
  styleUrls: ['./eventos-form.component.scss']
})
export class EventosFormComponent implements OnInit, OnDestroy {

  subscribe: Subscription;
  event: any;
  title:string;
  currentDate: string;
  day: number;
  month: number;
  year: number;

  startTime: string;
  endTime: string;

  errorLabel: string;

  hideAlert: boolean = true;

  newParticipant: string = "    ";

  formCategory = '';

  constructor(private activatedRoute: ActivatedRoute, private eventosService: EventosService, private router: Router) { }

  ngOnInit(): void {

    let date = new Date();
    
    this.day = date.getDate();
    this.month = date.getMonth()+1;
    this.year = date.getFullYear();

    this.currentDate = `${this.year}-0${this.month}-${this.day}`;

    this.subscribe = this.activatedRoute.data.subscribe((info: {event: Event})=>{
      
      this.event = info.event;

      if(this.event == null){
        this.event = {};
        this.title = 'Cadastro de evento';
        this.formCategory = 'new';
      }
      else {
        this.title = this.event.name;
        this.formCategory = 'edit';
        this.startTime = this.event.startTime;
        this.endTime = this.event.endTime;
      }
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getCurrentTime(){

    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let currentTime;
    if(minutes < 10) {
      currentTime = `${hours}:0${minutes}`;
    }
    else {
      currentTime = `${hours}:${minutes}`;
    }
    return currentTime;
  }

  validateForm(form: NgForm) {

    if(form.value.endDate === form.value.startDate){
      if(this.endTime <= this.startTime){
        this.errorLabel = 'A hora de término é menor que a hora inicial';
        this.hideAlert = false;
        return form.invalid;
      }
    }

    if(form.value.startDate === this.currentDate){
      if(this.startTime < this.getCurrentTime()){
        this.errorLabel = 'A hora inicial é menor que a hora atual';
        this.hideAlert = false;
        return form.invalid;
      }
    }

    this.errorLabel = '';
    this.hideAlert = true;
    this.submitForm(form);
  }

  submitForm(form: NgForm) {
    if(this.formCategory == 'new') {
      this.eventosService.createEvent(form.value);
    }
    if(this.formCategory == 'edit') {
      this.eventosService.updateEvent(form.value, this.event._id, this.event.participants);
    }
    setTimeout(()=>this.router.navigate(['/eventos']),500);
  }

  addNewParticipant(participantEmail: string) {
    if(this.event.participants != null){
      this.event.participants.push({ email: participantEmail })
    }
    else {
      this.event.participants = [{ email: participantEmail }]
    }
  }
}
