import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mainfeed',
  templateUrl: './mainfeed.component.html',
  styleUrls: ['./mainfeed.component.scss']
})
export class MainfeedComponent implements OnInit {

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getAllFeeds();
  }

  getAllFeeds(){
    this.authService.getAllFeeds().subscribe((res) =>{
      console.log(res, 'THIS IS ALL FEEDS')
    })
  }

}
