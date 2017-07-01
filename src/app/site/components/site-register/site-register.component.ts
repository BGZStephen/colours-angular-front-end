import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages"
import { SiteApiService } from "../../site-api.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-site-register',
  templateUrl: './site-register.component.html',
  styleUrls: ['./site-register.component.scss']
})
export class SiteRegisterComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private siteApiService: SiteApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.generateInputStyles() // generate styles for both inputs and buttonss to give random color effect
    this.generateButtonStyles()
  }

  // colours array to use for random hover effects
  colours: Array<string> = ["#00be9c", "#20ce6d", "#2c97df", "#9c56b8", "#ecf0f1", "#f3c500", "#e87e04", "#ea4b36"]
  buttonStyles: Array<object> = []
  inputStyles: Array<object> = []

  // set styling start

  generateButtonStyles() {
    let buttonCount = document.getElementsByClassName("form-button") // get total number of form inputs
    for(let i = 0; i < buttonCount.length; i++) {
      let max = Math.floor(this.colours.length);
      let randomStyle = Math.floor(Math.random() * max)
      this.buttonStyles.push({"color": this.colours[randomStyle], "border": "4px solid" + this.colours[randomStyle]})
    }
  }

  generateInputStyles() {
    let inputCount = document.getElementsByClassName("form-input") // get total number of form inputs
    for(let i = 0; i < inputCount.length; i++) {
      let max = Math.floor(this.colours.length);
      let randomStyle = Math.floor(Math.random() * max)
      this.inputStyles.push({"color": this.colours[randomStyle]})
    }
  }

  applyInputStyle(index) {
    return this.inputStyles[index]
  }

  applyButtonStyle(index) {
    return this.buttonStyles[index]
  }

  // set styling end

  // user registation / validation

  registerUser(userObject) {
    if(this.validate(userObject)) {
      this.siteApiService.registerUser(userObject)
      .subscribe(res => {
        if(res.success) {
          this.flashMessage.show("Regisrtation successful", {cssClass: "flash-success", timeout: 2000})
          setTimeout(()=>{ // redirect after flash message to show registration successful
            this.setComponent('login')
          },2500);
        } else {
          this.flashMessage.show(res.message, {cssClass: "flash-failure", timeout: 2000})
        }
      })
    }
  }

  validate(userObject) {
    if(this.validateInput("First Name", userObject.firstName) && this.validateInput("Last Name", userObject.lastName) && this.validateEmail(userObject.email) && this.validateInput("Username", userObject.username) && this.validatePassword(userObject.password)) {
      return true
    } else {
      return false
    }
  }

  validateInput(userObjectItemName, userObjectItem) {
    if(userObjectItem.length >= 3) {
      return true
    } else {
      this.flashMessage.show(userObjectItemName + " does not meet minimum length (3)", {cssClass: "flash-failure", timeout: 2000})
    }
  }

  validateEmail(userObjectEmail) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailRegex.test(userObjectEmail)) {
      return true
    } else {
      this.flashMessage.show("Incorrect email format", {cssClass: "flash-failure", timeout: 2000})
    }
  }

  validatePassword(userObjectPassword) {
    if(userObjectPassword.length > 6) {
      return true
    } else {
      this.flashMessage.show("Password must be longer than 6 characters", {cssClass: "flash-failure", timeout: 3000})
    }
  }

  // user registation / validation end

  setComponent(component) {
    this.router.navigate(['/home', {outlets: {'siteOutlet': [component]}}]);
  }
}
