import { Component, OnInit } from '@angular/core';
import { ColourLibraryApiService } from "../../colour-library-api.service"
import { FlashMessagesService} from "angular2-flash-messages"

@Component({
  selector: 'app-colour-library-view',
  templateUrl: './colour-library-view.component.html',
  styleUrls: ['./colour-library-view.component.scss']
})
export class ColourLibraryViewComponent implements OnInit {

  constructor(
    private colourLibraryApiService: ColourLibraryApiService,
    private flashMessage: FlashMessagesService
  ) {}

  colourLibrary: Array<object>
  userPalettes: Array<object>
  activeModal: number = -1
  activeColour: string;

  ngOnInit() {
    this.loadColourLibrary()
    this.convertRgbToHex()
    this.getUserPalettes()
  }
  activeModalStyle(index) {
    if(index == this.activeModal) {
      return {"opacity": "1", "min-height": "calc(100vh - 120px)", "max-height": "200vh"}
    } else {
      return {"opacity": "0", "min-height": "0", "max-height": "0"}
    }
  }

  addColour(colourLibraryObject) {
    this.colourLibraryApiService.addColour(colourLibraryObject)
    .subscribe(res => {
      if(res.success) {
        this.flashMessage.show(res.message, {cssClass: "flash-success--dashboard", timeout: 2000})
        this.activeModal = -1
        this.loadColourLibrary()
      } else {
        this.flashMessage.show(res.message, {cssClass: "flash-failure--dashboard", timeout: 2000})
      }
    })
  }

  addColourToPalette(colourLibraryObject) {
    this.colourLibraryApiService.addColourToPalette(colourLibraryObject)
    .subscribe(res => {
      if(res.success) {
        this.flashMessage.show(res.message, {cssClass: "flash-success--dashboard", timeout: 2000})
        this.activeModal = -1
        this.loadColourLibrary()
      } else {
        this.flashMessage.show(res.message, {cssClass: "flash-failure--dashboard", timeout: 2000})
      }
    })
  }

  deleteColour(colourLibraryObject) {
    this.colourLibraryApiService.deleteColour(colourLibraryObject)
    .subscribe(res => {
      if(res.success) {
        this.flashMessage.show(res.message, {cssClass: "flash-success--dashboard", timeout: 2000})
        this.activeModal = -1
        this.loadColourLibrary()
      } else {
        this.flashMessage.show(res.message, {cssClass: "flash-failure--dashboard", timeout: 2000})
      }
    })
  }

  getUserPalettes() {
    this.colourLibraryApiService.getUserPalettes()
    .subscribe(res => {
      if(res.success == false) {

      } else {
        this.userPalettes = res;
      }
    })
  }

  loadColourLibrary() {
    this.colourLibraryApiService.getColourLibrary()
    .subscribe(res => {
      this.colourLibrary = res;
    })
  }

  toggleModal(index) {
    if(this.activeModal == index) {
      this.activeModal = -1
    } else {
      this.activeModal = index
    }
  }

  setActiveColour(hexValue?) {
    if(hexValue) {
      this.activeColour = hexValue
    } else {
      this.activeColour = ""
    }
  }


  // COLOUR ADD STYLES

  hexConversion: string = "FFFFFF";
  rgbConversion: any = { "red": "051", "green": "102", "blue": "153"}
  palette: object;

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
