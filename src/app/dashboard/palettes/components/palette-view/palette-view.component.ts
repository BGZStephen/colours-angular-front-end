import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { FlashMessagesService } from "angular2-flash-messages"
import { PalettesApiService } from "../../palettes-api.service"
import "rxjs/Rx"

@Component({
  selector: 'app-palette-view',
  templateUrl: './palette-view.component.html',
  styleUrls: ['./palette-view.component.scss']
})
export class PaletteViewComponent implements OnInit {

  constructor(
    private palettesApiService: PalettesApiService,
    private flashMessage: FlashMessagesService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadPalette()
    this.convertRgbToHex()
  }

  hexConversion: string = "FFFFFF";
  rgbConversion: any = { "red": "051", "green": "102", "blue": "153"}
  palette: object;

  addPaletteItem(paletteObject) {
    this.palettesApiService.addPaletteItem(paletteObject)
    .subscribe(res => {
      if(res.success) {
        this.flashMessage.show("Palette item added", {cssClass: "flash-success--dashboard", timeout: 3000})
        this.loadPalette()
      } else {
        this.flashMessage.show("Palette item addition failed", {cssClass: "flash-failure--dashboard", timeout: 3000})
      }
    })
  }

  convertRgbToHex() {
    let redValue = parseInt(this.rgbConversion.red, 10).toString(16)
    if(redValue.length < 2) {
      redValue = "0" + redValue
    }
    let greenValue = parseInt(this.rgbConversion.green, 10).toString(16)
    if(greenValue.length < 2) {
      greenValue = "0" + greenValue
    }
    let blueValue = parseInt(this.rgbConversion.blue, 10).toString(16)
    if(blueValue.length < 2) {
      blueValue = "0" + blueValue
    }
    let hexConstructor = redValue + greenValue + blueValue
    this.hexConversion = hexConstructor
  }

  convertHexToRgb(hexValue) {
    if(hexValue.length == 6) {
      let redHex = parseInt(hexValue.substr(0, 2), 16)
      this.rgbConversion.red = redHex
      let greenHex = parseInt(hexValue.substr(2, 2), 16)
      this.rgbConversion.green = greenHex
      let blueHex = parseInt(hexValue.substr(4, 2), 16)
      this.rgbConversion.blue = blueHex

    }
  }

  deletePaletteItem(paletteObject) {
    this.palettesApiService.deletePaletteItem(paletteObject)
    .subscribe(res => {
      if(res.success) {
        this.flashMessage.show("Palette item deleted", {cssClass: "flash-success--dashboard", timeout: 3000})
        this.loadPalette()
      } else {
        this.flashMessage.show("Palette item deletion failed", {cssClass: "flash-failure--dashboard", timeout: 3000})
      }
    })
  }

  loadPalette() {
    this.activatedRoute.params
    .map(params => params['paletteId'])
    .subscribe((paletteId) => {
      let paletteObject = {_id: paletteId}
      this.palettesApiService.getPaletteById(paletteObject)
      .subscribe(res => {
        this.palette = res
      })
    })
  }

  setRgbColor(color, value) {
    if(color == "red") {
      this.rgbConversion.red = value
    } else if (color == "green") {
      this.rgbConversion.green = value
    } else if (color == "blue") {
      this.rgbConversion.blue = value
    }
  }

}
