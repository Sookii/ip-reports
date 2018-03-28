import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//模块组件
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsSummaryComponent } from './reports-summary/reports-summary.component';

export const reportsReveiwRoutes = [
	{
        path: 'reports-list',
        component: ReportsListComponent
    },
    {
        path: 'reports-summary',
        component: ReportsSummaryComponent
    },
    {
        path: '',
        redirectTo: 'reports-list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(reportsReveiwRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ReportsReviewRoutingModule { }