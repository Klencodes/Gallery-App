import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
})
export class HeaderNavComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private toast: ToastrService
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
    this.toast.success('You have been successfully logged out', 'Request Successful')
  }
}
