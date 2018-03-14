import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModel } from './table.model';

export { TableComponent };
export { TableModel };

@NgModule({
    declarations: [
        TableComponent
    ],
    exports: [
        TableComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
})
export class TableModule { }
