import { Injectable } from '@angular/core';
import { Http } from "@angular/http"

@Injectable()
export class DashboardApiService {

  constructor(
    private http: Http
  ) {}

  // user services

  logout() {
    localStorage.clear()
  }

}
