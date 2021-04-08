import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/api/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SocketService} from '../../shared/api/socket.service';
import {PostsService} from '../../shared/api/posts.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  senderId;
  userId;
  message;
  messages;
  msgId;
  rateArray = [
    {rating: 1},
    {rating: 2},
    {rating: 3},
    {rating: 4},
    {rating: 5}
  ];
  rating;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private socket: SocketService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.senderId = +params.id;
      const message = {
        user1Id: this.userId,
        user2Id: this.senderId,
        messages: this.message
      };
      this.getAllMessages();
      this.socket.getMsg$.subscribe(() => {
        this.getAllMessages();
      });
      this.socket.sendMessage$.subscribe(() => {
        this.socket.sendMessage(message);
      });
      this.socket.readMessage$.subscribe(() => {});
    });

  }

  sendMessage(): void {
    const message = {
      user1Id: this.userId,
      user2Id: this.senderId,
      message: this.message
    };
    if (this.message) {
      this.socket.sendMessage(message);
      this.message = '';
    }
  }

  getAllMessages(): void {
    const data = {
      fromId: this.userId,
      senderId: this.senderId
    };
    this.postsService.getAllMsg(data).subscribe((messages) => {
      this.messages = messages.userMessages;
      this.scrollToBottom();
    });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  readMessage() {
    // this.socket.readMessage$.subscribe(()=> {});
    // this.socket.readMessage({senderId: this.userId});
  }

  rateMsg(msg) {
    if (msg.id === this.msgId) {
      this.msgId = 0;
    } else {
      this.msgId = msg.id;
      this.postsService.getRatingById(msg.id).subscribe((data) => {
        this.rating = 0;
        if (data !== null) {
          this.rating = data.rate;
        }
      });
    }
  }

  setNewRate(rating: number) {
    this.postsService.setRate({chatId: this.msgId, rate:rating})
      .subscribe((data) => {
        if (data !== null) {
          this.rating = data.rate.rate;
        }
      })
  }
}
