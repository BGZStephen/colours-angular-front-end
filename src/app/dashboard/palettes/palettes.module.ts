import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { router } from "../../app.routes"
import { FlashMessagesModule } from "angular2-flash-messages"

// sevices
import { PalettesApiService } from "./palettes-api.service"

//components

// dashboard specific
import { PaletteViewComponent, PalettesViewComponent, PaletteAddComponent, PaletteEditComponent,
         PalettesManageComponent } from './components/palettes-components-barrel';


@NgModule({
  declarations: [
    PaletteViewComponent, PalettesViewComponent, PaletteAddComponent, PaletteEditComponent,
    PalettesManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    FlashMessagesModule,
  ],
  exports: [
    PaletteViewComponent, PalettesViewComponent, PaletteAddComponent, PaletteEditComponent,
    PalettesManageComponent
  ],
  providers: [PalettesApiService]
})
export class PalettesModule { }
