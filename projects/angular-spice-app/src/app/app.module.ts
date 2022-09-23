import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DoughnutModule } from 'projects/spice/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DoughnutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
