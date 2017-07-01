import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { router } from "../../app.routes"
import { FlashMessagesModule } from "angular2-flash-messages"

// sevices
import { ColourLibraryApiService } from "./colour-library-api.service"

// components

// dashboard specific
import { ColourLibraryViewComponent } from './components/colour-library-components-barrel';


@NgModule({
  declarations: [ColourLibraryViewComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    FlashMessagesModule,
  ],
  exports: [],
  providers: [ColourLibraryApiService]
})
export class ColourLibraryModule { }
