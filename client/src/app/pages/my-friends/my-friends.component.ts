import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/api/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../../shared/api/users.service';
import {IFriend} from "../../shared/models/friends.interface";

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss']
})
export class MyFriendsComponent implements OnInit {
  userId;
  friends = [];
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    const userData = {
      userId: this.userId
    };
    this.usersService.getFriends(userData).subscribe(data => {
      this.friends = data.friends;
    });
  }

  writeMsg(friend: IFriend): void {
    let id = friend.user1Id;
    if (friend.user1Id === this.userId) {
      id = friend.user2Id
    }
    this.router.navigate([`chat/${id}`]);
  }
}
