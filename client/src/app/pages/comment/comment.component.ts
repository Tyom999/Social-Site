import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/api/posts.service";
import {AuthService} from "../../shared/api/auth.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, AfterViewChecked {
  postId;
  commentId;
  newComment = '';
  newReplyComment = '';
  comments = [];
  replies = [];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.postId = params.id;
      this.getComments();
    });
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  getComments() {
    this.postsService.getComments(this.postId).subscribe((comments) => {
      this.comments = comments;
    })
  }

  addComment() {
    this.postsService.addComment({postId: this.postId, nickname: this.authService.getNickname(), comment: this.newComment})
      .subscribe((data) => {
        this.newComment = '';
        this.getComments();
      });
  }

  reply(content, commentId) {
    this.commentId = commentId;
    this.getReplies();
    this.modalService.open(content);
  }

  addReplyComment() {
    this.postsService.addReply({commentId: this.commentId, nickname: this.authService.getNickname(), reply: this.newReplyComment})
      .subscribe((data) => {
        this.newReplyComment = '';
        this.getReplies();
      });
  }
  getReplies() {
    this.postsService.getReplies(this.commentId).subscribe((replies) => {
      this.replies = replies;
    })
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
