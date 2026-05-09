import { Component, inject } from '@angular/core';
import { Exam } from '../../model/exam';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exam',
  imports: [],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  protected exams : Exam[] = [];
  private readonly examService = inject(ExamService);

  ngOnInit() : void{
    // this.examService.findAll().subscribe(data => console.log(data));
    this.examService.findAll().subscribe(data => this.exams = data);
  }
}
