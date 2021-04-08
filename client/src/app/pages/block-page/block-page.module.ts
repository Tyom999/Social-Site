import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockPageRoutingModule } from './block-page-routing.module';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlockPageRoutingModule,
    SharedModule
  ]
})
export class BlockPageModule { }
