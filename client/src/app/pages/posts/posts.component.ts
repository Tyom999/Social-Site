import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostsService} from '../../shared/api/posts.service';
import {UsersService} from '../../shared/api/users.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/api/auth.service';
import {SocketService} from '../../shared/api/socket.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts;
  search;
  userToggle = false;
  users;
  userId;
  notifications = [];
  postId;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private authService: AuthService,
    private postsService: PostsService,
    private usersService: UsersService,
    private socketService: SocketService,
    private router: Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getPendingRequests();
    this.postsService.getAllPosts().subscribe(data => {
      this.posts = data;
    });
    this.socketService.addFriend$.subscribe(() => {});
    this.socketService.question$.subscribe(() => {
      this.getPendingRequests();
    });

  }


  open(content): void {
    this.modalService.open(content);
  }
  openComment(postId): void {
    this.router.navigate([`comment/${postId}`])
  }

  onSearch(): void {
    const obj = {
      nickname: this.search,
      user1Id: this.userId
    };
    this.usersService.getSearchedUsers(obj).subscribe(data => {
      this.userToggle = true;
      this.users = data.users;
    });

  }

  addFriend(id: any): void {
    const data = {
      user1Id: this.userId,
      user2Id: id
    };
    this.socketService.addFriend(data);
    this.users = this.users.filter(user => user.id != id);
  }

  myFriends(): void {
    this.router.navigate(['', 'myFriends']);
  }

  writeMsg(id: any): void {
    this.router.navigate([`chat/${id}`]);
  }

  getPendingRequests(): void {
    this.usersService.getPendingRequests({userId: this.userId}).subscribe((notifications) => {
        this.notifications = notifications.pendingRequest;
      });
  }
  answerQuestion(answer, friendId): void {
    this.usersService.answerFriendRequest({
      userId: this.userId,
      friendId,
      answer
    }).subscribe((data) => {
      this.notifications = this.notifications.filter(notification => notification.user1Id != friendId);
    });
  }
}
