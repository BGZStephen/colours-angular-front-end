import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { router } from "../app.routes"
import { FlashMessagesModule } from "angular2-flash-messages"

// sevices
import { SiteApiService } from "./site-api.service"

// views
import { SiteViewComponent} from './site-view.component';

//components

// site specific
import { SiteNavbarComponent, SiteIntroComponent, SiteRegisterComponent, SiteLoginComponent} from './components/site-components-barrel'


@NgModule({
  declarations: [
    SiteViewComponent,
    SiteNavbarComponent,
    SiteIntroComponent,
    SiteRegisterComponent,
    SiteLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    FlashMessagesModule
  ],
  exports: [
    SiteViewComponent,
    SiteNavbarComponent,
    SiteIntroComponent,
    SiteRegisterComponent,
    SiteLoginComponent
  ],
  providers: [SiteApiService],
})
export class SiteModule { }
