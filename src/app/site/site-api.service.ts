import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http"
import { environment } from "../../environments/environment"

@Injectable()
export class SiteApiService {

  constructor(
    private http: Http
  ) { }

  coloursApiUrl: String = environment.coloursApiUrl

  authenticate(userObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    return this.http.post(this.coloursApiUrl + "/users/authenticate", userObject)
    .map(res => res.json())
  }

  registerUser(userObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    return this.http.post(this.coloursApiUrl + "/users", userObject)
    .map(res => res.json())
  }

  storeToken(userObject) {
    localStorage.setItem('token', userObject.token)
    localStorage.setItem('user', JSON.stringify(userObject.user))
  }

}
