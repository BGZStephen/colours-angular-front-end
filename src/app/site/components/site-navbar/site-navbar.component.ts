import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.scss']
})
export class SiteNavbarComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
    this.resizeToggleNavbar() // set navbar visibility on page load, used to make sure it's hidden on small screen loads, and visible on large screen loads
  }


  ngOnInit() {
  }

  colours: Array<object> = [ // colours array to use for random hover effects
    {"background": "#00be9c", "color": "#1D1F25"},
    {"background": "#20ce6d", "color": "#1D1F25"},
    {"background": "#2c97df", "color": "#f5f5f5"},
    {"background": "#9c56b8", "color": "#f5f5f5"},
    {"background": "#ecf0f1", "color": "#1D1F25"},
    {"background": "#f3c500", "color": "#1D1F25"},
    {"background": "#e87e04", "color": "#f5f5f5"},
    {"background": "#ea4b36", "color": "#f5f5f5"}
  ]

  navbarVisibility: boolean = false; // used to set visibility of the navbar, toggled with menu-toggle
  activeHover: number = -1 // used to check with LI is being hovered, if none, revert to -1

  // styling functions

  //hover styling

  applyHoverStyle(index) {
    if(index == this.activeHover) {
      let max = Math.floor(this.colours.length);
      let randomStyle = Math.floor(Math.random() * max)
      return this.colours[randomStyle]
    }
  }

  setHoverStyle(index) { // triggered on both mouse over and mouse out events to toggle application of applyHoverStyle
    if(index == this.activeHover) {
      this.activeHover = -1
    } else {
      this.activeHover = index
    }
  }

  // hover styling end

  // navbar visibility

  resizeToggleNavbar() { // function to check screen size, called on window resize
    if(screen.width > 1024) {
      this.navbarVisibility = true;
    } else {
      this.navbarVisibility = false;
    }
  }

  setNavbarVisibility() {  // set main navbar visibility, used to toggle slide effect on smaller screens
    if(this.navbarVisibility == true) {
      return {"left": "0"}
    } else {
      return {"left": "-100%"}
    }
  }

  setActionBarVisibility() { // used to set styles for Login / Register which sit seperate to the main navbar in smaller views
    if(this.navbarVisibility == true) {
      return {"right": "0%"}
    } else {
      return {"right": "-100%"}
    }
  }

  // navbar visibility end

  // component navigation

  setComponent(component) {
    if(screen.width < 1024) { // used to toggle menu visibility on small screens
      this.navbarVisibility = false
    }
    this.router.navigate(['/home', {outlets: {'siteOutlet': [component]}}]);
  }

  // component navigation end

}
