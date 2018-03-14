import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

//共享模块
import { IpRadioModule } from './ipharmacare-ui/radio/ip-radio-module';
import { IpCheckboxModule } from './ipharmacare-ui/checkbox/ip-checkbox-module';
import { IpSelectModule } from './ipharmacare-ui/select/ip-select.module';
import { PopupModule } from './popup/popup.module';
import { TableModule } from './ipharmacare-table/table.module';
//共享组件

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IpRadioModule,
        IpCheckboxModule,
        IpSelectModule,
        PopupModule,
        TableModule
    ],
    declarations: [
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        IpRadioModule,
        IpCheckboxModule,
        IpSelectModule,
        PopupModule,
        TableModule
    ],
})
export class SharedModule { }
