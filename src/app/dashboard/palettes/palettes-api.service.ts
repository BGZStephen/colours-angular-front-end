import { Injectable } from '@angular/core';
import { Http } from "@angular/http"

@Injectable()
export class PalettesApiService {

  constructor(
    private http: Http
  ) { }

  user: any;
  baseUrl: string = ""

  addPaletteItem(paletteObject) {
    this.loadToken()
    paletteObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "colours/createForPalette", paletteObject)
    .map(res => res.json())
  }

  deletePaletteItem(paletteObject) {
    this.loadToken()
    paletteObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "colours/deleteFromPalette", paletteObject)
    .map(res => res.json())
  }

  createPalette(paletteObject) {
    this.loadToken()
    paletteObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "palettes/create", paletteObject)
    .map(res => res.json())
  }

  deletePalette(paletteObject) {
    this.loadToken()
    paletteObject.userId = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "palettes/deleteOne", paletteObject)
    .map(res => res.json())
  }

  getPaletteById(paletteObject) {
    return this.http.post(this.baseUrl + "palettes/getById", paletteObject)
    .map(res => res.json())
  }

  getPalettesByUserId() {
    this.loadToken()
    let userObject = {"createdBy": JSON.parse(this.user)._id}
    return this.http.post(this.baseUrl + "palettes/getByUserId", userObject)
    .map(res => res.json())
  }

  loadToken() {
    this.user = localStorage.getItem('user')
  }

  updatePalette(paletteObject) {
    return this.http.post(this.baseUrl + "palettes/update", paletteObject)
    .map(res => res.json())
  }


}
