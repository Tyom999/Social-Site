import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/api/auth.service";
import {PostsService} from "../../shared/api/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  title = '';
  description = '';

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router
              ) { }

  ngOnInit(): void {
  }


  addPost(): void {
  if (this.description && this.title) {
    this.authService.isLogin();
    const data = {
      title: this.title,
      description: this.description,
      userId: this.authService.getUserId(),
      nickname: this.authService.getNickname()
    };
    this.postsService.addPost(data).subscribe(() => {
        this.title = '';
        this.description = '';
        this.router.navigate(['', 'posts']);
    }
    );
  }
  }
}
