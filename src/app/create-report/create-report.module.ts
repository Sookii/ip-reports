import { CommonModule }   from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateReportRoutingModule } from './create-report.routing.module';
//模块组件
import { CreateReportComponent } from './create-report.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';

//
import { CreateReportService } from './create-report.service';

@NgModule({
    declarations: [
        CreateReportComponent,
        BasicInfoComponent
    ],
    imports: [
        CommonModule,
        CreateReportRoutingModule,
    ],
    providers: [
        CreateReportService
    ]
})
export class CreateReportModule { }
