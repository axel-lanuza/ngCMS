import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  uri = 'http://localhost:4000/post';

  constructor(private http: HttpClient) { }

  addPage(title, category, description) {
    const obj = {
      title: title,
      category: category,
      description: description,
    };

    return this.http.post<any>(`${this.uri}/add`, obj);
  }

  getPages() {
    return this
      .http
      .get(`${this.uri}`);
  }

  editPage(id) {
    return this
      .http
      .get<any>(`${this.uri}/${id}`);
  }

  deletePage(id) {
    return this
      .http
      .delete<any>(`${this.uri}/delete/${id}`);
  }
  
  updatePage(title, category, description, id) {
      const obj = {
        title: title,
        category: category,
        description: description,
    };

    return this
      .http
      .post<any>(`${this.uri}/update/${id}`, obj);
  }
}