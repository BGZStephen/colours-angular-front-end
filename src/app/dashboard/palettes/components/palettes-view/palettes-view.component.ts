import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { PalettesApiService } from "../../palettes-api.service"
import { FlashMessagesService } from "angular2-flash-messages"

@Component({
  selector: 'app-palettes-view',
  templateUrl: './palettes-view.component.html',
  styleUrls: ['./palettes-view.component.scss']
})
export class PalettesViewComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private palettesApiService: PalettesApiService
  ) { }

  ngOnInit() {
    this.loadUserPalettes()
  }

  userPalettes: Array<object>

  loadUserPalettes() {
    this.palettesApiService.getPalettesByUserId()
    .subscribe(res => {
      console.log(res)
      this.userPalettes = res
    },
    error => {
      console.log(error)
      this.flashMessage.show("Something went wrong loading palettes", {cssClass: "flash-success--dashboard", timeout: 3000})
    })
  }

  setComponent(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': [component]}}]);
  }

  setPalette(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': ['palette', component]}}]);
  }

}
