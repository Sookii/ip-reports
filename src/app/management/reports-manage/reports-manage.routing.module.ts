import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//模块组件
import { ReportsManageComponent } from './reports-manage/reports-manage.component';

export const reportsReveiwRoutes = [
	{
        path: 'report-manage',
        component: ReportsManageComponent
    },
    {
        path: '',
        redirectTo: 'report-manage',
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
export class ReportsManageRoutingModule { }