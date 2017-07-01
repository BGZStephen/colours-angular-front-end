import { Component, OnInit } from '@angular/core';
import { ProfileApiService } from "../../profile-api.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  constructor(
    private profileApiService: ProfileApiService,
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

}
