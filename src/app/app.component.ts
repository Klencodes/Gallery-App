import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
// import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  appTitle: string = ' | Pentium Tech'
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private titleService: Title,
    // private swUpdate: SwUpdate
  ) {}
  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.getChild(this.route);
        childRoute.data.subscribe((data) => {
          this.titleService.setTitle(data.title + this.appTitle );
        });
      });
  }
  getChild(route: ActivatedRoute) {
    if (route.firstChild) {
      return this.getChild(route.firstChild);
    } else {
      return route;
    }
  }

  logout() {
    this.authService.logout();
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