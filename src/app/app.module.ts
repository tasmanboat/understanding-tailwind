import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
// import { HnModule } from './hn/hn.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
    CoreModule,
    // HnModule, // lazy load
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
