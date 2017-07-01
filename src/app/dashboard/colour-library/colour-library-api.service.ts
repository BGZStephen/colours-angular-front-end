import { Injectable } from '@angular/core';
import { Http } from "@angular/http"

@Injectable()
export class ColourLibraryApiService {

  constructor(
    private http: Http
  ) { }

  user: any;
  authToken: any;
  baseUrl: string = ""

  loadToken() {
    this.authToken = localStorage.getItem('token')
    this.user = localStorage.getItem('user')
  }

  addColour(colourLibraryObject) {
    this.loadToken()
    colourLibraryObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "colours/createForLibrary", colourLibraryObject)
    .map(res => res.json())
  }

  addColourToPalette(colourLibraryObject) {
    this.loadToken()
    colourLibraryObject.createdBy = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "colours/createForPalette", colourLibraryObject)
    .map(res => res.json())
  }

  deleteColour(colourLibraryObject) {
    this.loadToken()
    colourLibraryObject.userId = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "colour-libraries/deleteColour", colourLibraryObject)
    .map(res => res.json())
  }

  getColourLibrary() {
    this.loadToken()
    let query = {_id: JSON.parse(this.user)._id}
    return this.http.post(this.baseUrl + "colour-libraries/getByUserId", query)
    .map(res => res.json())
  }

  getUserPalettes() {
    this.loadToken()
    let query = {createdBy: JSON.parse(this.user)._id}
    return this.http.post(this.baseUrl + "palettes/getByUserId", query)
    .map(res => res.json())
  }


  // colourId: req.body.colourId

}
