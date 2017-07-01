import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FlashMessagesService } from "angular2-flash-messages"
import { ProfileApiService } from "../../profile-api.service"

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {

  constructor(
    private profileApiService: ProfileApiService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  clearComponent() {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': null}}]);
  }

  updatePassword(userObject) {
    if(userObject.currentPassword == userObject.newPassword) {
      this.flashMessage.show("Current and New Password cannot match", {cssClass: "flash-failure--dashboard", timeout: 3000})
    } else {
      this.profileApiService.updatePassword(userObject)
      .subscribe(res => {
        if(res.success) {
          this.flashMessage.show(res.message, {cssClass: "flash-success--dashboard", timeout: 3000})
          this.clearComponent()
        } else {
          this.flashMessage.show(res.message, {cssClass: "flash-failure--dashboard", timeout: 3000})
        }
      })
    }
  }

}
