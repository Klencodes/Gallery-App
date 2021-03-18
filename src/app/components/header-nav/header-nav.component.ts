import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/index';

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
})
export class HeaderNavComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }
  ngOnInit(): void {
    this.authService.user.subscribe((user: User) =>{  
      // console.log(user) 
    })
  }

  logout(){
    this.authService.logout();
  }
}
