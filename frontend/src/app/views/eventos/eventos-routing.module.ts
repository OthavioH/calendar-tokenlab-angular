import { EventoFormGuard } from './guards/evento-form.guard';
import { EventoFormResolver } from './guards/evento-form-resolver.guard';
import { EventosComponent } from './eventos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosFormComponent } from './eventos-form/eventos-form.component';

const eventosRoutes: Routes = [
  { path: 'eventos', children: [
    { path:'create', component: EventosFormComponent },
    { path:':id', component: EventosFormComponent, canActivate: [EventoFormGuard], resolve: {event: EventoFormResolver } },
    { path: '', component: EventosComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(eventosRoutes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
