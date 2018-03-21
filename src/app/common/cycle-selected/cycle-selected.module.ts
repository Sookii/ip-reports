import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CycleSelectedComponent } from './cycle-selected.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CycleSelectedComponent
    ],
    exports: [
        CycleSelectedComponent
    ]
})
export class CycleSelectedModule { }
