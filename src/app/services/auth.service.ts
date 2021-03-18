import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router, private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user-data')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    let url = environment.BASE_URL + environment.LOGIN;
    return this.httpClient.post<any>(url, { email, password }, { withCredentials: true })
      .pipe(map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user-data', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    let url = environment.BASE_URL + environment.LOGOUT;
    this.httpClient.post<any>(url, {}, { withCredentials: true }).subscribe();
    // remove user from local storage and set current user to null
    localStorage.removeItem('user-data');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  signup(user: User) {
    let url = environment.BASE_URL + environment.SIGNUP;
    return this.httpClient.post(url, user);
  }

  getAllFeeds() {
    let url = environment.BASE_URL + environment.MAINFEEDS;
    return this.httpClient.get(url)
  }

}