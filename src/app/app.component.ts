import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { SwUpdate } from '@angular/service-worker';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;

  constructor(
      private authService: AuthService,
      private router: Router,
    //   private swUpdate: SwUpdate
      ) {
      this.authService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.authService.logout();
  }

  ngOnInit() {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0)
      });
  }

//   reloadSwUpdate(){
//     if (this.swUpdate.isEnabled) {

//         this.swUpdate.available.subscribe(() => {

//             if(confirm("New version of Service Worker is available. Load New Version?")) {
//                 window.location.reload();
//             }
//         });
//     }        
//   }

}