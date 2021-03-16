import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
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
    })
  }

  logout(){
    this.authService.logout();
  }
}
