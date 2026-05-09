import { Component, signal } from '@angular/core';
import { CategoryComponent } from "./pages/category/category.component";
import { ExamComponent } from './pages/exam/exam.component';

@Component({
  selector: 'app-root',
  imports: [
    CategoryComponent,
    ExamComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rentalapp-frontend');
}
