import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http"
import { environment } from "../../environments/environment"

@Injectable()
export class SiteApiService {

  constructor(
    private http: Http
  ) { }

  coloursApiUrl: String = environment.coloursApiUrl
  siteAuthToken: String = environment.siteAuthToken

  authenticate(userObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    return this.http.post(`${this.coloursApiUrl}/users/authenticate?siteAuthToken=${this.siteAuthToken}`, userObject)
    .map((res:any) => res.json())
  }

  registerUser(userObject) {
    let token = localStorage.getItem('token')
    let headers = new Headers()
    headers.append('Authorization', `${token}`)
    return this.http.post(`${this.coloursApiUrl}/users?siteAuthToken=${this.siteAuthToken}`, userObject)
  }

  storeToken(userObject) {
    localStorage.setItem('token', userObject.token)
    localStorage.setItem('user', JSON.stringify(userObject.user))
  }

}
