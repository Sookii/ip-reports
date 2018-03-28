import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';

import { ReportsReviewRoutingModule } from './reports-review.routing.module';

import { GenerateCfgModule } from '../../common/generate-cfg/generate-cfg.module';
//模块组件
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsSummaryComponent } from './reports-summary/reports-summary.component';

@NgModule({
    declarations: [
        ReportsListComponent,
        ReportsSummaryComponent
    ],
    imports: [
        SharedModule,
        ReportsReviewRoutingModule,
        GenerateCfgModule
    ]
})
export class ReportsReviewModule { }
