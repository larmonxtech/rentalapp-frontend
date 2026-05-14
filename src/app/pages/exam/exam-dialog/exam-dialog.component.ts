import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExamService } from '../../../services/exam.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-exam-dialog',
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './exam-dialog.component.html',
  styleUrl: './exam-dialog.component.css',
})
export class ExamDialogComponent {
  private readonly examService = inject(ExamService);
  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ExamDialogComponent>);

  protected $exam = signal({ ... this.data });
  
  operate(){
    const exam = this.$exam();
    const isEdit = exam != null && exam.idExam > 0;
    const msg = isEdit ? 'UPDATED' : 'CREATED';
    const operation$ = isEdit ? this.examService.update(exam.idExam, exam) : this.examService.save(exam); 

    operation$.pipe(
      switchMap(() => this.examService.findAll()),
      tap(data => this.examService.setListChange(data)),
      tap( () => this.examService.setMessageChange(msg))
    )
    .subscribe(() => this.close());
  }

  close(){
    this.dialogRef.close();
  }
}
