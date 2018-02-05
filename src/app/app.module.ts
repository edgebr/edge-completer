import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EdgeCompleterItemComponent } from './edge-completer/edge-completer-item/edge-completer-item.component';
import { EdgeCompleterListItemComponent } from './edge-completer/edge-completer-list-item/edge-completer-list-item.component';
import { EdgeCompleterModule } from './edge-completer/edge-completer.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EdgeCompleterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
