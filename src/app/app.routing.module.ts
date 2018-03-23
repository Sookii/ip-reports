import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'manage',
        loadChildren: './reports-manage/reports-manage.module#ReportsReviewModule'
    },
    {
        path: 'review',
        loadChildren: './reports-review/reports-review.module#ReportsReviewModule'
    },
    {
        path: '',
        redirectTo: 'review',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
