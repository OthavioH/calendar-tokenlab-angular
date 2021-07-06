import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth-guard';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { EventosResolver } from './views/eventos/guards/eventos-resolver.guard';
import { LoginGuard } from './views/login/guards/login-guard';
import { LoginComponent } from './views/login/login.component';
import { UserResolver } from './views/user-form/guards/user-resolver';
import { UserFormComponent } from './views/user-form/user-form.component';

const routes: Routes = [
  { path: 'eventos', component: EventosComponent, canActivate:[AuthGuard], canLoad: [AuthGuard], loadChildren: ()=>import('./views/eventos/eventos.module').then(m=>m.EventosModule), resolve: {events: EventosResolver} }, 
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'myuser', component: UserFormComponent, canActivate: [AuthGuard], resolve: {userData: UserResolver}},
  { path: 'cadastro', component: CadastroComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
