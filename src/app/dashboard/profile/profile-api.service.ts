import { Injectable } from '@angular/core';
import { Http } from "@angular/http"

@Injectable()
export class ProfileApiService {

  constructor(
    private http: Http
  ) { }

  // user services

  user: any;
  authToken: any;
  baseUrl: string = ""

  getCurrentUser() {
    this.loadToken()
    let userObject = {"_id": JSON.parse(this.user)._id}
    return this.http.post(this.baseUrl + "users/getById", userObject)
    .map(res => res.json())
  }

  loadToken() {
    this.authToken = localStorage.getItem('token')
    this.user = localStorage.getItem('user')
  }

  updateProfile(userObject) {
    this.loadToken()
    userObject._id = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "users/update", userObject)
    .map(res => res.json())
  }

  updatePassword(userObject) {
    this.loadToken()
    userObject._id = JSON.parse(this.user)._id
    return this.http.post(this.baseUrl + "users/updatePassword", userObject)
    .map(res => res.json())
  }

}
