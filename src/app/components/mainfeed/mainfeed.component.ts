import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/feed';
import { AuthService } from 'src/app/services/index';

@Component({
  selector: 'app-mainfeed',
  templateUrl: './mainfeed.component.html',
})
export class MainfeedComponent implements OnInit {
  feeds: Feed[];

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getAllFeeds();
  }

  getAllFeeds(){
    this.authService.getAllFeeds().subscribe((res: any) =>{
      this.feeds = res.results;
      // console.log(this.images)
    })
  }

}
