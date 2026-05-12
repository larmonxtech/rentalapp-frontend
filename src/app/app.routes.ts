import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { ExamComponent } from './pages/exam/exam.component';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';

export const routes: Routes = [
    { 
        path: 'pages/category', component: CategoryComponent,
        children: [
            { path: 'new', component: CategoryEditComponent },
            { path: 'edit/:id', component: CategoryEditComponent },
        ],
    },
    { path: 'pages/exam', component: ExamComponent }
];
