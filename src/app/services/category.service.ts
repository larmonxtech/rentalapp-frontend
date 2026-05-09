import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //private url = 'http://localhost:9090/categories';
  private url:string = `${environment.HOST}/categories`;

  //constructor(private http: HttpClient){}
  private readonly http = inject(HttpClient);

  // get post put delete
  findAll(){
    return this.http.get<Category[]>(this.url);
  }
}
