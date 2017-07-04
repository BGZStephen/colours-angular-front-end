import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http"
import { environment } from "../../../environments/environment"

@Injectable()
export class ColourLibraryApiService {

  constructor(
    private http: Http
  ) { }

  user: any;
  authToken: any;
  baseUrl: string = environment.coloursApiUrl

  loadToken() {
    this.authToken = localStorage.getItem('token')
    this.user = localStorage.getItem('user')
  }

  addColour(colourLibraryObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    colourLibraryObject.createdBy = JSON.parse(this.user)._id
    colourLibraryObject.type = "library"
    return this.http.post(this.baseUrl + "/colours", colourLibraryObject, {headers: headers})
  }

  addColourToPalette(colourPaletteObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    colourPaletteObject.createdBy = JSON.parse(this.user)._id
    colourPaletteObject.type = "palette"
    return this.http.post(this.baseUrl + "/colours", colourPaletteObject, {headers: headers})
    .map(res => res.json())
  }

  deleteColour(colourLibraryObject) {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    colourLibraryObject._id = JSON.parse(this.user).colourLibraryId
    return this.http.put(this.baseUrl + `/colour-libraries/${colourLibraryObject._id}`, colourLibraryObject, {headers: headers})
    .map(res => res.json())
  }

  getColourLibrary() {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    let query = {_id: JSON.parse(this.user).colourLibraryId}
    return this.http.get(this.baseUrl + `/colour-libraries/${query._id}`, {headers: headers})
    .map(res => res.json())
  }

  getUserPalettes() {
    this.loadToken()
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    let query = {createdBy: JSON.parse(this.user)._id}
    return this.http.post(this.baseUrl + "/palettes/getByUserId", query)
    .map(res => res.json())
  }


  // colourId: req.body.colourId

}
