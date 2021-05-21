import { AuthService } from './../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { EventosService } from './shared/services/eventos.service';
import { FormsModule } from '@angular/forms';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { EventosComponent } from './eventos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosRoutingModule } from './eventos-routing.module';



@NgModule({
  declarations: [
    EventosComponent,
    EventosFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EventosRoutingModule,
  ],
  exports: [
    EventosComponent,
    EventosFormComponent,
  ],
  providers: [AuthService, CookieService, EventosService]
})
export class EventosModule { }
