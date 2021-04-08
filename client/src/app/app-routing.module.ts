import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {AdminGuard} from "./shared/guards/admin.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: 'add-post',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/add-post/add-post.module').then(m => m.AddPostModule)
  },
  {
    path: 'chat/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'myFriends',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/my-friends/my-friends.module').then(m => m.MyFriendsModule)
  },
  {
    path: 'comment/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/comment/comment.module').then(m => m.CommentModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./pages/admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'block-page',
    loadChildren: () => import('./pages/block-page/block-page.module').then(m => m.BlockPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
