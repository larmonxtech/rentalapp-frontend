import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../model/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  //private url = 'http://localhost:9090/exams';
  private url:string = `${environment.HOST}/exams`;

  //constructor(private http: HttpClient){}
  private readonly http = inject(HttpClient);

  // get post put delete
  findAll(){
    return this.http.get<Exam[]>(this.url);
  }
}
