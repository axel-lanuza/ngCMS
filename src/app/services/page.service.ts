import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  apiUrl = '';

  constructor(private http: HttpClient, private env: EnvService) {
    this.apiUrl = this.env.apiUrl + 'page';
  }

  getPages(order, orderBy, page = 1, pageSize = 10) {
    return this.http.get(`${this.apiUrl}?order=${order}&orderBy=${orderBy}&pageSize=${pageSize}&page=${page}`);
  }

  getPagesList() {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getPage(id) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletePage(id) {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  updatePage(obj, id) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, obj);
  }

  addPage(obj) {
    return this.http.post<any>(`${this.apiUrl}`, obj);
  }
}
