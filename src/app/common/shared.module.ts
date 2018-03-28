import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

//共享模块
import { IpRadioModule } from './ipharmacare-ui/radio/ip-radio-module';
import { IpCheckboxModule } from './ipharmacare-ui/checkbox/ip-checkbox-module';
import { IpSelectModule } from './ipharmacare-ui/select/ip-select.module';
import { PopupModule } from './popup/popup.module';
import { TableModule } from './ipharmacare-table/table.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { SwitchModule } from './switch/switch.module';
import { DropdownModule } from './dropdown/dropdown.module';
//共享功能模块
import { CategoryManageModule } from './category-manage/category-manage.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IpRadioModule,
        IpCheckboxModule,
        IpSelectModule,
        PopupModule,
        TableModule,
        TooltipModule,
        SwitchModule,
        DropdownModule,

        CategoryManageModule
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
        TableModule,
        TooltipModule,
        SwitchModule,
        DropdownModule,

        CategoryManageModule
    ],
})
export class SharedModule { }
