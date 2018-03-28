import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';


import { CreateReportRoutingModule } from './create-report.routing.module';
//模块组件
import { CreateReportComponent } from './create-report.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ChooseDimensionComponent } from './choose-dimension/choose-dimension.component';
import { ChooseIndicatorComponent } from './choose-indicator/choose-indicator.component';
//
import { CreateReportService } from './create-report.service';

@NgModule({
    declarations: [
        CreateReportComponent,
        BasicInfoComponent,
        ChooseDimensionComponent,
        ChooseIndicatorComponent
    ],
    imports: [
        SharedModule,
        CreateReportRoutingModule,
    ],
    providers: [
        CreateReportService
    ]
})
export class CreateReportModule { }
