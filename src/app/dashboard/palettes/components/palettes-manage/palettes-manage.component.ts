import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { PalettesApiService } from "../../palettes-api.service"
import { FlashMessagesService } from "angular2-flash-messages"

@Component({
  selector: 'app-palettes-manage',
  templateUrl: './palettes-manage.component.html',
  styleUrls: ['./palettes-manage.component.scss']
})
export class PalettesManageComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private palettesApiService: PalettesApiService
  ) {}

  userPalettes: Array<object>;

  ngOnInit() {
    this.loadUserPalettes()
  }

  deletePalette(paletteId) {
    let paletteObject = {_id: paletteId}
    this.palettesApiService.deletePalette(paletteObject)
    .subscribe(res => {
      this.flashMessage.show("Palette deleted successfully", {cssClass: "flash-success--dashboard", timeout: 3000})
      this.loadUserPalettes()
    },
    error => {
      this.flashMessage.show("Palette deletion failed", {cssClass: "flash-failure--dashboard", timeout: 3000})
    })
  }

  setComponent(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': [component]}}]);
  }

  setPalette(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': ['palette-edit', component]}}]);
  }

  loadUserPalettes() {
    this.palettesApiService.getPalettesByUserId()
    .subscribe(res => {
      this.userPalettes = res;
    },
    error => {
      this.flashMessage.show("Error loading palettes", {cssClass: "flash-failure--dashboard", timeout: 3000})
    })
  }

}
