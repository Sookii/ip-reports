import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateReportComponent } from './create-report.component';

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