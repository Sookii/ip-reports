import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';

import { ReportsManageRoutingModule } from './reports-manage.routing.module';

//模块组件
import { ReportsManageComponent } from './reports-manage/reports-manage.component';

@NgModule({
    declarations: [
        ReportsManageComponent,
    ],
    imports: [
        SharedModule,
        ReportsManageRoutingModule
    ]
})
export class ReportsReviewModule { }
