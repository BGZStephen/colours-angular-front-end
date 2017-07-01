import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from "../../dashboard-api.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  constructor(
    private dashboardApiService: DashboardApiService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  colours: Array<string> = ["#00be9c", "#20ce6d", "#2c97df", "#9c56b8", "#f3c500", "#e87e04"]
  menuVisibility: boolean = false;
  activeSubMenu: number = -1;

  //  style functions

  setActiveSubMenu(index) {
    if(index == this.activeSubMenu) {
      this.activeSubMenu = -1
    } else {
      this.activeSubMenu = index
    }
  }

  setHoverStyle(index) {
    return {"background": this.colours[index], "color": "#1D1F25"}
  }

  setMenuStyle() {
    if(this.menuVisibility == true) {
      return {"max-height": "100vh"}
    } else {
      return {"max-height": "0"}
    }
  }

  setSubMenuStyle(index) {
    if(index == this.activeSubMenu) {
      let subMenuLength = document.getElementsByClassName("second-level-list")[index].children.length
      let subMenuHeight = (45 * subMenuLength) + "px"
      return {"max-height": subMenuHeight}
    } else {
      return {"max-height": "0"}
    }
  }

  // component navigation functions

  clearComponent() {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': null}}]);
  }

  setComponent(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': [component]}}]);
  }

  // geneeral functions

  logout() {
    this.dashboardApiService.logout()
    this.router.navigate(['/'])
  }
}
