import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mainfeed',
  templateUrl: './mainfeed.component.html',
  styleUrls: ['./mainfeed.component.scss']
})
export class MainfeedComponent implements OnInit {
  images: Image[];

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getAllFeeds();
  }

  getAllFeeds(){
    this.authService.getAllFeeds().subscribe((res: any) =>{
      this.images = res.results
      console.log(this.images, 'THIS IS ALL FEEDS')
    })
  }

}
