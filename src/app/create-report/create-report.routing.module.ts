import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateReportComponent } from './create-report.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';

export const createReportRoute = [
    {
        path: 'edit/:step',
        component: CreateReportComponent,
    },
    {
        ptth: '',
        redirectTo: 'edit/:step',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(createReportRoute)
    ],
    exports: [
        RouterModule
    ]
})
export class CreateReportRoutingModule { }