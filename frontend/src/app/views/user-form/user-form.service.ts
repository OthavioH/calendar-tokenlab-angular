import { User } from 'src/app/shared/models/User';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  userData:any;

  constructor(private http: HttpClient) { }

  async getUserData() {
    const response = await this.http.get(`${environment.apiURL}/user/info`, { headers: this.getHeaders() }).toPromise();
    return this.userData = response;
  }

  async editUser(name:string, image:File) {
    const fd = new FormData();
    fd.append('image', image);
    fd.append('name', name);
    const response = await this.http.put(`${environment.apiURL}/user/edit`,fd, { headers: this.getHeaders() }).toPromise();
    return this.userData = response;
  }

  private getHeaders(): HttpHeaders{
    return new HttpHeaders().set('Authorization', localStorage.getItem("token"));
  }
}
