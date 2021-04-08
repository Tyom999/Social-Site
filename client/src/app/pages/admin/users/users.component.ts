import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../shared/api/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(data => {
      this.users = data.allUsers;
    });
  }

  onBlock(id, isBlocked, idx): void {
    const data = {
      userId: id,
      isBlocked: !isBlocked
    };
    this.usersService.userBlock(data).subscribe(dataa => {
      this.users[idx].isBlocked = !this.users[idx].isBlocked;
    });
  }
}
