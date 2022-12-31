import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

readonly URL_API = 'http://localhost:5000/city';

  constructor(private http: HttpClient) { }

  postCity(data : City) {
    return this.http.post(this.URL_API, data)
  }

  getCities() {
    return this.http.get(this.URL_API)
  }

  patchCity(data: City) {
    return this.http.patch(this.URL_API +`/${data._id}`, data)
  }

  deleteCity(data: City) {
  return this.http.delete(this.URL_API +`/${data._id}`)
  }
}

