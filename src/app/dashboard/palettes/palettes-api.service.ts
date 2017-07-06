import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http"
import { environment } from "../../../environments/environment"

@Injectable()
export class PalettesApiService {

  constructor(
    private http: Http
  ) { }

  user: any;
  baseUrl: string = environment.coloursApiUrl

  addPaletteItem(paletteObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "/colours/createForPalette", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  deletePaletteItem(paletteObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "/colours/deleteFromPalette", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  createPalette(paletteObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "/palettes", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  deletePalette(paletteObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.userId = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "/palettes/deleteOne", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  getPaletteById(paletteObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.type = "id"
    return this.http.post(this.baseUrl + "/palettes", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  getPalettesByUserId() {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    let userObject = {createdBy: JSON.parse(this.user)._id, type: "userId"}
    return this.http.post(this.baseUrl + `/palettes/${userObject.createdBy}`, userObject, {headers: headers})
    .map(res => res.json())
  }

  loadToken() {
    this.user = localStorage.getItem('user')
  }

  updatePalette(paletteObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    return this.http.post(this.baseUrl + "/palettes/update", paletteObject, {headers: headers})
    .map(res => res.json())
  }


}
