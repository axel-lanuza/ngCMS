import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiUrl = '';

  constructor(private http: HttpClient, private env: EnvService) {
    this.apiUrl = this.env.apiUrl + 'user';
  }

  getUsers(order, orderBy, page = 1, pageSize = 10) {
    return this.http.get(`${this.apiUrl}?order=${order}&orderBy=${orderBy}&pageSize=${pageSize}&page=${page}`);
  }

  getUsersList() {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getUser(id) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteUser(id) {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  updateUser(obj, id) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, obj);
  }

  addUser(obj) {
    return this.http.post<any>(`${this.apiUrl}`, obj);
  }
}
