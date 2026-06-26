import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Menu } from '../model/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly http = inject(HttpClient);

  getMenusByUser(){
    return this.http.post<Menu[]>(`${environment.HOST}/menus/user`, {});
  }
}
