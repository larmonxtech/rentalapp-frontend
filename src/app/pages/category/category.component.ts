import { Component, inject, signal } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  protected categories : Category[] = [];
  protected $dataSource = signal(new MatTableDataSource<Category>());
  //protected dataSource2$ = new Observable<MatTableDataSource<Category>>();
  protected displayedColumns: string[] = ['idCategory', 'name', 'description', 'status'];

  private readonly categoryService = inject(CategoryService);

  ngOnInit() : void{
    // this.categoryService.findAll().subscribe(data => console.log(data));
    //this.categoryService.findAll().subscribe(data => this.categories = data);
    this.categoryService.findAll().subscribe(data => {
      this.$dataSource.set(new MatTableDataSource<Category>(data));
    });
  }

  applyFilter(e: any){
   console.log(e);
  }
}
