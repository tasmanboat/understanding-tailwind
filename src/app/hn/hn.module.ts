import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HnRoutingModule } from './hn-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { HitComponent } from './components/hit/hit.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchComponent,
    HomeComponent,
    HitComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HnRoutingModule,
  ]
})
export class HnModule { }
