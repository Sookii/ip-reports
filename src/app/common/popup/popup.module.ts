import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { PopupComponent } from './popup.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        PopupComponent
    ],
    exports: [
        PopupComponent
    ]
})
export class PopupModule { }
