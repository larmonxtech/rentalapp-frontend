import { Component, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { Exam } from '../../model/exam';
import { ExamService } from '../../services/exam.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';

@Component({
  selector: 'app-exam',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  private readonly examService = inject(ExamService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  protected $dataSource = signal(new MatTableDataSource<Exam>());
  protected $paginator = viewChild(MatPaginator);
  protected $sort = viewChild(MatSort);

  protected $exams = this.examService.$listChange;

  protected displayedColumns: string[] = ['idExam', 'name', 'description', 'actions'];

  constructor() {
    this.examService.findAll().subscribe(data => this.examService.setListChange(data));

    this.initializeEffects();

  }

  private initializeEffects(){
    effect( () => {
      const data = this.$exams();
      const p = this.$paginator();
      const s = this.$sort();
      const ds = this.$dataSource();
      
      ds.data = data;
      ds.paginator = p;
      ds.sort = s;
    }); 

    effect(() => {
      const message = this.examService.$messageChange();
      if(message){
        this.snackBar.open(message, 'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
        //esta limpieza no activa el rastreo del effect, no entra a un bucle infinito
        untracked( () => this.examService.setMessageChange('') );
      }
    });
  }

  openDialog(exam?: Exam){
    this.dialog.open(ExamDialogComponent,{
      width: '650px',
      data: exam,
      // disableClose: true
    });
  }

  delete(idExam: number){
      const ok = window.confirm('Are you sure to delete?');
      if(ok){
        this.examService.delete(idExam)
        .pipe(
          switchMap( () => this.examService.findAll() ),
          tap( data => this.examService.setListChange(data) ),
          tap( () => this.examService.setMessageChange('DELETED') )
        )
        .subscribe();
      }
    }
  
  applyFilter(e: any){
    const filterValue = e.target.value;
    this.$dataSource().filter = filterValue.trim().toLowerCase();
  }

}
