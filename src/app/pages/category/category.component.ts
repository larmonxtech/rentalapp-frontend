import { Component, inject } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  protected categories : Category[] = [];
  private readonly categoryService = inject(CategoryService);

  ngOnInit() : void{
    // this.categoryService.findAll().subscribe(data => console.log(data));
    this.categoryService.findAll().subscribe(data => this.categories = data);
  }
}
