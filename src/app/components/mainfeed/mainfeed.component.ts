import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MainfeedService } from 'src/app/services/mainfeed.service';

@Component({
  selector: 'app-mainfeed',
  templateUrl: './mainfeed.component.html',
  styleUrls: ['./mainfeed.component.scss']
})
export class MainfeedComponent implements OnInit {

  constructor(
    private feedServices: MainfeedService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getAllFeeds();
  }

  getAllFeeds(){
    this.authService.getAllFeeds().subscribe((res) =>{
      console.log(res)
    })
  }

}
