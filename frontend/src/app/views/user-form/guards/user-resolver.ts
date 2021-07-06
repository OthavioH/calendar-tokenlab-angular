import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { UserFormService } from '../user-form.service';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<any> {
    constructor(private userFormService: UserFormService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
      return this.userFormService.getUserData();
    }
}