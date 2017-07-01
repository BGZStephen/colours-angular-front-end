import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { PalettesApiService } from "../../palettes-api.service"

@Component({
  selector: 'app-palettes-view',
  templateUrl: './palettes-view.component.html',
  styleUrls: ['./palettes-view.component.scss']
})
export class PalettesViewComponent implements OnInit {

  constructor(
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
      if(res.success == false) {
        this.userPalettes = [];
      } else {
        this.userPalettes = res;
      }
    })
  }

  setComponent(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': [component]}}]);
  }

  setPalette(component) {
    this.router.navigate(['/dashboard', {outlets: {'dashboardOutlet': ['palette', component]}}]);
  }

}
