
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { EventosModule } from './views/eventos/eventos.module';
import { LoginComponent } from './views/login/login.component';
import { UserResolver } from './views/user-form/guards/user-resolver';
import { UserFormComponent } from './views/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    EventosModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
