import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';


@Injectable({
  providedIn: 'root'
})

export class CommonService {

  apiUrl = '';

  constructor(private http: HttpClient, private env: EnvService) { 
    this.apiUrl = this.env.apiUrl;
  }

  deleteRow(id, url) {
    return this.http.delete(`${this.apiUrl}${url}/${id}`);
  }
  
}