import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//模块组件
import { ExtendNavDirective } from './extend-nav-directive';
import { ExtendNavComponent } from './extend-nav.component';
//服务
import { ExtendNavService } from './extend-nav.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [ExtendNavDirective, ExtendNavComponent],
    declarations: [
        ExtendNavDirective,
        ExtendNavComponent
    ],
    entryComponents: [ExtendNavComponent],
    providers: [ExtendNavService]
})

export class ExtendNavModule { }
