import { Component, OnChanges, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string = 'frontend';
  imageLink: string = '../assets/person-icon.png';
  hideMenu: boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.hideMenu = this.authService.isUserAuthenticated();
    this.authService.hideMenuEmitter.subscribe(
      isAllowedToShowMenu => {        
        this.hideMenu = isAllowedToShowMenu;
        this.changeImage();
      }
    );
  }


  changeImage() {
    const userImage = localStorage.getItem("userImage");
    if(userImage !== 'default') {
      this.imageLink = userImage;
    }
    else {
      this.imageLink = '../assets/person-icon.png';
    }
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
