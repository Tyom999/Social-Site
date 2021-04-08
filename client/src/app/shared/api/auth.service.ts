import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IUsers} from "../models/users";
import {tap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  private isAdmin = false;
  private isBlocked = false;
  private userId;
  private nickname = '';
  constructor(private http: HttpClient) { }

  login(data): Observable<IUsers> {
    return this.http.post<IUsers>('auth/login', data)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token', token);
          // this.token = token
          this.isLogin();
        })
      );
  }
  register(data): Observable<IUsers> {
    return this.http.post<IUsers>('auth/register', data);
  }
  getUserId(): string {
    return this.userId;
  }
  getToken(): string {
    return this.token;
  }
  getIsAdmin(): boolean {
    return !!this.isAdmin;
  }
  getIsBlocked(): boolean {
    return !!this.isBlocked;
  }
  getNickname(): string {
    return this.nickname;
  }
  isLogin(): string {
    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(this.token);
    if (decodedToken) {
      this.userId = decodedToken.id;
      this.isAdmin = decodedToken.isAdmin;
      this.isBlocked = decodedToken.isBlocked;
      this.nickname = decodedToken.nickname;
    }
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.clear();
  }
}
