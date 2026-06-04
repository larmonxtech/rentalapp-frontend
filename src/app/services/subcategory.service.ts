import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Subcategory } from '../model/subcategory';
import { GenericSignalService } from './generic-signal.service';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService extends GenericSignalService<Subcategory> {
  protected override url:string = `${environment.HOST}/subcategories`;
}
