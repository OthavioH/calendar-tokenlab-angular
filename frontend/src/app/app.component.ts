import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  hideMenu: boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.hideMenu = this.authService.isUserAuthenticated();
    this.authService.hideMenuEmitter.subscribe(
      isAllowedToShowMenu => {        
        this.hideMenu = isAllowedToShowMenu;
      }
    );
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
