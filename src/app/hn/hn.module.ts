import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HnRoutingModule } from './hn-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    HnRoutingModule,
  ]
})
export class HnModule { }
