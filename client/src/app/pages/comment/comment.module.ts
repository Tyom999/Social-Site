import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [CommentComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
    SharedModule
  ]
})
export class CommentModule { }
