import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { ExamComponent } from './pages/exam/exam.component';

export const routes: Routes = [
    { path: 'pages/category', component: CategoryComponent},
    { path: 'pages/exam', component: ExamComponent }
];
