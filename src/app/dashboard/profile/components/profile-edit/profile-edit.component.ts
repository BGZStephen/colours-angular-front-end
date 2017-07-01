import { Component, OnInit } from '@angular/core';
import { ProfileApiService } from "../../profile-api.service"
import { FlashMessagesService } from "angular2-flash-messages"
import { Router } from "@angular/router"

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  constructor(
    private profileApiService: ProfileApiService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUser()
  }

  user: object;

  loadUser() {
    this.profileApiService.getCurrentUser()
    .subscribe(res => {
      this.user = res
    })
  }

  setComponent(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': [component]}}]);
  }

  updateProfile(userObject) {
    this.profileApiService.updateProfile(userObject)
    .subscribe(res => {
      if(res.success) {
        this.flashMessage.show("Profile updated successfuly", {cssClass: "flash-success--dashboard", timeout: 3000})
        this.loadUser()
        this.setComponent('profile')
      } else {
        this.flashMessage.show("Failed to update profile", {cssClass: "flash-failure--dashboard", timeout: 3000})
      }
    })
  }
}
