import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlockPageComponent} from './block-page.component';

const routes: Routes = [
  {path: '', component: BlockPageComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockPageRoutingModule { }
