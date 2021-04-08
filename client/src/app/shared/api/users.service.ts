import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }


  getSearchedUsers(nickname): Observable<any> {
    return this.http.post<any>('users/getSearchedUsers', nickname);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>('users/getAllUsers');
  }
  userBlock(data): Observable<any> {
    return this.http.put('users/userBlock', data);
  }
  getFriends(data): Observable<any> {
    return this.http.post('users/getFriends', data);
  }
  getPendingRequests(data): Observable<any> {
    return this.http.post('users/getPendingRequests', data);
  }
  answerFriendRequest(data): Observable<any> {
    return this.http.post('users/answerFriendRequest', data);
  }

}
