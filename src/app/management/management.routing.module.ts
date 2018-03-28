import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';
const routes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        children: [
            {
                path: 'reports-manage',
                loadChildren: './reports-manage/reports-manage.module#ReportsReviewModule'
            },
            {
                path: 'reports-review',
                loadChildren: './reports-review/reports-review.module#ReportsReviewModule'
            },
            {
                path: '',
                redirectTo: 'reports-review',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ManagementRoutingModule { }
