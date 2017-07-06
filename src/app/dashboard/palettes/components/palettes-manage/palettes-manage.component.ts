import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { PalettesApiService } from "../../palettes-api.service"

@Component({
  selector: 'app-palettes-manage',
  templateUrl: './palettes-manage.component.html',
  styleUrls: ['./palettes-manage.component.scss']
})
export class PalettesManageComponent implements OnInit {

  constructor(
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
      this.loadUserPalettes()
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
      if(res.success == false) {
        this.userPalettes = [];
      } else {
        this.userPalettes = res;
      }
    })
  }

}
