import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentComponent} from "./comment.component";

const routes: Routes = [
  {path: '', component: CommentComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
