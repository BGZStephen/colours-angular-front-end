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
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.createdBy = JSON.parse(this.user)._id,
    paletteObject.type = "palette"
    return this.http.post(this.baseUrl + "/colours", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  deletePaletteItem(paletteObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.createdBy = JSON.parse(this.user)._id
    paletteObject.type = "palette"
    return this.http.put(this.baseUrl + "/colours/deleteFromPalette", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  createPalette(paletteObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    paletteObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "/palettes", paletteObject, {headers: headers})
    .map(res => res.json())
  }

  deletePalette(paletteObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    return this.http.delete(this.baseUrl + `/palettes/${paletteObject._id}`, {headers: headers})
    .map(res => res.json())
  }

  getPaletteById(paletteObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    return this.http.get(this.baseUrl + `/palettes?_id=${paletteObject._id}`, {headers: headers})
    .map(res => res.json())
  }

  getPalettesByUserId() {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    let userId = JSON.parse(this.user)._id
    return this.http.get(this.baseUrl + `/palettes?userId=${userId}`, {headers: headers})
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
