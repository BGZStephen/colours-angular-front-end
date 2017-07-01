import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { router } from "../../app.routes"
import { FlashMessagesModule } from "angular2-flash-messages"

// sevices
import { ProfileApiService } from "./profile-api.service"

// profile components
import { ProfileViewComponent, ProfileEditComponent, ProfileChangePasswordComponent } from './components/profile-components-barrel';


@NgModule({
  declarations: [
    ProfileViewComponent, ProfileEditComponent, ProfileChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    FlashMessagesModule,
  ],
  exports: [
    ProfileViewComponent, ProfileEditComponent, ProfileChangePasswordComponent,
  ],
  providers: [ProfileApiService]
})
export class ProfileModule { }
