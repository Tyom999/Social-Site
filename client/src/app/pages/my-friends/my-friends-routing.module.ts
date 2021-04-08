import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyFriendsComponent} from './my-friends.component';

const routes: Routes = [
  {path: '', component: MyFriendsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFriendsRoutingModule { }
