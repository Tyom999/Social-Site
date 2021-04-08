import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from './auth.service';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public addFriend$ = new Subject();
  public question$ = new Subject();
  public sendMessage$ = new Subject();
  public readMessage$ = new Subject();
  public getMsg$ = new Subject();
  public userDisconnect$ = new Subject();
  public usersId ;
  public socket;
  constructor(private authService: AuthService) {
    this.socket = io('http://localhost:3000/');
    this.usersId = {
      userId: this.authService.getUserId(),
      friendId: ''
    };
    this.socket.on('sendMessage', ({userId}) => {
      this.sendMessage$.next(userId);
    });
    this.socket.on('readMessage', ({userId}) => {
      this.sendMessage$.next(userId);
    });
    this.socket.on('getMsg', () => {
      this.getMsg$.next();
    });
    this.socket.on('addFriend', () => {
      this.addFriend$.next();
    });
    this.socket.on('question', (data) => {
      this.question$.next();
      this.usersId = data;
    });
    this.socket.on('userDisconnect', ({userId}) => {
      this.userDisconnect$.next(userId);
    });
  }
  addFriend(data): void {
    this.socket.emit('addFriend', {...data});
  }
  question(data): void{
    this.socket.emit('question', {data});
  }
  sendMessage(message): void {
    this.socket.emit('sendMessage', {...message});
  }
  readMessage(data): void {
    this.socket.emit('readMessage', {...data});
  }
  userDisconnect(productId, users): any {
    this.socket.emit('userDisconnect', {productId, users});
  }
}
