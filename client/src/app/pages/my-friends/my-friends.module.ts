import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFriendsRoutingModule } from './my-friends-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyFriendsRoutingModule,
    SharedModule
  ]
})
export class MyFriendsModule { }
