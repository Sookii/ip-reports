import { CommonModule }   from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagementRoutingModule } from './management.routing.module';
import { ExtendNavModule } from '../common/extend-nav/extend-nav.module';


import { ManagementComponent } from './management.component';


@NgModule({
    declarations: [
        ManagementComponent,
    ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        ExtendNavModule
    ]
})
export class ManagementModule { }
