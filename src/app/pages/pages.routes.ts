import { CategoryEditComponent } from "./category/category-edit/category-edit.component";
import { CategoryComponent } from "./category/category.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExamComponent } from "./exam/exam.component";
import { SubcategoryComponent } from "./subcategory/subcategory.component";

export const pagesRoutes=[
    {path: 'dashboard', component: DashboardComponent},
    { 
        path: 'category', component: CategoryComponent,
        children: [
            { path: 'new', component: CategoryEditComponent },
            { path: 'edit/:id', component: CategoryEditComponent },
        ],
    },
    { path: 'subcategory', component: SubcategoryComponent },
    { path: 'exam', component: ExamComponent },
];