import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<User>(null);
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  login(email: string, password: string) {
      let url = environment.BASE_URL+environment.LOGIN;
      return this.http.post<any>(url, { email, password }, { withCredentials: true }, )
          .pipe(map(user => {
              this.userSubject.next(user);
              // this.startRefreshTokenTimer();
              return user;
          }));
  }

  logout() {
    let url = environment.BASE_URL+environment.LOGOUT;
    this.http.post<any>(url, {}, { withCredentials: true }).subscribe();
      this.userSubject.next(null);
      this.router.navigate(['/login']);
  }


  signup(user: User) {
    let url = environment.BASE_URL+environment.SIGNUP;
    return this.http.post(url, user);
  }

  getAllFeeds(){
    let url = environment.BASE_URL+environment.MAINFEEDS;
    return this.http.get(url, { withCredentials: true },)
    .pipe(map(res => {
      return res;
    })
    )}

}