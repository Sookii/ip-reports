import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';

import { ReportsReviewRoutingModule } from './reports-review.routing.module';
//模块组件
import { ReportsListComponent } from './reports-list/reports-list.component';

@NgModule({
    declarations: [
        ReportsListComponent
    ],
    imports: [
        SharedModule,
        ReportsReviewRoutingModule
    ]
})
export class ReportsReviewModule { }
