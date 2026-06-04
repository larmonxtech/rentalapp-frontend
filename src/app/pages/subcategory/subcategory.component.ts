import { Component, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { Subcategory } from '../../model/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import { CategoryService } from '../../services/category.service';
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
import { SubcategoryDialogComponent } from './subcategory-dialog/subcategory-dialog.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-subcategory',
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
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css',
})
export class SubcategoryComponent {
  private readonly subcategoryService = inject(SubcategoryService);
  private readonly categoryService = inject(CategoryService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  protected $dataSource = signal(new MatTableDataSource<Subcategory>());
  protected $paginator = viewChild(MatPaginator);
  protected $sort = viewChild(MatSort);

  protected $subcategories = this.subcategoryService.$listChange;
  protected $categories = toSignal(this.categoryService.findAll(), { initialValue: [] });

  protected displayedColumns: string[] = ['idSubcategory', 'categoryName', 'nombre', 'estado', 'actions'];

  constructor() {
    this.subcategoryService.findAll().subscribe(data => this.subcategoryService.setListChange(data));

    this.initializeEffects();

  }

  private initializeEffects(){
    effect( () => {
      const data = this.$subcategories();
      const p = this.$paginator();
      const s = this.$sort();
      const ds = this.$dataSource();
      
      ds.data = data;
      ds.paginator = p;
      ds.sort = s;
    }); 

    effect(() => {
      const message = this.subcategoryService.$messageChange();
      if(message){
        this.snackBar.open(message, 'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
        untracked( () => this.subcategoryService.setMessageChange('') );
      }
    });
  }

  getCategoryName(idCategory: number) {
    const category = this.$categories().find(c => c.idCategory === idCategory);
    return category ? category.name : 'N/A';
  }

  openDialog(subcategory?: Subcategory){
    this.dialog.open(SubcategoryDialogComponent,{
      width: '650px',
      data: subcategory,
    });
  }

  delete(idSubcategory: number){
      const ok = window.confirm('Are you sure to delete?');
      if(ok){
        this.subcategoryService.delete(idSubcategory)
        .pipe(
          switchMap( () => this.subcategoryService.findAll() ),
          tap( data => this.subcategoryService.setListChange(data) ),
          tap( () => this.subcategoryService.setMessageChange('DELETED') )
        )
        .subscribe();
      }
    }
  
  applyFilter(e: any){
    const filterValue = e.target.value;
    this.$dataSource().filter = filterValue.trim().toLowerCase();
  }

}
