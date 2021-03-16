import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MainfeedService {
  FEEDS_ENDPOINT = environment.BASE_URL+environment.MAINFEEDS

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllFeeds(){
    return this.httpClient.get(this.FEEDS_ENDPOINT)
  }
  
}
