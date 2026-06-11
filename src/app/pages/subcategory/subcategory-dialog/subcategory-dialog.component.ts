import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SubcategoryService } from '../../../services/subcategory.service';
import { CategoryService } from '../../../services/category.service';
import { switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subcategory } from '../../../model/subcategory';

@Component({
  selector: 'app-subcategory-dialog',
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './subcategory-dialog.component.html',
  styleUrl: './subcategory-dialog.component.css',
})
export class SubcategoryDialogComponent implements OnInit {
  private readonly subcategoryService = inject(SubcategoryService);
  private readonly categoryService = inject(CategoryService);
  private readonly data = inject<Subcategory>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<SubcategoryDialogComponent>);
  private readonly fb = inject(FormBuilder);

  protected form: FormGroup;
  protected $categories = toSignal(this.categoryService.findAll(), { initialValue: [] });

  ngOnInit(): void {
    this.form = this.fb.group({
      idSubcategory: [this.data?.idSubcategory || null ],
      idCategory: [this.data?.idCategory || 0, Validators.required],
      nombre: [this.data?.nombre || '', Validators.required],
      estado: [this.data?.estado ?? true, Validators.required]
    });
  }
  
  operate(){
    if(this.form.invalid) return;

    const subcategory: Subcategory = this.form.value;
    const isEdit = subcategory.idSubcategory > 0;
    const msg = isEdit ? 'UPDATED' : 'CREATED';
    const operation$ = isEdit ? this.subcategoryService.update(subcategory.idSubcategory, subcategory) : this.subcategoryService.save(subcategory); 

    operation$.pipe(
      switchMap(() => this.subcategoryService.findAll()),
      tap(data => this.subcategoryService.setListChange(data)),
      tap( () => this.subcategoryService.setMessageChange(msg))
    )
    .subscribe(() => this.close());
  }

  close(){
    this.dialogRef.close();
  }
}
