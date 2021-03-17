import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mainfeed',
  templateUrl: './mainfeed.component.html',
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
    })
  }

}
