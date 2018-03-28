import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragulaModule } from "ng2-dragula";
//模块组件
import { CategoryManageComponent } from './category-manage.component';
//服务

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule
    ],
    declarations: [
        CategoryManageComponent
    ],
    exports: [
        CategoryManageComponent
    ]
})

export class CategoryManageModule { }
