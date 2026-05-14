import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../model/exam';
import { GenericService } from './generic.service';
import { GenericSignalService } from './generic-signal.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends GenericSignalService<Exam> {
  //private url = 'http://localhost:9090/exams';
  protected override url:string = `${environment.HOST}/exams`;

  //constructor(private http: HttpClient){}
  //private readonly http = inject(HttpClient);

  // get post put delete
  /*findAll(){
    return this.http.get<Exam[]>(this.url);
  }*/
}
