import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CycleSelectedModule } from '../cycle-selected/cycle-selected.module';

import { GenerateCfgComponent } from './generate-cfg.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CycleSelectedModule
    ],
    declarations: [
        GenerateCfgComponent
    ],
    exports: [
        CycleSelectedModule,
        GenerateCfgComponent
    ]
})
export class GenerateCfgModule { }
